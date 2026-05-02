import { CDN_URL } from "../utils/constants";

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

  return (
    <div
      data-testid="restaurant-card"
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
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-card)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Image */}
      <div
        style={{ overflow: "hidden", position: "relative", aspectRatio: "16/9" }}
      >
        <img
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
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "45%",
            background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
            pointerEvents: "none",
          }}
        />
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

      {/* Body */}
      <div style={{ padding: "14px" }}>
        <h3
          style={{
            fontFamily: "var(--f-body)",
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "var(--text)",
            marginBottom: "5px",
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
              fontSize: "0.8rem",
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
