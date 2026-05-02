import { useState } from "react";
import ItemList from "./ItemList";

const ChevronIcon = ({ open }) => (
  <svg
    width="18" height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transition: "transform 200ms ease",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      flexShrink: 0,
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  return (
    <div style={{
      backgroundColor: "var(--color-surface)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-md)",
      marginBottom: "var(--spacing-sm)",
      overflow: "hidden",
    }}>
      {/* Accordion Header */}
      <div
        onClick={setShowIndex}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "var(--spacing-md) var(--spacing-lg)",
          cursor: "pointer",
          backgroundColor: showItems ? "var(--color-surface-2)" : "transparent",
          transition: "background-color 150ms ease",
          borderBottom: showItems ? "1px solid var(--color-border)" : "none",
        }}
        onMouseEnter={(e) => {
          if (!showItems) e.currentTarget.style.backgroundColor = "var(--color-surface-2)";
        }}
        onMouseLeave={(e) => {
          if (!showItems) e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <div>
          <span style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "1rem",
            color: "var(--color-text)",
          }}>
            {data.title}
          </span>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--color-text-muted)",
            marginLeft: "8px",
          }}>
            ({data.itemCards?.length})
          </span>
        </div>
        <ChevronIcon open={showItems} />
      </div>

      {/* Accordion Body */}
      {showItems && data.itemCards && (
        <ItemList items={data.itemCards} />
      )}
    </div>
  );
};

export default RestaurantCategory;
