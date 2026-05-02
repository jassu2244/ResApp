import { useEffect, useState, useMemo, memo } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const FEATURED = [
  { id: 1, name: "Spicy Paneer Burger", price: "₹229", rating: "4.5", emoji: "🍔", cat: "Burgers" },
  { id: 2, name: "Truffle Mushroom Pizza", price: "₹349", rating: "4.7", emoji: "🍕", cat: "Pizza" },
  { id: 3, name: "Butter Chicken Bowl", price: "₹289", rating: "4.6", emoji: "🍛", cat: "Indian" },
  { id: 4, name: "Mango Cheesecake", price: "₹179", rating: "4.8", emoji: "🍰", cat: "Desserts" },
];

const RestaurantCardMemo = memo(RestaurantCard);
const RestaurantCardPromotedMemo = memo(withPromotedLabel(RestaurantCard));

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch("/api/restaurants");
      const json = await data.json();
      const restaurants =
        json?.data?.cards?.filter(
          (card) =>
            card?.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
        ) || [];
      setListOfRestaurants(restaurants);
    } catch {
      setListOfRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  /* ── Derived filtered list (no extra state) ── */
  const filteredRestaurant = useMemo(() => {
    let list = listOfRestaurants;
    if (appliedSearch) {
      list = list.filter((r) =>
        r.card.card.info.name
          .toLowerCase()
          .includes(appliedSearch.toLowerCase())
      );
    }
    if (activeFilter === "toprated") {
      list = list.filter((r) => r.card.card.info.avgRating > 4);
    }
    return list;
  }, [listOfRestaurants, appliedSearch, activeFilter]);

  if (!onlineStatus) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: "14px",
          background: "var(--bg)",
        }}
      >
        <span style={{ fontSize: "3.5rem" }}>📡</span>
        <p
          style={{
            fontFamily: "var(--f-display)",
            fontSize: "1.6rem",
            color: "var(--text)",
          }}
        >
          You're offline
        </p>
        <p
          style={{
            fontFamily: "var(--f-body)",
            fontSize: "0.9rem",
            color: "var(--text-muted)",
          }}
        >
          Check your internet connection and try again.
        </p>
      </div>
    );
  }

  const handleSearch = () => setAppliedSearch(searchText);

  const handleTopRated = () =>
    setActiveFilter((f) => (f === "toprated" ? "all" : "toprated"));

  const headingText =
    activeFilter === "toprated"
      ? "Top Rated Restaurants"
      : appliedSearch
      ? `Results for "${appliedSearch}"`
      : "Restaurants Near You";

  return (
    <div style={{ background: "var(--bg)" }}>

      {/* ── HERO ─────────────────────────────────── */}
      <section className="hero" style={{ padding: "80px 64px 60px" }}>
        {/* Left */}
        <div style={{ maxWidth: "520px" }}>
          <p
            className="anim-1"
            style={{
              fontFamily: "var(--f-body)",
              fontWeight: 600,
              fontSize: "0.8rem",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "14px",
            }}
          >
            🔥 Order in under 30 minutes
          </p>

          <h1
            className="anim-2"
            style={{
              fontFamily: "var(--f-display)",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 4.5vw, 4.4rem)",
              lineHeight: 1.1,
              letterSpacing: "-1px",
              color: "var(--text)",
              marginBottom: "18px",
            }}
          >
            Cravings delivered{" "}
            <span style={{ color: "var(--red)", fontStyle: "italic" }}>
              anytime!
            </span>
          </h1>

          <p
            className="anim-3"
            style={{
              fontFamily: "var(--f-body)",
              fontWeight: 400,
              fontSize: "1rem",
              color: "var(--text-muted)",
              maxWidth: "370px",
              lineHeight: 1.65,
              marginBottom: "32px",
            }}
          >
            Discover the best food from restaurants near you. Hot meals, fast
            delivery, zero hassle.
          </p>

          <div
            className="anim-4"
            style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}
          >
            <button
              onClick={() =>
                document
                  .getElementById("restaurant-grid")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              style={{
                padding: "14px 32px",
                backgroundColor: "var(--red)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--r-pill)",
                fontFamily: "var(--f-display)",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "transform 150ms ease, box-shadow 150ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.boxShadow = "0 8px 24px var(--red-glow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Order Now
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("featured")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              style={{
                padding: "14px 0",
                backgroundColor: "transparent",
                color: "var(--yellow)",
                border: "none",
                borderBottom: "2px solid var(--yellow)",
                fontFamily: "var(--f-body)",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: "pointer",
              }}
            >
              See Menu →
            </button>
          </div>
        </div>

        {/* Right: hero visual */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Main circle — gentle float */}
          <div
            className="float-hero anim-img"
            style={{
              width: "380px",
              height: "380px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 38% 35%, #3a1a08, #1a0a02)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "8.5rem",
              border: "2px solid rgba(232,35,26,0.12)",
              flexShrink: 0,
              position: "relative",
              zIndex: 1,
            }}
          >
            🍔
          </div>

          {/* Static decorators (no animation = no GPU overhead) */}
          <div
            style={{
              position: "absolute",
              top: "12%",
              left: "2%",
              width: "24px",
              height: "24px",
              backgroundColor: "var(--green)",
              borderRadius: "6px",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "18%",
              right: "4%",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "var(--red)",
            }}
          />
          {/* 1 floating dot (only 1 animated decorator for perf) */}
          <div
            className="float-dot"
            style={{
              position: "absolute",
              top: "6%",
              right: "3%",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "5px solid var(--green)",
            }}
          />

          {/* Happy customers pill */}
          <div
            style={{
              position: "absolute",
              top: "8%",
              right: "-4%",
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "var(--r-lg)",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              zIndex: 2,
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ display: "flex" }}>
              {["👩", "👨", "👩"].map((em, i) => (
                <span
                  key={i}
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    backgroundColor: "var(--surface-2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.85rem",
                    marginLeft: i > 0 ? "-7px" : "0",
                    border: "2px solid var(--surface)",
                  }}
                >
                  {em}
                </span>
              ))}
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--f-body)",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  color: "var(--text)",
                }}
              >
                <span style={{ color: "var(--green)" }}>+2k</span> Happy
                Customers
              </p>
              <p
                style={{
                  fontFamily: "var(--f-body)",
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                }}
              >
                Rated 4.8 / 5.0 ⭐
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED ─────────────────────────────── */}
      <section
        id="featured"
        style={{
          padding: "56px 64px",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <h2
          className="section-title"
          style={{ fontSize: "1.7rem", marginBottom: "28px" }}
        >
          Featured Dishes
        </h2>
        <div
          className="scroll-x"
          style={{ display: "flex", gap: "18px", paddingBottom: "8px" }}
        >
          {FEATURED.map((item) => (
            <div
              key={item.id}
              style={{
                flexShrink: 0,
                width: "190px",
                background: "var(--surface)",
                border: "1px solid var(--border-card)",
                borderRadius: "var(--r-md)",
                padding: "14px 14px 14px",
                paddingTop: "48px",
                position: "relative",
                transition: "border-color 200ms ease, transform 200ms ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(232,35,26,0.4)";
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-card)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-32px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background: "var(--surface-2)",
                  border: "3px solid var(--surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.8rem",
                }}
              >
                {item.emoji}
              </div>
              <p
                style={{
                  fontFamily: "var(--f-body)",
                  fontSize: "0.72rem",
                  color: "var(--text-muted)",
                  marginBottom: "3px",
                }}
              >
                {item.cat}
              </p>
              <h3
                style={{
                  fontFamily: "var(--f-body)",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "var(--text)",
                  marginBottom: "7px",
                }}
              >
                {item.name}
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontWeight: 700,
                    color: "var(--green)",
                    fontSize: "0.95rem",
                  }}
                >
                  {item.price}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--yellow)" }}>
                  ★ {item.rating}
                </span>
              </div>
              <button
                style={{
                  width: "100%",
                  padding: "7px",
                  backgroundColor: "var(--green)",
                  color: "#000",
                  border: "none",
                  borderRadius: "var(--r-sm)",
                  fontFamily: "var(--f-body)",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  transition: "box-shadow 150ms ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 14px var(--green-glow)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = "none")
                }
              >
                + Add
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESTAURANT GRID ──────────────────────── */}
      <section
        id="restaurant-grid"
        style={{ padding: "0 64px 80px", maxWidth: "1280px", margin: "0 auto" }}
      >
        {/* Search + filters */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "28px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-md)",
              padding: "0 12px",
              flex: 1,
              minWidth: "200px",
              maxWidth: "380px",
              transition: "border-color 150ms ease",
            }}
            onFocusCapture={(e) =>
              (e.currentTarget.style.borderColor = "var(--yellow)")
            }
            onBlurCapture={(e) =>
              (e.currentTarget.style.borderColor = "var(--border)")
            }
          >
            <span style={{ fontSize: "0.9rem" }}>🔍</span>
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
                color: "var(--text)",
                fontFamily: "var(--f-body)",
                fontSize: "0.92rem",
              }}
            />
          </div>

          <button
            onClick={handleSearch}
            style={{
              padding: "12px 20px",
              backgroundColor: "var(--yellow)",
              color: "#000",
              border: "none",
              borderRadius: "var(--r-md)",
              fontFamily: "var(--f-body)",
              fontWeight: 700,
              fontSize: "0.88rem",
              cursor: "pointer",
              transition: "opacity 150ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Search
          </button>

          <button
            onClick={handleTopRated}
            style={{
              padding: "12px 20px",
              backgroundColor:
                activeFilter === "toprated"
                  ? "var(--yellow)"
                  : "var(--surface-2)",
              color: activeFilter === "toprated" ? "#000" : "var(--text-muted)",
              border: `1px solid ${
                activeFilter === "toprated" ? "var(--yellow)" : "var(--border)"
              }`,
              borderRadius: "var(--r-md)",
              fontFamily: "var(--f-body)",
              fontWeight: 600,
              fontSize: "0.88rem",
              cursor: "pointer",
              transition: "all 150ms ease",
            }}
          >
            ★ Top Rated
          </button>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: "24px" }}>
          <h2
            className="section-title"
            style={{ fontSize: "1.7rem" }}
          >
            {headingText}
          </h2>
          {!loading && (
            <p
              style={{
                fontFamily: "var(--f-body)",
                fontSize: "0.82rem",
                color: "var(--text-muted)",
                marginTop: "4px",
              }}
            >
              {filteredRestaurant.length} restaurant
              {filteredRestaurant.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        {/* Cards */}
        {loading ? (
          <Shimmer />
        ) : filteredRestaurant.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
              color: "var(--text-muted)",
            }}
          >
            <span
              style={{
                fontSize: "3.5rem",
                display: "block",
                marginBottom: "14px",
              }}
            >
              🍽️
            </span>
            <p
              style={{
                fontFamily: "var(--f-display)",
                fontSize: "1.4rem",
                color: "var(--text)",
                marginBottom: "8px",
              }}
            >
              No restaurants found
            </p>
            <p
              style={{
                fontFamily: "var(--f-body)",
                fontSize: "0.88rem",
              }}
            >
              Try a different search term
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredRestaurant.map((restaurant, index) => {
              const info = restaurant.card.card.info;
              return (
                <Link
                  key={info.id}
                  to={"/restaurants/" + info.id}
                  className="card-anim"
                  style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
                >
                  {info.promoted ? (
                    <RestaurantCardPromotedMemo resData={restaurant} />
                  ) : (
                    <RestaurantCardMemo resData={restaurant} />
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Body;
