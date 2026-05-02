const ShimmerCard = () => (
  <div style={{
    backgroundColor: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
  }}>
    {/* Image placeholder */}
    <div
      className="shimmer-block"
      style={{ width: "100%", aspectRatio: "16/9", borderRadius: 0 }}
    />
    {/* Content placeholder */}
    <div style={{ padding: "14px 16px 16px" }}>
      <div className="shimmer-block" style={{ height: "18px", width: "70%", marginBottom: "10px" }} />
      <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
        <div className="shimmer-block" style={{ height: "22px", width: "60px", borderRadius: "var(--radius-pill)" }} />
        <div className="shimmer-block" style={{ height: "22px", width: "70px", borderRadius: "var(--radius-pill)" }} />
        <div className="shimmer-block" style={{ height: "22px", width: "50px", borderRadius: "var(--radius-pill)" }} />
      </div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        borderTop: "1px solid var(--color-border)",
        paddingTop: "10px",
      }}>
        <div className="shimmer-block" style={{ height: "14px", width: "80px" }} />
        <div className="shimmer-block" style={{ height: "14px", width: "60px" }} />
      </div>
    </div>
  </div>
);

const Shimmer = () => {
  return (
    <div style={{
      backgroundColor: "var(--color-bg)",
      minHeight: "100vh",
      padding: "var(--spacing-xl) var(--spacing-lg)",
    }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Search bar placeholder */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "var(--spacing-xl)" }}>
          <div className="shimmer-block" style={{ height: "48px", flex: 1, maxWidth: "400px", borderRadius: "var(--radius-md)" }} />
          <div className="shimmer-block" style={{ height: "48px", width: "90px", borderRadius: "var(--radius-md)" }} />
          <div className="shimmer-block" style={{ height: "48px", width: "110px", borderRadius: "var(--radius-md)" }} />
        </div>
        {/* Title placeholder */}
        <div className="shimmer-block" style={{ height: "32px", width: "280px", marginBottom: "8px" }} />
        <div className="shimmer-block" style={{ height: "14px", width: "120px", marginBottom: "var(--spacing-lg)" }} />
        {/* Card grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "var(--spacing-lg)",
        }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
