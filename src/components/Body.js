import { useEffect, useState, useMemo, useRef, memo } from "react";
import { useDispatch } from "react-redux";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { addItem, removeItemById } from "../utils/cartSlice";

const HERO_FOODS = ["🍔", "🍕", "🍛", "🍜", "🌮", "🍗", "🥗", "🍣", "🍱", "🧆"];

const FEATURED = [
  { id: "feat_1", name: "Spicy Paneer Burger", price: 22900, displayPrice: "₹229", rating: "4.5", emoji: "🍔", cat: "Burgers" },
  { id: "feat_2", name: "Truffle Mushroom Pizza", price: 34900, displayPrice: "₹349", rating: "4.7", emoji: "🍕", cat: "Pizza" },
  { id: "feat_3", name: "Butter Chicken Bowl", price: 28900, displayPrice: "₹289", rating: "4.6", emoji: "🍛", cat: "Indian" },
  { id: "feat_4", name: "Mango Cheesecake", price: 17900, displayPrice: "₹179", rating: "4.8", emoji: "🍰", cat: "Desserts" },
  { id: "feat_5", name: "Crispy Chicken Wings", price: 19900, displayPrice: "₹199", rating: "4.5", emoji: "🍗", cat: "Chicken" },
  { id: "feat_6", name: "Veg Hakka Noodles", price: 16900, displayPrice: "₹169", rating: "4.4", emoji: "🍜", cat: "Chinese" },
];

const FALLBACK_RESTAURANTS = [
  { id: "358251", name: "Wendy's Burgers", cloudinaryImageId: "RX_THUMBNAIL/IMAGES/VENDOR/2025/1/11/41fc33b1-1a01-45a1-8062-6875cd824c67_358251.JPG", cuisines: ["Burgers", "American"], avgRating: 4.4, costForTwo: "₹350 for two", deliveryTime: 46, areaName: "Sector 4", promoted: false },
  { id: "253783", name: "McDonald's", cloudinaryImageId: "RX_THUMBNAIL/IMAGES/VENDOR/2025/1/9/248be8d0-1623-4b8a-b42b-11072a5431d8_253783.JPG", cuisines: ["American", "Fast Food", "Beverages"], avgRating: 4.4, costForTwo: "₹400 for two", deliveryTime: 30, areaName: "Nadesar", promoted: true },
  { id: "100001", name: "KFC", cloudinaryImageId: "RX_THUMBNAIL/IMAGES/VENDOR/2024/6/kfc_100001.jpg", cuisines: ["Chicken", "Fast Food", "Snacks"], avgRating: 4.0, costForTwo: "₹380 for two", deliveryTime: 35, areaName: "Lanka", promoted: false },
  { id: "100002", name: "Domino's Pizza", cloudinaryImageId: "RX_THUMBNAIL/IMAGES/VENDOR/2024/6/dominos_100002.jpg", cuisines: ["Pizza", "Italian", "Beverages"], avgRating: 4.5, costForTwo: "₹450 for two", deliveryTime: 28, areaName: "Sigra", promoted: true },
  { id: "100003", name: "Subway", cloudinaryImageId: "RX_THUMBNAIL/IMAGES/VENDOR/2024/6/subway_100003.jpg", cuisines: ["Healthy Food", "Salads", "Wraps"], avgRating: 4.2, costForTwo: "₹300 for two", deliveryTime: 25, areaName: "Bhelupur", promoted: false },
  { id: "100005", name: "Biryani Blues", cloudinaryImageId: "RX_THUMBNAIL/IMAGES/VENDOR/2024/6/biryani_100005.jpg", cuisines: ["Biryani", "Mughlai", "North Indian"], avgRating: 4.7, costForTwo: "₹320 for two", deliveryTime: 45, areaName: "Assi", promoted: false },
  { id: "100007", name: "Chinese Express", cuisines: ["Chinese", "Asian", "Noodles"], avgRating: 4.6, costForTwo: "₹280 for two", deliveryTime: 20, areaName: "Lahurabir", promoted: true },
  { id: "100008", name: "South Spice", cuisines: ["South Indian", "Dosa", "Idli"], avgRating: 4.5, costForTwo: "₹260 for two", deliveryTime: 22, areaName: "Maidagin", promoted: false },
].map((info) => ({
  card: {
    card: {
      "@type": "type.googleapis.com/swiggy.presentation.food.v2.Restaurant",
      info: {
        ...info,
        sla: { deliveryTime: info.deliveryTime, slaString: `${info.deliveryTime} MINS` },
      },
    },
  },
}));

