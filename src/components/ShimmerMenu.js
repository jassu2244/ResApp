const ShimmerMenu = () => {
  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      {/* Header shimmer */}
      <div style={{
        backgroundColor: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
        padding: "var(--spacing-xl) var(--spacing-lg)",
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          gap: "var(--spacing-xl)",
          alignItems: "center",
        }}>
          <div className="shimmer-block" style={{
            width: "140px",
            height: "140px",
            borderRadius: "var(--radius-md)",
            flexShrink: 0,
          }} />
          <div style={{ flex: 1 }}>
            <div className="shimmer-block" style={{ height: "36px", width: "60%", marginBottom: "12px" }} />
            <div className="shimmer-block" style={{ height: "16px", width: "80%", marginBottom: "16px" }} />
            <div style={{ display: "flex", gap: "8px" }}>
              <div className="shimmer-block" style={{ height: "28px", width: "70px", borderRadius: "var(--radius-pill)" }} />
              <div className="shimmer-block" style={{ height: "28px", width: "90px", borderRadius: "var(--radius-pill)" }} />
              <div className="shimmer-block" style={{ height: "28px", width: "110px", borderRadius: "var(--radius-pill)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Categories shimmer */}
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "var(--spacing-xl) var(--spacing-lg)",
      }}>
        <div className="shimmer-block" style={{ height: "32px", width: "120px", marginBottom: "24px" }} />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            marginBottom: "8px",
            padding: "var(--spacing-md) var(--spacing-lg)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <div className="shimmer-block" style={{ height: "20px", width: `${160 + i * 30}px` }} />
            <div className="shimmer-block" style={{ height: "18px", width: "18px", borderRadius: "4px" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerMenu;
