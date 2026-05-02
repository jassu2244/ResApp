import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla, promoted } = resData?.card?.card?.info;
  const deliveryTime = sla?.deliveryTime;

  return (
    <div
      className="res-card"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 200ms ease-out",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-primary)";
        e.currentTarget.style.transform = "translateY(-4px)";
        const img = e.currentTarget.querySelector(".res-img");
        if (img) img.style.transform = "scale(1.03)";
        const isDark = document.documentElement.getAttribute("data-theme") !== "light";
        if (!isDark) e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        const img = e.currentTarget.querySelector(".res-img");
        if (img) img.style.transform = "scale(1)";
      }}
    >
      {/* Image */}
      <div style={{ overflow: "hidden", position: "relative", aspectRatio: "16/9" }}>
        <img
          className="res-img"
          src={CDN_URL + cloudinaryImageId}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 200ms ease-out",
          }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        {/* Amber gradient overlay at bottom */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: "linear-gradient(to top, rgba(15,13,11,0.6), transparent)",
          pointerEvents: "none",
        }} />
        {/* Rating chip */}
        <div style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "var(--color-primary)",
          color: "var(--color-bg)",
          fontFamily: "var(--font-mono)",
          fontWeight: 600,
          fontSize: "0.75rem",
          padding: "3px 8px",
          borderRadius: "var(--radius-sm)",
          display: "flex",
          alignItems: "center",
          gap: "3px",
        }}>
          ★ {avgRating}
        </div>
        {/* Promoted badge */}
        {promoted && (
          <div style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "var(--color-hot)",
            color: "#fff",
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            fontSize: "0.65rem",
            padding: "3px 8px",
            borderRadius: "var(--radius-sm)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}>
            Ad
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "14px 16px 16px" }}>
        <h3 style={{
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: "1rem",
          color: "var(--color-text)",
          marginBottom: "6px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {name}
        </h3>

        {/* Cuisine pills */}
        <div style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginBottom: "12px",
        }}>
          {cuisines.slice(0, 3).map((c) => (
            <span key={c} style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "var(--color-primary)",
              backgroundColor: "var(--color-surface-2)",
              padding: "2px 8px",
              borderRadius: "var(--radius-pill)",
              fontWeight: 500,
            }}>
              {c}
            </span>
          ))}
        </div>

        {/* Meta row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid var(--color-border)",
          paddingTop: "10px",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            fontSize: "0.85rem",
            color: "var(--color-text-muted)",
          }}>
            {costForTwo}
          </span>
          <span style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "0.82rem",
            color: "var(--color-hot)",
          }}>
            ⏱ {deliveryTime} min
          </span>
        </div>
      </div>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => <RestaurantCard {...props} />;
};

export default RestaurantCard;
