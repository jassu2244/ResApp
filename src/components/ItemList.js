import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
import { useState } from "react";

const VegBadge = ({ isVeg }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: "18px", height: "18px",
    border: `1.5px solid ${isVeg ? "var(--green)" : "#A0522D"}`,
    borderRadius: "3px", flexShrink: 0,
  }}>
    <span style={{
      width: "8px", height: "8px", borderRadius: "50%",
      backgroundColor: isVeg ? "var(--green)" : "#A0522D",
    }} />
  </span>
);

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState({});

  const handleAdd = (item) => {
    dispatch(addItem(item));
    const id = item.card.info.id;
    setAdded((p) => ({ ...p, [id]: true }));
    setTimeout(() => setAdded((p) => ({ ...p, [id]: false })), 1500);
  };

  return (
    <div>
      {items.map((item, index) => {
        const info = item.card.info;
        const price = info.price ? info.price / 100 : (info.defaultPrice || 0) / 100;
        const isVeg = info.itemAttribute?.vegClassifier === "VEG" || info.isVeg === 1;
        const isAdded = added[info.id];

        return (
          <div key={info.id + "_" + index} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "16px",
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
          }}>
            {/* Left: text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <VegBadge isVeg={isVeg} />
                <span style={{
                  fontFamily: "var(--f-body)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--text)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  {info.name}
                </span>
              </div>
              <p style={{
                fontFamily: "var(--f-mono)",
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "var(--green)",
                marginBottom: "6px",
              }}>
                ₹{price}
              </p>
              {info.description && (
                <p style={{
                  fontFamily: "var(--f-body)",
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                  {info.description}
                </p>
              )}
            </div>

            {/* Right: image + add */}
            <div style={{ flexShrink: 0, width: "90px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "90px", height: "72px",
                borderRadius: "var(--r-sm)",
                overflow: "hidden",
                background: "var(--surface-2)",
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
                    width: "100%", height: "100%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.6rem",
                  }}>🍽️</div>
                )}
              </div>
              <button
                onClick={() => handleAdd(item)}
                style={{
                  width: "100%",
                  padding: "6px 0",
                  backgroundColor: isAdded ? "var(--red)" : "transparent",
                  color: isAdded ? "#fff" : "var(--red)",
                  border: "1.5px solid var(--red)",
                  borderRadius: "var(--r-sm)",
                  fontFamily: "var(--f-body)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  transition: "all 100ms ease",
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.93)"}
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
