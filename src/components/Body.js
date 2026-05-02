import { useEffect, useState } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("/api/restaurants");
    const json = await data.json();
    const restaurants = json?.data?.cards?.filter(
      (card) => card?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant",
    );
    setListOfRestaurants(restaurants || []);
    setFilteredRestaurant(restaurants || []);
  };

  if (onlineStatus === false) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: "16px",
        color: "var(--color-text-muted)",
      }}>
        <span style={{ fontSize: "3rem" }}>📡</span>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-text)" }}>You're offline</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>Check your internet connection and try again.</p>
      </div>
    );
  }

  if (listOfRestaurants.length === 0) return <Shimmer />;

  const handleSearch = () => {
    const results = listOfRestaurants.filter((res) =>
      res.card.card.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurant(results);
    setActiveFilter("search");
  };

  const handleTopRated = () => {
    if (activeFilter === "toprated") {
      setFilteredRestaurant(listOfRestaurants);
      setActiveFilter("all");
    } else {
      setFilteredRestaurant(listOfRestaurants.filter((res) => res.card.card.info.avgRating > 4));
      setActiveFilter("toprated");
    }
  };

  return (
    <div style={{
      backgroundColor: "var(--color-bg)",
      minHeight: "100vh",
      padding: "var(--spacing-xl) var(--spacing-lg)",
    }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Search + Filter Bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-md)",
          marginBottom: "var(--spacing-xl)",
          flexWrap: "wrap",
        }}>
          {/* Search input */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            padding: "0 14px",
            flex: "1",
            minWidth: "220px",
            maxWidth: "400px",
            transition: "border-color 150ms ease",
          }}
          onFocusCapture={(e) => e.currentTarget.style.borderColor = "var(--color-primary)"}
          onBlurCapture={(e) => e.currentTarget.style.borderColor = "var(--color-border)"}
          >
            <SearchIcon />
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              style={{
                flex: 1,
                padding: "12px 0",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--color-text)",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
              }}
            />
          </div>

          <button
            onClick={handleSearch}
            style={{
              padding: "12px 20px",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-bg)",
              border: "none",
              borderRadius: "var(--radius-md)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "background-color 150ms ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--color-primary-dim)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--color-primary)"}
          >
            Search
          </button>

          <button
            onClick={handleTopRated}
            style={{
              padding: "12px 20px",
              backgroundColor: activeFilter === "toprated" ? "var(--color-primary)" : "var(--color-surface-2)",
              color: activeFilter === "toprated" ? "var(--color-bg)" : "var(--color-text-muted)",
              border: `1px solid ${activeFilter === "toprated" ? "var(--color-primary)" : "var(--color-border)"}`,
              borderRadius: "var(--radius-md)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "all 150ms ease",
              whiteSpace: "nowrap",
            }}
          >
            ★ Top Rated
          </button>
        </div>

        {/* Section heading */}
        <div style={{ marginBottom: "var(--spacing-lg)" }}>
          <h2 className="section-title">
            {activeFilter === "toprated" ? "Top Rated Restaurants" :
             activeFilter === "search" ? `Results for "${searchText}"` :
             "Restaurants Near You"}
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            color: "var(--color-text-muted)",
            marginTop: "4px",
          }}>
            {filteredRestaurant.length} places found
          </p>
        </div>

        {/* Card Grid */}
        {filteredRestaurant.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "var(--spacing-2xl) 0",
            color: "var(--color-text-muted)",
          }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "16px" }}>🍽️</span>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-text)", marginBottom: "8px" }}>No restaurants found</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>Try a different search term</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "var(--spacing-lg)",
          }}>
            {filteredRestaurant.map((restaurant, index) => (
              <Link
                key={restaurant.card.card.info.id}
                to={"/restaurants/" + restaurant.card.card.info.id}
                className="card-animate"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {restaurant.card.card.info.promoted ? (
                  <RestaurantCardPromoted resData={restaurant} />
                ) : (
                  <RestaurantCard resData={restaurant} />
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
