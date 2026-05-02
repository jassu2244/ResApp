import { useState } from "react";

const CATEGORIES = [
  { name: "Fresh Vegetables", emoji: "🥬", count: 120, color: "var(--green)" },
  { name: "Fruits & Juices", emoji: "🍎", count: 85, color: "var(--red)" },
  { name: "Dairy & Eggs", emoji: "🥛", count: 64, color: "var(--yellow)" },
  { name: "Snacks & Chips", emoji: "🍟", count: 200, color: "var(--yellow)" },
  { name: "Beverages", emoji: "🧃", count: 95, color: "var(--green)" },
  { name: "Bakery", emoji: "🍞", count: 48, color: "var(--red)" },
];

const ITEMS = [
  { id: 1, name: "Amul Fresh Milk", price: 68, unit: "1 L", emoji: "🥛", category: "Dairy & Eggs" },
  { id: 2, name: "Farm Tomatoes", price: 45, unit: "500 g", emoji: "🍅", category: "Fresh Vegetables" },
  { id: 3, name: "Lay's Classic", price: 30, unit: "52 g", emoji: "🍟", category: "Snacks & Chips" },
  { id: 4, name: "Banana Bunch", price: 55, unit: "6 pcs", emoji: "🍌", category: "Fruits & Juices" },
  { id: 5, name: "Whole Wheat Bread", price: 40, unit: "400 g", emoji: "🍞", category: "Bakery" },
  { id: 6, name: "Tropicana Orange", price: 95, unit: "1 L", emoji: "🧃", category: "Beverages" },
  { id: 7, name: "Greek Yogurt", price: 120, unit: "400 g", emoji: "🫙", category: "Dairy & Eggs" },
  { id: 8, name: "Baby Spinach", price: 55, unit: "200 g", emoji: "🥬", category: "Fresh Vegetables" },
];

const Grocery = () => {
  const [selectedCat, setSelectedCat] = useState("All");
  const [cart, setCart] = useState({});

  const filtered = selectedCat === "All" ? ITEMS : ITEMS.filter((i) => i.category === selectedCat);

  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id) => setCart((c) => {
    const next = { ...c, [id]: (c[id] || 1) - 1 };
    if (next[id] <= 0) delete next[id];
    return next;
  });

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", padding: "120px 32px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <p style={{
            fontFamily: "var(--f-body)", fontWeight: 600, fontSize: "0.82rem",
            letterSpacing: "2.5px", textTransform: "uppercase",
            color: "var(--text-muted)", marginBottom: "12px",
          }}>
            Fresh & Fast
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h1 style={{
                fontFamily: "var(--f-display)", fontWeight: 900,
                fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "var(--text)", lineHeight: 1.1, marginBottom: "8px",
              }}>
                Grocery <span style={{ color: "var(--green)" }}>Store</span>
              </h1>
              <div style={{ width: "44px", height: "3px", background: "var(--red)", borderRadius: "2px" }} />
            </div>
            {totalItems > 0 && (
              <div style={{
                background: "var(--surface)",
                border: "1px solid var(--border-card)",
                borderRadius: "var(--r-pill)",
                padding: "10px 20px",
                display: "flex", alignItems: "center", gap: "8px",
              }}>
                <span>🛒</span>
                <span style={{ fontFamily: "var(--f-mono)", fontWeight: 700, color: "var(--green)" }}>
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </span>
                <span style={{ fontFamily: "var(--f-body)", fontSize: "0.85rem", color: "var(--text-muted)" }}>in cart</span>
              </div>
            )}
          </div>
        </div>

        {/* Category pills */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
          {["All", ...CATEGORIES.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              style={{
                padding: "10px 20px",
                background: selectedCat === cat ? "var(--green)" : "var(--surface)",
                color: selectedCat === cat ? "#000" : "var(--text-muted)",
                border: `1px solid ${selectedCat === cat ? "var(--green)" : "var(--border)"}`,
                borderRadius: "var(--r-pill)",
                fontFamily: "var(--f-body)",
                fontWeight: 600,
                fontSize: "0.88rem",
                cursor: "pointer",
                transition: "all 150ms ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Category cards */}
        {selectedCat === "All" && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "16px",
            marginBottom: "48px",
          }}>
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                onClick={() => setSelectedCat(cat.name)}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border-card)",
                  borderRadius: "var(--r-md)",
                  padding: "20px 16px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "border-color 200ms ease, transform 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(232,35,26,0.4)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-card)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "10px" }}>{cat.emoji}</span>
                <p style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "0.88rem", color: "var(--text)", marginBottom: "4px" }}>
                  {cat.name}
                </p>
                <p style={{ fontFamily: "var(--f-mono)", fontSize: "0.75rem", color: cat.color }}>
                  {cat.count} items
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Items grid */}
        <h2 className="section-title" style={{ fontSize: "1.5rem", marginBottom: "24px" }}>
          {selectedCat === "All" ? "All Products" : selectedCat}
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}>
          {filtered.map((item) => {
            const qty = cart[item.id] || 0;
            return (
              <div key={item.id} style={{
                background: "var(--surface)",
                border: "1px solid var(--border-card)",
                borderRadius: "var(--r-md)",
                padding: "20px",
                transition: "border-color 200ms ease, transform 200ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(232,35,26,0.4)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-card)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              >
                <span style={{ fontSize: "3rem", display: "block", marginBottom: "12px" }}>{item.emoji}</span>
                <p style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--text)", marginBottom: "4px" }}>
                  {item.name}
                </p>
                <p style={{ fontFamily: "var(--f-body)", fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "12px" }}>
                  {item.unit}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--f-mono)", fontWeight: 700, fontSize: "1.05rem", color: "var(--green)" }}>
                    ₹{item.price}
                  </span>
                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(item.id)}
                      style={{
                        padding: "8px 16px",
                        background: "transparent",
                        color: "var(--red)",
                        border: "1.5px solid var(--red)",
                        borderRadius: "var(--r-sm)",
                        fontFamily: "var(--f-body)",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        transition: "all 100ms ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--red)";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--red)";
                      }}
                    >
                      + Add
                    </button>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <button onClick={() => removeFromCart(item.id)} style={{
                        width: "28px", height: "28px",
                        background: "transparent",
                        color: "var(--red)",
                        border: "1px solid var(--red)",
                        borderRadius: "var(--r-sm)",
                        cursor: "pointer",
                        fontFamily: "var(--f-mono)",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>−</button>
                      <span style={{ fontFamily: "var(--f-mono)", fontWeight: 700, color: "var(--text)" }}>{qty}</span>
                      <button onClick={() => addToCart(item.id)} style={{
                        width: "28px", height: "28px",
                        background: "var(--red)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "var(--r-sm)",
                        cursor: "pointer",
                        fontFamily: "var(--f-mono)",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>+</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Grocery;
