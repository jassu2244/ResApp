import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}`}>
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 32px",
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
      }}>
        {/* Logo */}
        <Link to="/">
          <span style={{
            fontFamily: "var(--f-display)",
            fontWeight: 900,
            fontSize: "1.6rem",
            color: "var(--yellow)",
            letterSpacing: "-0.5px",
          }}>
            ResApp
          </span>
        </Link>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
            { to: "/grocery", label: "Grocery" },
          ].map(({ to, label }) => (
            <Link key={to} to={to} style={{
              fontFamily: "var(--f-body)",
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "var(--text-muted)",
              transition: "color 150ms ease",
            }}
            onMouseEnter={(e) => e.target.style.color = "var(--text)"}
            onMouseLeave={(e) => e.target.style.color = "var(--text-muted)"}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: status + theme + cart */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{
            width: "8px", height: "8px",
            borderRadius: "50%",
            backgroundColor: onlineStatus ? "var(--green)" : "var(--red)",
            display: "inline-block",
            flexShrink: 0,
          }} title={onlineStatus ? "Online" : "Offline"} />

          {loggedInUser && (
            <span style={{
              fontFamily: "var(--f-body)",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
            }}>
              {loggedInUser}
            </span>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "var(--r-pill)",
              backgroundColor: "var(--surface-2)",
              border: "1px solid var(--border)",
              cursor: "pointer",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 150ms ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--red)"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Cart */}
          <Link to="/cart">
            <div style={{ position: "relative" }}>
              <button style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                backgroundColor: "var(--green)",
                color: "#000",
                border: "none",
                borderRadius: "var(--r-pill)",
                cursor: "pointer",
                fontFamily: "var(--f-display)",
                fontWeight: 700,
                fontSize: "0.9rem",
                transition: "box-shadow 200ms ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 20px var(--green-glow)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
              >
                🛒
                <span style={{ fontFamily: "var(--f-mono)", fontWeight: 700 }}>
                  {cartItems.length}
                </span>
                <span>Cart</span>
              </button>
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
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--f-mono)",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                  }}
                >
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
