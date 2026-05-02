import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px", textAlign: "center" }}>
      <p style={{ fontFamily: "var(--f-display)", fontWeight: 900, fontSize: "8rem", color: "var(--surface-2)", lineHeight: 1, marginBottom: "8px", letterSpacing: "-4px" }}>
        {err?.status || "404"}
      </p>

      <h1 style={{ fontFamily: "var(--f-display)", fontWeight: 800, fontSize: "2.2rem", color: "var(--text)", marginBottom: "12px" }}>
        Oops! Something went <span style={{ color: "var(--red)" }}>wrong</span>
      </h1>
      <div style={{ width: "44px", height: "3px", background: "var(--red)", borderRadius: "2px", margin: "0 auto 20px" }} />

      <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "var(--text-muted)", maxWidth: "400px", lineHeight: 1.65, marginBottom: "36px" }}>
        {err?.statusText || err?.message || "The page you're looking for doesn't exist or has been moved."}
      </p>

      <div style={{ display: "flex", gap: "16px" }}>
        <Link to="/">
          <button
            style={{ padding: "14px 32px", background: "var(--red)", color: "#fff", border: "none", borderRadius: "var(--r-pill)", fontFamily: "var(--f-display)", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", transition: "transform 150ms ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            🏠 Go Home
          </button>
        </Link>
        <button
          onClick={() => window.history.back()}
          style={{ padding: "14px 32px", background: "transparent", color: "var(--text-muted)", border: "1px solid var(--border)", borderRadius: "var(--r-pill)", fontFamily: "var(--f-body)", fontWeight: 600, fontSize: "0.95rem", cursor: "pointer", transition: "border-color 150ms ease" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--yellow)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default Error;
