import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem, removeItemById } from "../utils/cartSlice";

const VegBadge = ({ isVeg }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "18px",
      height: "18px",
      border: `1.5px solid ${isVeg ? "var(--green)" : "#A0522D"}`,
      borderRadius: "3px",
      flexShrink: 0,
    }}
  >
    <span
      style={{
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        backgroundColor: isVeg ? "var(--green)" : "#A0522D",
      }}
    />
  </span>
);

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const getCount = (id) =>
    cartItems.filter((item) => item?.card?.info?.id === id).length;

  return (
    <div>
      {items.map((item, index) => {
        const info = item.card.info;
        const price = info.price
          ? info.price / 100
          : (info.defaultPrice || 0) / 100;
        const isVeg =
          info.itemAttribute?.vegClassifier === "VEG" || info.isVeg === 1;
        const count = getCount(info.id);
        const imgSrc = info.imageId?.startsWith("http")
          ? info.imageId
          : info.imageId
          ? CDN_URL + info.imageId
          : null;

        return (
          <div
            key={info.id + "_" + index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              padding: "16px 20px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {/* Left: text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                <VegBadge isVeg={isVeg} />
                <span
                  style={{
                    fontFamily: "var(--f-body)",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "var(--text)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {info.name}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--f-mono)",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "var(--green)",
                  marginBottom: "6px",
                }}
              >
                ₹{price.toFixed(2)}
              </p>
              {info.description && (
                <p
                  style={{
                    fontFamily: "var(--f-body)",
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {info.description}
                </p>
              )}
            </div>

            {/* Right: image + counter */}
            <div
              style={{
                flexShrink: 0,
                width: "96px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {/* Food image */}
              <div
                style={{
                  width: "96px",
                  height: "76px",
                  borderRadius: "var(--r-sm)",
                  overflow: "hidden",
                  background: "var(--surface-2)",
                  position: "relative",
                }}
              >
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={info.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.8rem",
                    }}
                  >
                    🍽️
                  </div>
                )}
              </div>

              {/* Swiggy-style live counter */}
              {count > 0 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "96px",
                    border: "1.5px solid var(--green)",
                    borderRadius: "var(--r-sm)",
                    overflow: "hidden",
                    background: "var(--surface)",
                  }}
                >
                  <button
                    onClick={() => dispatch(removeItemById(info.id))}
                    style={{
                      flex: 1,
                      padding: "6px 0",
                      background: "transparent",
                      border: "none",
                      color: "var(--green)",
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      cursor: "pointer",
                      lineHeight: 1,
                    }}
                  >
                    −
                  </button>
                  <span
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "var(--green)",
                      minWidth: "28px",
                      textAlign: "center",
                    }}
                  >
                    {count}
                  </span>
                  <button
                    onClick={() => dispatch(addItem(item))}
                    style={{
                      flex: 1,
                      padding: "6px 0",
                      background: "transparent",
                      border: "none",
                      color: "var(--green)",
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      cursor: "pointer",
                      lineHeight: 1,
                    }}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => dispatch(addItem(item))}
                  style={{
                    width: "96px",
                    padding: "7px 0",
                    backgroundColor: "transparent",
                    color: "var(--green)",
                    border: "1.5px solid var(--green)",
                    borderRadius: "var(--r-sm)",
                    fontFamily: "var(--f-body)",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "background 100ms ease, color 100ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--green)";
                    e.currentTarget.style.color = "#000";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--green)";
                  }}
                >
                  + Add
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
