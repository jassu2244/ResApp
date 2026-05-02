import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.card.info.price || item.card.info.defaultPrice || 0;
    return sum + price / 100;
  }, 0);

  return (
    <div style={{
      background: "var(--bg)",
      minHeight: "100vh",
      padding: "100px 60px 80px",
    }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <h1 style={{
          fontFamily: "var(--f-display)",
          fontWeight: 800,
          fontSize: "2rem",
          color: "var(--text)",
          marginBottom: "8px",
        }}>
          Your Cart
        </h1>
        <div style={{ width: "44px", height: "3px", background: "var(--red)", borderRadius: "2px", marginBottom: "36px" }} />

        {cartItems.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "80px 0",
            color: "var(--text-muted)",
          }}>
            <span style={{ fontSize: "5rem", display: "block", marginBottom: "20px" }}>🛒</span>
            <p style={{ fontFamily: "var(--f-display)", fontSize: "1.6rem", color: "var(--text)", marginBottom: "8px" }}>
              Your cart is empty
            </p>
            <p style={{ fontFamily: "var(--f-body)", fontSize: "0.95rem" }}>
              Add items from a restaurant to get started
            </p>
          </div>
        ) : (
          <div style={{
            background: "var(--surface)",
            border: "1px solid var(--border-card)",
            borderRadius: "var(--r-lg)",
            overflow: "hidden",
          }}>
            <ItemList items={cartItems} />

            {/* Footer */}
            <div style={{
              padding: "24px",
              borderTop: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "1.15rem", color: "var(--text)" }}>
                  Total
                </span>
                <span style={{ fontFamily: "var(--f-mono)", fontWeight: 700, fontSize: "1.4rem", color: "var(--green)" }}>
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                className="pulse-red"
                style={{
                  width: "100%",
                  padding: "16px",
                  backgroundColor: "var(--red)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "var(--r-md)",
                  fontFamily: "var(--f-display)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "transform 150ms ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => dispatch(clearCart())}
                style={{
                  width: "100%",
                  padding: "13px",
                  backgroundColor: "transparent",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-md)",
                  fontFamily: "var(--f-body)",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--red)";
                  e.currentTarget.style.color = "var(--red)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                🧹 Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
