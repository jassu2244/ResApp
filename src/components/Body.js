import { useEffect, useState } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { CDN_URL } from "../utils/constants";

const FEATURED = [
  { id: 1, name: "Spicy Paneer Burger", price: "₹229", rating: "4.5", emoji: "🍔", category: "Burgers" },
  { id: 2, name: "Truffle Mushroom Pizza", price: "₹349", rating: "4.7", emoji: "🍕", category: "Pizza" },
  { id: 3, name: "Butter Chicken Bowl", price: "₹289", rating: "4.6", emoji: "🍛", category: "Indian" },
  { id: 4, name: "Mango Cheesecake", price: "₹179", rating: "4.8", emoji: "🍰", category: "Desserts" },
];

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  const onlineStatus = useOnlineStatus();

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const data = await fetch("/api/restaurants");
      const json = await data.json();
      const restaurants = json?.data?.cards?.filter(
        (card) => card?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
      ) || [];
      setListOfRestaurants(restaurants);
      setFilteredRestaurant(restaurants);
    } catch (e) {
      setListOfRestaurants([]);
      setFilteredRestaurant([]);
    } finally {
      setLoading(false);
    }
  };

  if (!onlineStatus) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "16px",
        background: "var(--bg)",
        color: "var(--text-muted)",
      }}>
        <span style={{ fontSize: "4rem" }}>📡</span>
        <p style={{ fontFamily: "var(--f-display)", fontSize: "1.8rem", color: "var(--text)" }}>You're offline</p>
        <p style={{ fontFamily: "var(--f-body)", fontSize: "0.95rem" }}>Check your internet connection and try again.</p>
      </div>
    );
  }

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
    <div style={{ background: "var(--bg)" }}>

      {/* ── HERO ─────────────────────────────────── */}
      <section className="hero" style={{ padding: "80px 64px 60px" }}>
        {/* Left */}
        <div style={{ maxWidth: "520px" }}>
          <p className="anim-1" style={{
            fontFamily: "var(--f-body)",
            fontWeight: 600,
            fontSize: "0.85rem",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: "16px",
          }}>
            🔥 Order in under 30 minutes
          </p>

          <h1 className="anim-2" style={{
            fontFamily: "var(--f-display)",
            fontWeight: 900,
            fontSize: "clamp(2.6rem, 5vw, 4.8rem)",
            lineHeight: 1.1,
            letterSpacing: "-1px",
            color: "var(--text)",
            marginBottom: "20px",
          }}>
            Cravings delivered{" "}
            <span style={{ color: "var(--red)", fontStyle: "italic" }}>anytime!</span>
          </h1>

          <p className="anim-3" style={{
            fontFamily: "var(--f-body)",
            fontWeight: 400,
            fontSize: "1.05rem",
            color: "var(--text-muted)",
            maxWidth: "380px",
            lineHeight: 1.65,
            marginBottom: "36px",
          }}>
            Discover the best food from restaurants near you. Hot meals, fast delivery, zero hassle.
          </p>

          <div className="anim-4" style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <button
              className="pulse-red"
              onClick={() => document.getElementById("restaurant-grid")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                padding: "16px 36px",
                backgroundColor: "var(--red)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--r-pill)",
                fontFamily: "var(--f-display)",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                transition: "transform 150ms ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              Order Now
            </button>
            <button
              onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                padding: "14px 0",
                backgroundColor: "transparent",
                color: "var(--yellow)",
                border: "none",
                borderBottom: "2px solid var(--yellow)",
                fontFamily: "var(--f-body)",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                transition: "color 150ms ease",
              }}
            >
              See Menu →
            </button>
          </div>
        </div>

        {/* Right: floating hero image */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="anim-img" style={{
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 35%, #3a1a08, #1a0a02)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "9rem",
            border: "2px solid rgba(232,35,26,0.15)",
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
          }}>
            🍔
          </div>

          {/* Decorators */}
          <div className="float-1" style={{
            position: "absolute", top: "10%", left: "5%",
            width: "28px", height: "28px",
            backgroundColor: "var(--green)",
            borderRadius: "6px",
          }} />
          <div className="float-2" style={{
            position: "absolute", bottom: "15%", left: "0%",
            width: "28px", height: "28px",
            backgroundColor: "var(--green)",
            borderRadius: "6px",
          }} />
          <div className="float-3" style={{
            position: "absolute", top: "5%", right: "5%",
            width: "38px", height: "38px",
            borderRadius: "50%",
            border: "6px solid var(--green)",
          }} />
          <div className="float-4" style={{
            position: "absolute", bottom: "20%", right: "8%",
            width: "12px", height: "12px",
            borderRadius: "50%",
            backgroundColor: "var(--red)",
          }} />
          <div className="float-5" style={{
            position: "absolute", top: "40%", right: "-2%",
            width: "12px", height: "12px",
            borderRadius: "50%",
            backgroundColor: "var(--green)",
          }} />

          {/* Happy customers pill */}
          <div style={{
            position: "absolute",
            top: "8%",
            right: "-5%",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "var(--r-lg)",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            zIndex: 2,
            whiteSpace: "nowrap",
          }}>
            <div style={{ display: "flex" }}>
              {["👩", "👨", "👩"].map((em, i) => (
                <span key={i} style={{
                  width: "28px", height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "var(--surface-2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.9rem",
                  marginLeft: i > 0 ? "-8px" : "0",
                  border: "2px solid var(--surface)",
                }}>
                  {em}
                </span>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "0.85rem", color: "var(--text)" }}>
                <span style={{ color: "var(--green)" }}>+2k</span> Happy Customers
              </p>
              <p style={{ fontFamily: "var(--f-body)", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                Rated 4.8 / 5.0 ⭐
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED ─────────────────────────────── */}
      <section id="featured" style={{
        padding: "64px",
        background: "var(--bg)",
        maxWidth: "1280px",
        margin: "0 auto",
      }}>
        <h2 className="section-title" style={{ fontSize: "1.8rem", marginBottom: "32px" }}>
          Featured Dishes
        </h2>
        <div className="scroll-x" style={{ display: "flex", gap: "20px", paddingBottom: "8px" }}>
          {FEATURED.map((item, i) => (
            <div
              key={item.id}
              className="feat-card"
              style={{
                flexShrink: 0,
                width: "200px",
                background: "var(--surface)",
                border: "1px solid var(--border-card)",
                borderRadius: "var(--r-md)",
                padding: "16px",
                paddingTop: "52px",
                position: "relative",
                transition: "border-color 200ms ease, transform 200ms ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(232,35,26,0.45)";
                e.currentTarget.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-card)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Floating emoji circle */}
              <div style={{
                position: "absolute",
                top: "-35px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "var(--surface-2)",
                border: "3px solid var(--surface)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
              }}>
                {item.emoji}
              </div>
              <p style={{ fontFamily: "var(--f-body)", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "4px" }}>
                {item.category}
              </p>
              <h3 style={{
                fontFamily: "var(--f-body)",
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "var(--text)",
                marginBottom: "8px",
              }}>
                {item.name}
              </h3>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--f-mono)", fontWeight: 700, color: "var(--green)", fontSize: "1rem" }}>
                  {item.price}
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--yellow)" }}>★ {item.rating}</span>
              </div>
              <button
                style={{
                  marginTop: "12px",
                  width: "100%",
                  padding: "8px",
                  backgroundColor: "var(--green)",
                  color: "#000",
                  border: "none",
                  borderRadius: "var(--r-sm)",
                  fontFamily: "var(--f-body)",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "box-shadow 200ms ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 16px var(--green-glow)"}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
              >
                + Add
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESTAURANT GRID ──────────────────────── */}
      <section id="restaurant-grid" style={{
        padding: "0 64px 80px",
        maxWidth: "1280px",
        margin: "0 auto",
      }}>
        {/* Search + filters */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "32px",
          flexWrap: "wrap",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-md)",
            padding: "0 14px",
            flex: 1,
            minWidth: "200px",
            maxWidth: "400px",
            transition: "border-color 150ms ease",
          }}
          onFocusCapture={(e) => e.currentTarget.style.borderColor = "var(--yellow)"}
          onBlurCapture={(e) => e.currentTarget.style.borderColor = "var(--border)"}
          >
            <span style={{ fontSize: "1rem" }}>🔍</span>
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              style={{
                flex: 1,
                padding: "13px 0",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--text)",
                fontFamily: "var(--f-body)",
                fontSize: "0.95rem",
              }}
            />
          </div>

          <button onClick={handleSearch} style={{
            padding: "13px 22px",
            backgroundColor: "var(--yellow)",
            color: "#000",
            border: "none",
            borderRadius: "var(--r-md)",
            fontFamily: "var(--f-body)",
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: "pointer",
            transition: "opacity 150ms ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          >
            Search
          </button>

          <button onClick={handleTopRated} style={{
            padding: "13px 22px",
            backgroundColor: activeFilter === "toprated" ? "var(--yellow)" : "var(--surface-2)",
            color: activeFilter === "toprated" ? "#000" : "var(--text-muted)",
            border: `1px solid ${activeFilter === "toprated" ? "var(--yellow)" : "var(--border)"}`,
            borderRadius: "var(--r-md)",
            fontFamily: "var(--f-body)",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
            transition: "all 150ms ease",
          }}>
            ★ Top Rated
          </button>
        </div>

        {/* Section heading */}
        <div style={{ marginBottom: "28px" }}>
          <h2 className="section-title" style={{ fontSize: "1.8rem" }}>
            {activeFilter === "toprated" ? "Top Rated Restaurants" :
             activeFilter === "search" ? `Results for "${searchText}"` :
             "Restaurants Near You"}
          </h2>
          {!loading && (
            <p style={{ fontFamily: "var(--f-body)", fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }}>
              {filteredRestaurant.length} restaurants found
            </p>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <Shimmer />
        ) : filteredRestaurant.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
            <span style={{ fontSize: "4rem", display: "block", marginBottom: "16px" }}>🍽️</span>
            <p style={{ fontFamily: "var(--f-display)", fontSize: "1.5rem", color: "var(--text)", marginBottom: "8px" }}>
              No restaurants found
            </p>
            <p style={{ fontFamily: "var(--f-body)", fontSize: "0.9rem" }}>Try a different search term</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}>
            {filteredRestaurant.map((restaurant, index) => (
              <Link
                key={restaurant.card.card.info.id}
                to={"/restaurants/" + restaurant.card.card.info.id}
                className="card-anim"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {restaurant.card.card.info.promoted
                  ? <RestaurantCardPromoted resData={restaurant} />
                  : <RestaurantCard resData={restaurant} />
                }
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Body;
