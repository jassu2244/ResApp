import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
import { useState } from "react";

const VegBadge = ({ isVeg }) => (
  <span style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "18px",
    height: "18px",
    border: `1.5px solid ${isVeg ? "var(--color-fresh)" : "#A0522D"}`,
    borderRadius: "3px",
    flexShrink: 0,
  }}>
    <span style={{
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: isVeg ? "var(--color-fresh)" : "#A0522D",
    }} />
  </span>
);

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const [addedIds, setAddedIds] = useState({});

  const handleAddItem = (item) => {
    dispatch(addItem(item));
    const id = item.card.info.id;
    setAddedIds((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [id]: false }));
    }, 1500);
  };

  return (
    <div>
      {items.map((item, index) => {
        const info = item.card.info;
        const price = info.price ? info.price / 100 : info.defaultPrice / 100;
        const isVeg = info.itemAttribute?.vegClassifier === "VEG";
        const isAdded = addedIds[info.id];

        return (
          <div
            key={info.id + "_" + index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "var(--spacing-md)",
              padding: "var(--spacing-md) var(--spacing-lg)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            {/* Left: text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "6px",
              }}>
                <VegBadge isVeg={isVeg} />
                <span style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "var(--color-text)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                  {info.name}
                </span>
              </div>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "var(--color-primary)",
                marginBottom: "6px",
              }}>
                ₹{price}
              </p>
              {info.description && (
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  color: "var(--color-text-muted)",
                  lineHeight: "1.4",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                  {info.description}
                </p>
              )}
            </div>

            {/* Right: image + add button */}
            <div style={{
              flexShrink: 0,
              width: "100px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}>
              <div style={{
                width: "100px",
                height: "80px",
                borderRadius: "var(--radius-sm)",
                overflow: "hidden",
                backgroundColor: "var(--color-surface-2)",
              }}>
                {info.imageId ? (
                  <img
                    src={CDN_URL + info.imageId}
                    alt={info.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                ) : (
                  <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                  }}>
                    🍽️
                  </div>
                )}
              </div>
              <button
                onClick={() => handleAddItem(item)}
                style={{
                  width: "100%",
                  padding: "6px 0",
                  backgroundColor: isAdded ? "var(--color-primary)" : "transparent",
                  color: isAdded ? "var(--color-bg)" : "var(--color-primary)",
                  border: "1.5px solid var(--color-primary)",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  transition: "all 100ms ease",
                  transform: "scale(1)",
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"}
                onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                {isAdded ? "✓ Added" : "+ Add"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
