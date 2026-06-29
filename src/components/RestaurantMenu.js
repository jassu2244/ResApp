import { useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import ShimmerMenu from "./ShimmerMenu";
import RestaurantCategory from "./RestaurantCategory";
import { CDN_URL } from "../utils/constants";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <ShimmerMenu />;

  // resInfo === false means the fetch failed — use empty fallback
  const safeResInfo = resInfo || { cards: [] };

  const restaurantInfo = safeResInfo?.cards[2]?.card?.card?.info || safeResInfo?.cards[0]?.card?.card?.info || {};

  const { name, cuisines, costForTwoMessage, cloudinaryImageId, avgRating, sla } = restaurantInfo;
  const deliveryTime = sla?.deliveryTime;

  const regularCards =
    safeResInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
    safeResInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
    safeResInfo?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
    [];

  const categories = regularCards.filter(
    (c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
  );

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", paddingTop: "80px" }}>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 32px 40px",
            display: "flex",
            gap: "32px",
            alignItems: "center",
          }}>
          {cloudinaryImageId && (
            <div
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "var(--r-md)",
                overflow: "hidden",
                flexShrink: 0,
                border: "1px solid var(--border-card)",
              }}>
              <img
                src={CDN_URL + cloudinaryImageId}
                alt={name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}

          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontFamily: "var(--f-display)",
                fontWeight: 800,
                fontSize: "2.2rem",
                color: "var(--text)",
                letterSpacing: "-0.5px",
                marginBottom: "8px",
              }}>
              {name || "Restaurant Menu"}
            </h1>
            <p
              style={{
                fontFamily: "var(--f-body)",
                fontSize: "0.9rem",
                color: "var(--text-muted)",
                marginBottom: "16px",
              }}>
              {cuisines?.join(", ") || "Various cuisines"}
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {avgRating && (
                <span
                  style={{
                    backgroundColor: "var(--yellow)",
                    color: "#000",
                    fontFamily: "var(--f-mono)",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    padding: "4px 12px",
                    borderRadius: "var(--r-pill)",
                  }}>
                  ★ {avgRating}
                </span>
              )}
              {deliveryTime && (
                <span
                  style={{
                    backgroundColor: "var(--surface-2)",
                    color: "var(--red)",
                    fontFamily: "var(--f-body)",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    padding: "4px 12px",
                    borderRadius: "var(--r-pill)",
                    border: "1px solid var(--border)",
                  }}>
                  ⏱ {deliveryTime} min
                </span>
              )}
              {costForTwoMessage && (
                <span
                  style={{
                    backgroundColor: "var(--surface-2)",
                    color: "var(--text-muted)",
                    fontFamily: "var(--f-mono)",
                    fontSize: "0.8rem",
                    padding: "4px 12px",
                    borderRadius: "var(--r-pill)",
                    border: "1px solid var(--border)",
                  }}>
                  {costForTwoMessage}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 32px 80px" }}>
        {categories.length > 0 ? (
          <>
            <h2 className="section-title" style={{ fontSize: "1.6rem", marginBottom: "24px" }}>
              Menu
            </h2>
            {categories.map((category, index) => (
              <RestaurantCategory
                key={category?.card?.card.title}
                data={category?.card?.card}
                showItems={index === showIndex}
                setShowIndex={() => setShowIndex(showIndex === index ? null : index)}
              />
            ))}
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
            <span style={{ fontSize: "4rem", display: "block", marginBottom: "16px" }}>🍽️</span>
            <p
              style={{ fontFamily: "var(--f-display)", fontSize: "1.5rem", color: "var(--text)", marginBottom: "8px" }}>
              Menu unavailable
            </p>
            <p style={{ fontFamily: "var(--f-body)", fontSize: "0.9rem" }}>
              Swiggy API is blocking requests from this location. Showing demo data where possible
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
