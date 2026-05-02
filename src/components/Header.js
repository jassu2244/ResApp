import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

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

  const isDark = theme === "dark";

  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}`}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 32px",
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {/* Logo */}
        <Link to="/">
          <span
            style={{
              fontFamily: "var(--f-display)",
              fontWeight: 900,
              fontSize: "1.55rem",
              color: "var(--yellow)",
              letterSpacing: "-0.5px",
            }}
          >
            ResApp
          </span>
        </Link>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
            { to: "/grocery", label: "Grocery" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                fontFamily: "var(--f-body)",
                fontWeight: 600,
                fontSize: "0.92rem",
                color: "var(--text-muted)",
                transition: "color 150ms ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--text-muted)")}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Online indicator */}
          <span
            style={{
              width: "8px",
              height: "8px",
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
                fontSize: "0.82rem",
                color: "var(--text-muted)",
              }}
            >
              {loggedInUser}
            </span>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            aria-label="Toggle theme"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "var(--r-pill)",
              backgroundColor: "var(--surface-2)",
              border: "1px solid var(--border)",
              cursor: "pointer",
              fontSize: "0.95rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "border-color 150ms ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--yellow)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--border)")
            }
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          {/* Cart */}
          <Link to="/cart">
            <button
              aria-label={`Cart ${cartItems.length} items`}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "9px 18px",
                backgroundColor: "var(--green)",
                color: "#000",
                border: "none",
                borderRadius: "var(--r-pill)",
                cursor: "pointer",
                fontFamily: "var(--f-display)",
                fontWeight: 700,
                fontSize: "0.88rem",
                transition: "box-shadow 200ms ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 18px var(--green-glow)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "none")
              }
            >
              🛒
              <span style={{ fontFamily: "var(--f-mono)", fontWeight: 700 }}>
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
                    width: "18px",
                    height: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--f-mono)",
                    fontSize: "0.65rem",
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
