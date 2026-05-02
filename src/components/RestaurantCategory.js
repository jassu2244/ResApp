import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => (
  <div style={{
    background: "var(--surface)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--r-md)",
    marginBottom: "10px",
    overflow: "hidden",
  }}>
    <div
      onClick={setShowIndex}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 20px",
        cursor: "pointer",
        background: showItems ? "var(--surface-2)" : "transparent",
        borderBottom: showItems ? "1px solid var(--border)" : "none",
        transition: "background 150ms ease",
      }}
      onMouseEnter={(e) => {
        if (!showItems) e.currentTarget.style.background = "var(--surface-2)";
      }}
      onMouseLeave={(e) => {
        if (!showItems) e.currentTarget.style.background = "transparent";
      }}
    >
      <div>
        <span style={{
          fontFamily: "var(--f-body)",
          fontWeight: 700,
          fontSize: "1.05rem",
          color: "var(--text)",
        }}>
          {data.title}
        </span>
        <span style={{
          fontFamily: "var(--f-mono)",
          fontSize: "0.8rem",
          color: "var(--text-muted)",
          marginLeft: "8px",
        }}>
          ({data.itemCards?.length})
        </span>
      </div>
      <span style={{
        color: "var(--text-muted)",
        fontSize: "1rem",
        transition: "transform 200ms ease",
        display: "inline-block",
        transform: showItems ? "rotate(180deg)" : "rotate(0deg)",
      }}>
        ▾
      </span>
    </div>
    {showItems && data.itemCards && <ItemList items={data.itemCards} />}
  </div>
);

export default RestaurantCategory;
