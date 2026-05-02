import React from "react";
import UserClass from "./UserClass";

class About extends React.Component {
  render() {
    return (
      <div style={{ background: "var(--bg)", minHeight: "100vh", padding: "120px 32px 80px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>

          <p className="anim-1" style={{ fontFamily: "var(--f-body)", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "12px" }}>
            Who we are
          </p>
          <h1 className="anim-2" style={{ fontFamily: "var(--f-display)", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text)", lineHeight: 1.1, marginBottom: "8px" }}>
            About <span style={{ color: "var(--yellow)" }}>ResApp</span>
          </h1>
          <div style={{ width: "44px", height: "3px", background: "var(--red)", borderRadius: "2px", marginBottom: "28px" }} />

          <p className="anim-3" style={{ fontFamily: "var(--f-body)", fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: 1.75, maxWidth: "600px", marginBottom: "48px" }}>
            ResApp is a modern food delivery platform built for speed and simplicity.
            Discover the best local restaurants, browse menus, and order your favorite
            meals — all in one place. Built with React, Redux, and a whole lot of love.
          </p>

          <div className="anim-4" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "56px" }}>
            {[
              { value: "2,000+", label: "Happy Customers", icon: "😊" },
              { value: "150+", label: "Partner Restaurants", icon: "🍽️" },
              { value: "30 min", label: "Avg Delivery Time", icon: "⚡" },
            ].map((stat) => (
              <div key={stat.label} style={{ background: "var(--surface)", border: "1px solid var(--border-card)", borderRadius: "var(--r-md)", padding: "24px", textAlign: "center" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "8px" }}>{stat.icon}</span>
                <p style={{ fontFamily: "var(--f-display)", fontWeight: 800, fontSize: "1.8rem", color: "var(--yellow)", marginBottom: "4px" }}>
                  {stat.value}
                </p>
                <p style={{ fontFamily: "var(--f-body)", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: "var(--f-display)", fontWeight: 800, fontSize: "1.4rem", color: "var(--text)", marginBottom: "20px" }}>
            Meet the Developer
          </h2>
          <UserClass name="Jasmeet" location="Ghaziabad" />
        </div>
      </div>
    );
  }
}

export default About;
