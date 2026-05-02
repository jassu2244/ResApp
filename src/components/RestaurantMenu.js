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

  const restaurantInfo =
    resInfo?.cards[2]?.card?.card?.info ||
    resInfo?.cards[0]?.card?.card?.info ||
    {};

  const { name, cuisines, costForTwoMessage, cloudinaryImageId, avgRating, sla } = restaurantInfo;
  const deliveryTime = sla?.deliveryTime;

  const regularCards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
    resInfo?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
    [];

  const categories = regularCards.filter(
    (c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
  );

  return (
    <div style={{
      backgroundColor: "var(--color-bg)",
      minHeight: "100vh",
    }}>
      {/* Restaurant Hero Header */}
      <div style={{
        backgroundColor: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "var(--spacing-xl) var(--spacing-lg)",
          display: "flex",
          gap: "var(--spacing-xl)",
          alignItems: "center",
        }}>
          {/* Restaurant image */}
          {cloudinaryImageId && (
            <div style={{
              width: "140px",
              height: "140px",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              flexShrink: 0,
              border: "1px solid var(--color-border)",
            }}>
              <img
                src={CDN_URL + cloudinaryImageId}
                alt={name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
          )}

          {/* Info */}
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              color: "var(--color-text)",
              letterSpacing: "-0.5px",
              marginBottom: "8px",
            }}>
              {name || "Restaurant Menu"}
            </h1>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              color: "var(--color-text-muted)",
              marginBottom: "var(--spacing-md)",
            }}>
              {cuisines?.join(", ") || "Various cuisines"}
            </p>

            {/* Stats chips */}
            <div style={{ display: "flex", gap: "var(--spacing-sm)", flexWrap: "wrap" }}>
              {avgRating && (
                <span style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-bg)",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  padding: "4px 12px",
                  borderRadius: "var(--radius-pill)",
                }}>
                  ★ {avgRating}
                </span>
              )}
              {deliveryTime && (
                <span style={{
                  backgroundColor: "var(--color-surface-2)",
                  color: "var(--color-hot)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "0.8rem",
                  padding: "4px 12px",
                  borderRadius: "var(--radius-pill)",
                  border: "1px solid var(--color-border)",
                }}>
                  ⏱ {deliveryTime} min
                </span>
              )}
              {costForTwoMessage && (
                <span style={{
                  backgroundColor: "var(--color-surface-2)",
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  padding: "4px 12px",
                  borderRadius: "var(--radius-pill)",
                  border: "1px solid var(--color-border)",
                }}>
                  {costForTwoMessage}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "var(--spacing-xl) var(--spacing-lg)",
      }}>
        {categories.length > 0 ? (
          <>
            <h2 className="section-title" style={{ marginBottom: "var(--spacing-lg)" }}>Menu</h2>
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
          <div style={{
            textAlign: "center",
            padding: "var(--spacing-2xl) 0",
            color: "var(--color-text-muted)",
          }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "16px" }}>🍽️</span>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-text)", marginBottom: "8px" }}>
              Menu unavailable
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
              The Swiggy API may be blocking requests. Please try again later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
