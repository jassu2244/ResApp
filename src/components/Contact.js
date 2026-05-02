import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    background: "var(--surface-2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--r-md)",
    color: "var(--text)",
    fontFamily: "var(--f-body)",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 150ms ease",
  };

  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        padding: "120px 32px 80px",
      }}
    >
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
        }}
      >
        <p
          className="anim-1"
          style={{
            fontFamily: "var(--f-body)",
            fontWeight: 600,
            fontSize: "0.82rem",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: "12px",
          }}
        >
          Get in touch
        </p>
        <h1
          className="anim-2"
          style={{
            fontFamily: "var(--f-display)",
            fontWeight: 900,
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            color: "var(--text)",
            lineHeight: 1.1,
            marginBottom: "8px",
          }}
        >
          Contact <span style={{ color: "var(--red)" }}>Us</span>
        </h1>
        <div
          style={{
            width: "44px",
            height: "3px",
            background: "var(--red)",
            borderRadius: "2px",
            marginBottom: "16px",
          }}
        />
        <p
          className="anim-3"
          style={{
            fontFamily: "var(--f-body)",
            fontSize: "1rem",
            color: "var(--text-muted)",
            lineHeight: 1.65,
            marginBottom: "40px",
          }}
        >
          Have a question, feedback, or a partnership inquiry? Drop us a message
          and we'll get back to you within 24 hours.
        </p>

        {/* Info cards */}
        <div
          className="anim-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          {[
            { icon: "📧", label: "Email", value: "hello@resapp.in" },
            { icon: "📞", label: "Phone", value: "+91 9999999999" },
            { icon: "📍", label: "City", value: "Ghaziabad, UP" },
          ].map((info) => (
            <div
              key={info.label}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-card)",
                borderRadius: "var(--r-md)",
                padding: "16px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "1.5rem",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                {info.icon}
              </span>
              <p
                style={{
                  fontFamily: "var(--f-body)",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  color: "var(--text)",
                  marginBottom: "2px",
                }}
              >
                {info.label}
              </p>
              <p
                style={{
                  fontFamily: "var(--f-body)",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                }}
              >
                {info.value}
              </p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-card)",
            borderRadius: "var(--r-lg)",
            padding: "32px",
          }}
        >
          {sent ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <span
                style={{
                  fontSize: "3rem",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                ✅
              </span>
              <p
                style={{
                  fontFamily: "var(--f-display)",
                  fontWeight: 800,
                  fontSize: "1.3rem",
                  color: "var(--green)",
                }}
              >
                Message Sent!
              </p>
              <p
                style={{
                  fontFamily: "var(--f-body)",
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  marginTop: "6px",
                }}
              >
                We'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      fontFamily: "var(--f-body)",
                      fontSize: "0.82rem",
                      color: "var(--text-muted)",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--yellow)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border)")
                    }
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontFamily: "var(--f-body)",
                      fontSize: "0.82rem",
                      color: "var(--text-muted)",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--yellow)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border)")
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    fontFamily: "var(--f-body)",
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Message *
                </label>
                <textarea
                  placeholder="Your message..."
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  required
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--yellow)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: "15px",
                  backgroundColor: "var(--red)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "var(--r-md)",
                  fontFamily: "var(--f-display)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "transform 150ms ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
