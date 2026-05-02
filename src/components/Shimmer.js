const ShimmerCard = () => (
  <div style={{
    background: "var(--surface)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--r-md)",
    overflow: "hidden",
  }}>
    <div className="shimmer-elem" style={{ width: "100%", height: "180px", borderRadius: 0 }} />
    <div style={{ padding: "16px" }}>
      <div className="shimmer-elem" style={{ height: "18px", width: "70%", marginBottom: "10px" }} />
      <div className="shimmer-elem" style={{ height: "13px", width: "90%", marginBottom: "8px" }} />
      <div className="shimmer-elem" style={{ height: "13px", width: "60%", marginBottom: "14px" }} />
      <div style={{
        display: "flex", justifyContent: "space-between",
        borderTop: "1px solid var(--border)", paddingTop: "10px",
      }}>
        <div className="shimmer-elem" style={{ height: "13px", width: "80px" }} />
        <div className="shimmer-elem" style={{ height: "13px", width: "60px" }} />
      </div>
    </div>
  </div>
);

const Shimmer = () => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  }}>
    {Array.from({ length: 8 }).map((_, i) => <ShimmerCard key={i} />)}
  </div>
);

export default Shimmer;
