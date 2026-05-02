import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: { name: "Loading...", location: "...", avatar_url: "", bio: "" },
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const data = await fetch("https://api.github.com/users/jassu2244");
      const json = await data.json();
      this.setState({ userInfo: json, loading: false });
    } catch {
      this.setState({ loading: false });
    }
  }

  render() {
    const { name, login, avatar_url, bio, location, public_repos, followers } = this.state.userInfo;
    const { loading } = this.state;

    return (
      <div style={{
        display: "flex",
        gap: "24px",
        alignItems: "flex-start",
        background: "var(--surface)",
        border: "1px solid var(--border-card)",
        borderRadius: "var(--r-lg)",
        padding: "28px",
        maxWidth: "500px",
      }}>
        <div style={{
          width: "80px", height: "80px",
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
          background: "var(--surface-2)",
          border: "2px solid var(--border)",
        }}>
          {avatar_url ? (
            <img src={avatar_url} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>👤</div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          {loading ? (
            <>
              <div className="shimmer-elem" style={{ height: "20px", width: "60%", marginBottom: "8px" }} />
              <div className="shimmer-elem" style={{ height: "14px", width: "80%", marginBottom: "8px" }} />
              <div className="shimmer-elem" style={{ height: "14px", width: "50%", marginBottom: "16px" }} />
            </>
          ) : (
            <>
              <p style={{ fontFamily: "var(--f-display)", fontWeight: 800, fontSize: "1.15rem", color: "var(--text)", marginBottom: "4px" }}>
                {name || login || "jassu2244"}
              </p>
              {bio && (
                <p style={{ fontFamily: "var(--f-body)", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "10px", lineHeight: 1.5 }}>
                  {bio}
                </p>
              )}
              <p style={{ fontFamily: "var(--f-body)", fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "14px" }}>
                📍 {location || "India"} &nbsp;·&nbsp; @{login || "jassu2244"}
              </p>
              <div style={{ display: "flex", gap: "16px" }}>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: "0.82rem", color: "var(--green)" }}>
                  {public_repos ?? "—"} repos
                </span>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: "0.82rem", color: "var(--yellow)" }}>
                  {followers ?? "—"} followers
                </span>
              </div>
            </>
          )}

          <a
            href="https://github.com/jassu2244"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "16px",
              padding: "8px 20px",
              background: "var(--surface-2)",
              color: "var(--text)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-pill)",
              fontFamily: "var(--f-body)",
              fontWeight: 600,
              fontSize: "0.82rem",
              transition: "border-color 150ms ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--yellow)"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
          >
            View on GitHub →
          </a>
        </div>
      </div>
    );
  }
}

export default UserClass;
