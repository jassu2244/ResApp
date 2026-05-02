import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => dispatch(clearCart());

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.card.info.price || item.card.info.defaultPrice || 0;
    return sum + price / 100;
  }, 0);

  return (
    <div style={{
      backgroundColor: "var(--color-bg)",
      minHeight: "100vh",
      padding: "var(--spacing-xl) var(--spacing-lg)",
    }}>
      <div style={{
        maxWidth: "720px",
        margin: "0 auto",
      }}>
        {/* Header */}
        <div style={{ marginBottom: "var(--spacing-xl)" }}>
          <h1 className="section-title">Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "var(--spacing-2xl) 0",
            color: "var(--color-text-muted)",
          }}>
            <span style={{ fontSize: "4rem", display: "block", marginBottom: "var(--spacing-md)" }}>🛒</span>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              color: "var(--color-text)",
              marginBottom: "8px",
            }}>
              Your cart is empty
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
              Add items from a restaurant to get started
            </p>
          </div>
        ) : (
          <div style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}>
            {/* Item list */}
            <ItemList items={cartItems} />

            {/* Footer: total + actions */}
            <div style={{
              padding: "var(--spacing-lg)",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-md)",
            }}>
              {/* Total */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  color: "var(--color-text)",
                }}>
                  Total
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  fontSize: "1.3rem",
                  color: "var(--color-primary)",
                }}>
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Buttons */}
              <button
                style={{
                  width: "100%",
                  padding: "14px",
                  backgroundColor: "var(--color-hot)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "background-color 150ms ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--color-primary-dim)"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--color-hot)"}
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handleClearCart}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "transparent",
                  color: "var(--color-text-muted)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-hot)";
                  e.currentTarget.style.color = "var(--color-hot)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.color = "var(--color-text-muted)";
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
