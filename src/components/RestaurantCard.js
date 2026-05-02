import { useState } from "react";
import { CDN_URL } from "../utils/constants";

const CUISINE_EMOJI = (cuisines = []) => {
  const c = cuisines.join(" ").toLowerCase();
  if (c.includes("burger") || c.includes("american")) return "🍔";
  if (c.includes("pizza") || c.includes("italian")) return "🍕";
  if (c.includes("chicken") || c.includes("kfc")) return "🍗";
  if (c.includes("biryani") || c.includes("mughlai")) return "🍛";
  if (c.includes("chinese") || c.includes("asian") || c.includes("noodle")) return "🍜";
  if (c.includes("south indian") || c.includes("dosa")) return "🥞";
  if (c.includes("north indian") || c.includes("tandoor") || c.includes("kebab")) return "🍢";
  if (c.includes("healthy") || c.includes("salad") || c.includes("wrap")) return "🥗";
  if (c.includes("dessert") || c.includes("cake") || c.includes("sweet")) return "🍰";
  if (c.includes("beverage") || c.includes("juice") || c.includes("coffee")) return "☕";
  return "🍽️";
};

const RestaurantCard = ({ resData }) => {
  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo,
    sla,
    promoted,
  } = resData?.card?.card?.info || {};
  const deliveryTime = sla?.deliveryTime;
  const [imgFailed, setImgFailed] = useState(false);

  const imgSrc = cloudinaryImageId?.startsWith("http")
    ? cloudinaryImageId
    : cloudinaryImageId
    ? CDN_URL + cloudinaryImageId
    : null;

  const fallbackEmoji = CUISINE_EMOJI(cuisines);

  return (
    <div
      data-testid="restaurant-card"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-card)",
        borderRadius: "var(--r-md)",
        overflow: "hidden",
        transition: "border-color 200ms ease-out, transform 200ms ease-out, box-shadow 200ms ease-out",
        cursor: "pointer",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(232,35,26,0.35)";
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-card)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image / Fallback */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16/9",
          background: "var(--surface-2)",
          overflow: "hidden",
        }}
      >
        {imgSrc && !imgFailed ? (
          <img
            src={imgSrc}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 300ms ease",
            }}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "3.6rem",
              background:
                "linear-gradient(135deg, var(--surface-2) 0%, var(--surface) 100%)",
            }}
          >
            {fallbackEmoji}
          </div>
        )}

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "45%",
            background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
            pointerEvents: "none",
          }}
        />

        {/* Rating badge */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "var(--yellow)",
            color: "#000",
            fontFamily: "var(--f-mono)",
            fontWeight: 700,
            fontSize: "0.72rem",
            padding: "3px 9px",
            borderRadius: "var(--r-sm)",
          }}
        >
          ★ {avgRating}
        </div>

        {/* Promoted badge */}
        {promoted && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              backgroundColor: "var(--red)",
              color: "#fff",
              fontFamily: "var(--f-mono)",
              fontSize: "0.62rem",
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: "var(--r-sm)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Ad
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: "14px" }}>
        <h3
          style={{
            fontFamily: "var(--f-body)",
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "var(--text)",
            marginBottom: "4px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </h3>
        <p
          style={{
            fontFamily: "var(--f-body)",
            fontSize: "0.78rem",
            color: "var(--text-muted)",
            marginBottom: "10px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {cuisines?.join(", ")}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid var(--border)",
            paddingTop: "9px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: "0.78rem",
              color: "var(--text-muted)",
            }}
          >
            {costForTwo}
          </span>
          <span
            style={{
              fontFamily: "var(--f-body)",
              fontWeight: 600,
              fontSize: "0.78rem",
              color: "var(--red)",
            }}
          >
            ⏱ {deliveryTime} min
          </span>
        </div>
      </div>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => (props) =>
  <RestaurantCard {...props} />;

export default RestaurantCard;