/* ── 3D Featured Card ──────────────────────────── */
const FeaturedCard = ({ item }) => {
  const cardRef = useRef(null);
  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();

  const onMove = (e) => {
    const c = cardRef.current;
    if (!c) return;
    const r = c.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -9;
    const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 9;
    c.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
    c.style.boxShadow = `0 20px 44px rgba(0,0,0,0.22), 0 0 0 1.5px var(--border-card)`;
  };

  const onLeave = () => {
    const c = cardRef.current;
    if (!c) return;
    c.style.transform = `perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)`;
    c.style.boxShadow = "none";
  };

  const cartItem = {
    card: { info: { id: item.id, name: item.name, price: item.price, defaultPrice: item.price, isVeg: 1, imageId: "" } },
  };

  const add = (e) => { e.stopPropagation(); setQty((q) => q + 1); dispatch(addItem(cartItem)); };
  const remove = (e) => { e.stopPropagation(); if (qty <= 0) return; setQty((q) => q - 1); dispatch(removeItemById(item.id)); };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        flexShrink: 0,
        width: "192px",
        background: "var(--surface)",
        border: "1px solid var(--border-card)",
        borderRadius: "20px",
        padding: "20px 16px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        cursor: "default",
        transition: "transform 0.12s ease-out, box-shadow 0.12s ease-out",
        willChange: "transform",
      }}
    >
      <div style={{ width: "76px", height: "76px", borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, var(--surface-2), var(--bg))", border: "2px solid var(--border-card)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.4rem", boxShadow: "0 6px 20px rgba(0,0,0,0.18)", flexShrink: 0 }}>
        {item.emoji}
      </div>
      <span style={{ fontFamily: "var(--f-body)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--text-muted)" }}>
        {item.cat}
      </span>
      <h3 style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "0.88rem", color: "var(--text)", textAlign: "center", lineHeight: 1.3, margin: "0" }}>
        {item.name}
      </h3>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <span style={{ fontFamily: "var(--f-mono)", fontWeight: 700, color: "var(--green)", fontSize: "1rem" }}>{item.displayPrice}</span>
        <span style={{ fontFamily: "var(--f-body)", fontWeight: 600, fontSize: "0.75rem", color: "var(--yellow)" }}>★ {item.rating}</span>
      </div>
      {qty > 0 ? (
        <div style={{ display: "flex", alignItems: "center", width: "100%", border: "1.5px solid var(--green)", borderRadius: "var(--r-sm)", overflow: "hidden", background: "var(--surface-2)" }}>
          <button onClick={remove} style={{ flex: 1, padding: "7px 0", background: "transparent", border: "none", color: "var(--green)", fontSize: "1.2rem", fontWeight: 800, cursor: "pointer", lineHeight: 1 }}>−</button>
          <span style={{ fontFamily: "var(--f-mono)", fontWeight: 700, fontSize: "1rem", color: "var(--green)", minWidth: "32px", textAlign: "center" }}>{qty}</span>
          <button onClick={add} style={{ flex: 1, padding: "7px 0", background: "transparent", border: "none", color: "var(--green)", fontSize: "1.2rem", fontWeight: 800, cursor: "pointer", lineHeight: 1 }}>+</button>
        </div>
      ) : (
        <button
          onClick={add}
          style={{ width: "100%", padding: "8px", backgroundColor: "var(--green)", color: "#000", border: "none", borderRadius: "var(--r-sm)", fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", transition: "box-shadow 150ms ease" }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 18px var(--green-glow)")}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          + Add
        </button>
      )}
    </div>
  );
};

