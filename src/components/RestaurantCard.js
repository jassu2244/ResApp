import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla, promoted } = resData?.card?.card?.info || {};
  const deliveryTime = sla?.deliveryTime;

  return (
    <div
      className="res-card"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-card)",
        borderRadius: "var(--r-md)",
        overflow: "hidden",
        transition: "border-color 200ms ease-out, transform 200ms ease-out",
        cursor: "pointer",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(232,35,26,0.4)";
        e.currentTarget.style.transform = "translateY(-6px)";
        const img = e.currentTarget.querySelector(".res-img");
        if (img) img.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-card)";
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
            e.target.parentElement.style.background = "var(--surface-2)";
            e.target.style.display = "none";
          }}
        />
        {/* Dark gradient overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
          background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)",
          pointerEvents: "none",
        }} />
        {/* Rating chip */}
        <div style={{
          position: "absolute", top: "10px", right: "10px",
          backgroundColor: "var(--yellow)",
          color: "#000",
          fontFamily: "var(--f-mono)",
          fontWeight: 700,
          fontSize: "0.75rem",
          padding: "3px 10px",
          borderRadius: "var(--r-sm)",
        }}>
          ★ {avgRating}
        </div>
        {/* Promoted */}
        {promoted && (
          <div style={{
            position: "absolute", top: "10px", left: "10px",
            backgroundColor: "var(--red)",
            color: "#fff",
            fontFamily: "var(--f-mono)",
            fontSize: "0.65rem",
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: "var(--r-sm)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            Ad
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "16px" }}>
        <h3 style={{
          fontFamily: "var(--f-body)",
          fontWeight: 700,
          fontSize: "1rem",
          color: "var(--text)",
          marginBottom: "6px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {name}
        </h3>

        <p style={{
          fontFamily: "var(--f-body)",
          fontSize: "0.82rem",
          color: "var(--text-muted)",
          marginBottom: "12px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {cuisines?.join(", ")}
        </p>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid var(--border)",
          paddingTop: "10px",
        }}>
          <span style={{
            fontFamily: "var(--f-mono)",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
          }}>
            {costForTwo}
          </span>
          <span style={{
            fontFamily: "var(--f-body)",
            fontWeight: 600,
            fontSize: "0.82rem",
            color: "var(--red)",
          }}>
            ⏱ {deliveryTime} min
          </span>
        </div>
      </div>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => (props) => <RestaurantCard {...props} />;

export default RestaurantCard;
