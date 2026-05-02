import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/grocery", label: "Grocery" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("resapp-theme") || "light");

  const location = useLocation();
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("resapp-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <header
      style={{
        position: "fixed",
        top: "12px",
        left: "16px",
        right: "16px",
        zIndex: 200,
        background: "var(--nav-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "14px",
        boxShadow: scrolled
          ? "0 8px 40px rgba(0,0,0,0.14), 0 0 0 1px var(--border)"
          : "0 2px 20px rgba(0,0,0,0.08), 0 0 0 1px var(--border)",
        transition: "box-shadow 300ms ease",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 20px",
          height: "52px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: "6px", marginRight: "24px", flexShrink: 0 }}
        >
          <span style={{ fontSize: "1.2rem" }}>🍽️</span>
          <span
            style={{
              fontFamily: "var(--f-display)",
              fontWeight: 900,
              fontSize: "1.22rem",
              color: "var(--yellow)",
              letterSpacing: "-0.5px",
            }}
          >
            ResApp
          </span>
        </Link>

        <div style={{ width: "1px", height: "22px", background: "var(--border)", marginRight: "20px", flexShrink: 0 }} />

        <nav style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1 }}>
          {NAV_LINKS.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                style={{
                  fontFamily: "var(--f-body)",
                  fontWeight: active ? 700 : 500,
                  fontSize: "0.88rem",
                  color: active ? "var(--text)" : "var(--text-muted)",
                  padding: "5px 12px",
                  borderRadius: "8px",
                  background: active ? "var(--surface-2)" : "transparent",
                  transition: "background 150ms ease, color 150ms ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "var(--surface-2)";
                    e.currentTarget.style.color = "var(--text)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-muted)";
                  }
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "4px 9px",
              borderRadius: "var(--r-pill)",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: onlineStatus ? "var(--green)" : "var(--red)",
                display: "inline-block",
                flexShrink: 0,
              }}
              title={onlineStatus ? "Online" : "Offline"}
            />
            {loggedInUser && (
              <span
                style={{
                  fontFamily: "var(--f-body)",
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                }}
              >
                {loggedInUser}
              </span>
            )}
          </div>

          <button
            onClick={toggleTheme}
            title="Toggle theme"
            aria-label="Toggle theme"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "var(--r-pill)",
              backgroundColor: "var(--surface-2)",
              border: "1px solid var(--border)",
              cursor: "pointer",
              fontSize: "0.88rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "border-color 150ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--yellow)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <Link to="/cart" style={{ textDecoration: "none" }}>
            <button
              aria-label={`Cart ${cartItems.length} items`}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "7px 15px",
                backgroundColor: cartItems.length > 0 ? "var(--green)" : "var(--surface-2)",
                color: cartItems.length > 0 ? "#000" : "var(--text-muted)",
                border: cartItems.length > 0 ? "1.5px solid var(--green)" : "1.5px solid var(--border)",
                borderRadius: "var(--r-pill)",
                cursor: "pointer",
                fontFamily: "var(--f-display)",
                fontWeight: 700,
                fontSize: "0.82rem",
                transition: "all 200ms ease",
              }}
              onMouseEnter={(e) => {
                if (cartItems.length === 0) {
                  e.currentTarget.style.borderColor = "var(--green)";
                  e.currentTarget.style.color = "var(--green)";
                } else {
                  e.currentTarget.style.boxShadow = "0 4px 16px var(--green-glow)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = cartItems.length > 0 ? "var(--green)" : "var(--border)";
                e.currentTarget.style.color = cartItems.length > 0 ? "#000" : "var(--text-muted)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              🛒
              <span style={{ fontFamily: "var(--f-mono)", fontWeight: 700, minWidth: "12px", textAlign: "center" }}>
                {cartItems.length}
              </span>
              <span>Cart</span>

              {cartItems.length > 0 && (
                <span
                  key={cartItems.length}
                  className="bounce-in"
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    backgroundColor: "var(--red)",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "16px",
                    height: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--f-mono)",
                    fontSize: "0.58rem",
                    fontWeight: 700,
                  }}
                >
                  {cartItems.length}
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