const RestaurantCardMemo = memo(RestaurantCard);
const RestaurantCardPromotedMemo = memo(withPromotedLabel(RestaurantCard));

/* ── Body ─────────────────────────────────────── */
const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  /* cycling hero emoji */
  const [foodIdx, setFoodIdx] = useState(0);
  const [foodKey, setFoodKey] = useState(0);

  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    fetchData();
  }, []);

  /* swap hero food every 2.2s */
  useEffect(() => {
    const id = setInterval(() => {
      setFoodIdx((i) => (i + 1) % HERO_FOODS.length);
      setFoodKey((k) => k + 1);
    }, 2200);
    return () => clearInterval(id);
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
      setListOfRestaurants(restaurants.length ? restaurants : FALLBACK_RESTAURANTS);
    } catch {
      setListOfRestaurants(FALLBACK_RESTAURANTS);
    } finally {
      setLoading(false);
    }
  };

  const filteredRestaurant = useMemo(() => {
    let list = listOfRestaurants;
    if (appliedSearch) {
      list = list.filter((r) =>
        r.card.card.info.name.toLowerCase().includes(appliedSearch.toLowerCase())
      );
    }
    if (activeFilter === "toprated") {
      list = list.filter((r) => r.card.card.info.avgRating > 4);
    }
    return list;
  }, [listOfRestaurants, appliedSearch, activeFilter]);

  if (!onlineStatus) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "14px", background: "var(--bg)" }}>
        <span style={{ fontSize: "3.5rem" }}>📡</span>
        <p style={{ fontFamily: "var(--f-display)", fontSize: "1.6rem", color: "var(--text)" }}>You're offline</p>
        <p style={{ fontFamily: "var(--f-body)", fontSize: "0.9rem", color: "var(--text-muted)" }}>Check your internet connection and try again.</p>
      </div>
    );
  }

  const handleSearch = () => setAppliedSearch(searchText);
  const handleTopRated = () => setActiveFilter((f) => (f === "toprated" ? "all" : "toprated"));
  const headingText =
    activeFilter === "toprated"
      ? "Top Rated Restaurants"
      : appliedSearch
      ? `Results for "${appliedSearch}"`
      : "Restaurants Near You";

  return (
    <div style={{ background: "var(--bg)" }}>

      <div className="hero-bg">
        <div className="hero" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 64px 60px" }}>

          {/* Left: text */}
          <div style={{ maxWidth: "520px" }}>
            <p className="anim-1" style={{ fontFamily: "var(--f-body)", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "14px" }}>
              🔥 Order in under 30 minutes
            </p>
            <h1 className="anim-2" style={{ fontFamily: "var(--f-display)", fontWeight: 900, fontSize: "clamp(2.4rem, 4.5vw, 4.4rem)", lineHeight: 1.1, letterSpacing: "-1px", color: "var(--text)", marginBottom: "18px" }}>
              Cravings delivered{" "}
              <span style={{ color: "var(--red)", fontStyle: "italic" }}>anytime!</span>
            </h1>
            <p className="anim-3" style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "var(--text-muted)", maxWidth: "370px", lineHeight: 1.65, marginBottom: "32px" }}>
              Discover the best food from restaurants near you. Hot meals, fast delivery, zero hassle.
            </p>
            <div className="anim-4" style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
              <button
                onClick={() => document.getElementById("restaurant-grid")?.scrollIntoView({ behavior: "smooth" })}
                style={{ padding: "14px 32px", backgroundColor: "var(--red)", color: "#fff", border: "none", borderRadius: "var(--r-pill)", fontFamily: "var(--f-display)", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", transition: "transform 150ms ease, box-shadow 150ms ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 8px 24px var(--red-glow)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                Order Now
              </button>
              <button
                onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
                style={{ padding: "14px 0", backgroundColor: "transparent", color: "var(--yellow)", border: "none", borderBottom: "2px solid var(--yellow)", fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer" }}
              >
                See Menu →
              </button>
            </div>
          </div>

          {/* Right: animated hero visual */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>

            {/* Single floating group — food circle + rings + orbiting particles all move together */}
            <div
              className="float-hero anim-img"
              style={{ position: "relative", width: "380px", height: "380px", flexShrink: 0, zIndex: 1 }}
            >
              {/* Pulsing red glow halo */}
              <div className="pulse-glow" style={{ position: "absolute", inset: "-40px", borderRadius: "50%", background: "radial-gradient(circle, rgba(232,35,26,0.13) 0%, transparent 65%)", pointerEvents: "none" }} />

              {/* Spinning dashed red ring */}
              <div className="spin-ring" style={{ position: "absolute", inset: "-26px", borderRadius: "50%", border: "1.5px dashed rgba(232,35,26,0.35)", pointerEvents: "none" }} />

              {/* Counter-spinning green ring */}
              <div className="spin-ring-reverse" style={{ position: "absolute", inset: "-44px", borderRadius: "50%", border: "1.5px dashed rgba(34,197,94,0.28)", pointerEvents: "none" }} />

              {/* Orbiting yellow dot — rides the red ring */}
              <div className="orbit-fast" style={{ position: "absolute", inset: "-26px", borderRadius: "50%", pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: "-9px", left: "50%", transform: "translateX(-50%)", width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "var(--yellow)", boxShadow: "0 0 14px var(--yellow)", opacity: 0.9 }} />
              </div>

              {/* Orbiting green dot — rides the green ring */}
              <div className="orbit-slow-reverse" style={{ position: "absolute", inset: "-44px", borderRadius: "50%", pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: "-8px", left: "50%", transform: "translateX(-50%)", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "var(--green)", boxShadow: "0 0 12px var(--green-glow)" }} />
              </div>

              {/* Food circle */}
              <div style={{ width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle at 38% 35%, #3a1a08, #1a0a02)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8.5rem", border: "2px solid rgba(232,35,26,0.12)", overflow: "hidden" }}>
                <span key={foodKey} className="food-swap" style={{ lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {HERO_FOODS[foodIdx]}
                </span>
              </div>
            </div>

            {/* Independent decorators with their own drift animations */}
            <div className="sparkle-1" style={{ position: "absolute", top: "28%", left: "-3%", width: "9px", height: "9px", borderRadius: "50%", backgroundColor: "var(--yellow)", opacity: 0.75, zIndex: 3 }} />
            <div className="sparkle-2" style={{ position: "absolute", bottom: "28%", left: "4%", width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--red)", opacity: 0.65, zIndex: 3 }} />
            <div className="sparkle-3" style={{ position: "absolute", bottom: "14%", right: "10%", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--green)", opacity: 0.7, zIndex: 3 }} />

            <div className="drift-green" style={{ position: "absolute", top: "12%", left: "2%", width: "24px", height: "24px", backgroundColor: "var(--green)", borderRadius: "6px" }} />
            <div className="drift-red" style={{ position: "absolute", bottom: "18%", right: "4%", width: "14px", height: "14px", borderRadius: "50%", backgroundColor: "var(--red)" }} />
            <div className="float-dot" style={{ position: "absolute", top: "6%", right: "3%", width: "32px", height: "32px", borderRadius: "50%", border: "5px solid var(--green)" }} />

            {/* Happy customers pill */}
            <div className="glass-pill float-card anim-img" style={{ position: "absolute", top: "8%", right: "-4%", borderRadius: "var(--r-lg)", padding: "10px 14px", display: "flex", alignItems: "center", gap: "10px", zIndex: 2, whiteSpace: "nowrap" }}>
              <div style={{ display: "flex" }}>
                {["👩", "👨", "👩"].map((em, i) => (
                  <span key={i} style={{ width: "26px", height: "26px", borderRadius: "50%", backgroundColor: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", marginLeft: i > 0 ? "-7px" : "0", border: "2px solid var(--surface)" }}>{em}</span>
                ))}
              </div>
              <div>
                <p style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "0.82rem", color: "var(--text)" }}>
                  <span style={{ color: "var(--green)" }}>+2k</span> Happy Customers
                </p>
                <p style={{ fontFamily: "var(--f-body)", fontSize: "0.7rem", color: "var(--text-muted)" }}>Rated 4.8 / 5.0 ⭐</p>
              </div>
            </div>

            {/* Delivery time badge */}
            <div className="glass-pill float-card-2 anim-4" style={{ position: "absolute", bottom: "8%", left: "-10%", borderRadius: "var(--r-lg)", padding: "10px 14px", display: "flex", alignItems: "center", gap: "10px", zIndex: 2, whiteSpace: "nowrap" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "rgba(232,35,26,0.15)", border: "1px solid rgba(232,35,26,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
                ⚡
              </div>
              <div>
                <p style={{ fontFamily: "var(--f-display)", fontWeight: 800, fontSize: "0.92rem", color: "var(--text)" }}>30 min</p>
                <p style={{ fontFamily: "var(--f-body)", fontSize: "0.7rem", color: "var(--text-muted)" }}>avg delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURED DISHES — 3D cards ───────────── */}
      <section id="featured" style={{ padding: "60px 64px 40px", maxWidth: "1280px", margin: "0 auto" }}>
        <h2 className="section-title" style={{ fontSize: "1.7rem", marginBottom: "36px" }}>
          Featured Dishes
        </h2>
        <div className="scroll-x" style={{ display: "flex", gap: "20px", paddingBottom: "16px", paddingTop: "4px" }}>
          {FEATURED.map((item) => (
            <FeaturedCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* ── RESTAURANT GRID ──────────────────────── */}
      <section id="restaurant-grid" style={{ padding: "0 64px 80px", maxWidth: "1280px", margin: "0 auto" }}>

        {/* Search + filters */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px", flexWrap: "wrap" }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: "var(--r-md)", padding: "0 12px", flex: 1, minWidth: "200px", maxWidth: "380px", transition: "border-color 150ms ease" }}
            onFocusCapture={(e) => (e.currentTarget.style.borderColor = "var(--yellow)")}
            onBlurCapture={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <span style={{ fontSize: "0.9rem" }}>🔍</span>
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              style={{ flex: 1, padding: "12px 0", background: "transparent", border: "none", outline: "none", color: "var(--text)", fontFamily: "var(--f-body)", fontSize: "0.92rem" }}
            />
          </div>

          <button
            onClick={handleSearch}
            style={{ padding: "12px 22px", backgroundColor: "var(--yellow)", color: "#000", border: "none", borderRadius: "var(--r-md)", fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", transition: "opacity 150ms ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Search
          </button>

          <button
            onClick={handleTopRated}
            style={{ padding: "12px 20px", backgroundColor: activeFilter === "toprated" ? "var(--yellow)" : "var(--surface)", color: activeFilter === "toprated" ? "#000" : "var(--text-muted)", border: `1.5px solid ${activeFilter === "toprated" ? "var(--yellow)" : "var(--border)"}`, borderRadius: "var(--r-md)", fontFamily: "var(--f-body)", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer", transition: "all 150ms ease" }}
          >
            ★ Top Rated
          </button>
        </div>

        {/* Heading + count */}
        <div style={{ marginBottom: "24px" }}>
          <h2 className="section-title" style={{ fontSize: "1.7rem" }}>{headingText}</h2>
          {!loading && (
            <p style={{ fontFamily: "var(--f-body)", fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>
              {filteredRestaurant.length} restaurant{filteredRestaurant.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        {/* Cards */}
        {loading ? (
          <Shimmer />
        ) : filteredRestaurant.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
            <span style={{ fontSize: "3.5rem", display: "block", marginBottom: "14px" }}>🍽️</span>
            <p style={{ fontFamily: "var(--f-display)", fontSize: "1.4rem", color: "var(--text)", marginBottom: "8px" }}>No restaurants found</p>
            <p style={{ fontFamily: "var(--f-body)", fontSize: "0.88rem" }}>Try a different search term</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
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
