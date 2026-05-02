const ShimmerMenu = () => (
  <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
    <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", paddingTop: "100px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 32px 40px", display: "flex", gap: "32px", alignItems: "center" }}>
        <div className="shimmer-elem" style={{ width: "130px", height: "130px", borderRadius: "var(--r-md)", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div className="shimmer-elem" style={{ height: "36px", width: "55%", marginBottom: "12px" }} />
          <div className="shimmer-elem" style={{ height: "16px", width: "75%", marginBottom: "16px" }} />
          <div style={{ display: "flex", gap: "10px" }}>
            {[70, 90, 110].map((w, i) => (
              <div key={i} className="shimmer-elem" style={{ height: "28px", width: `${w}px`, borderRadius: "var(--r-pill)" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 32px" }}>
      <div className="shimmer-elem" style={{ height: "28px", width: "100px", marginBottom: "24px" }} />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border-card)", borderRadius: "var(--r-md)", marginBottom: "10px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="shimmer-elem" style={{ height: "20px", width: `${150 + i * 25}px` }} />
          <div className="shimmer-elem" style={{ height: "16px", width: "16px", borderRadius: "4px" }} />
        </div>
      ))}
    </div>
  </div>
);

export default ShimmerMenu;
