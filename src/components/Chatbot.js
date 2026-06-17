import React, { useState, useRef, useEffect } from "react";

const CHATBOT_API_BASE =
  process.env.CHATBOT_API_URL || "http://localhost:5001";
const CHATBOT_API = `${CHATBOT_API_BASE.replace(/\/$/, "")}/chat`;

// Simple markdown-lite: bold (**text**) and line breaks
function renderText(text) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={i} style={{ margin: "2px 0", lineHeight: 1.55 }}>
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
      </p>
    );
  });
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hi! I'm ResBot — your food assistant! Ask me about food recommendations, how to order, delivery times, or anything food-related! 🍽️",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    // Add user message
    const updatedMessages = [...messages, { from: "user", text: trimmed }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setError(null);

    // Build history in Gemini format (last 10 messages, skip the first bot greeting)
    const history = updatedMessages
      .slice(1) // skip the initial bot greeting
      .slice(-10) // last 10 messages
      .map((m) => ({ role: m.from === "user" ? "user" : "model", text: m.text }));

    try {
      const res = await fetch(CHATBOT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    } catch (err) {
      setError("Could not reach the chatbot server. Please try again in a moment.");
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Oops! I'm having trouble connecting to ResBot right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ── Styles ──────────────────────────────────
  const s = {
    // Floating button
    fab: {
      position: "fixed",
      bottom: "24px",
      right: "24px",
      zIndex: 9999,
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #E8231A, #ff6b35)",
      boxShadow: open
        ? "0 0 0 4px rgba(232,35,26,0.25), 0 8px 32px rgba(232,35,26,0.45)"
        : "0 4px 20px rgba(232,35,26,0.4)",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.5rem",
      transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      transform: open ? "rotate(20deg) scale(1.05)" : "rotate(0deg) scale(1)",
    },
    // Chat window
    window: {
      position: "fixed",
      bottom: "90px",
      right: "24px",
      zIndex: 9998,
      width: "360px",
      maxWidth: "calc(100vw - 48px)",
      height: "480px",
      borderRadius: "20px",
      background: "var(--surface)",
      border: "1px solid var(--border-card)",
      boxShadow: "0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px var(--border)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      // Animation
      opacity: open ? 1 : 0,
      transform: open ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
      pointerEvents: open ? "all" : "none",
      transition: "opacity 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
      transformOrigin: "bottom right",
    },
    // Header
    header: {
      background: "linear-gradient(135deg, #E8231A 0%, #c91a12 100%)",
      padding: "14px 16px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexShrink: 0,
    },
    avatar: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.2rem",
      flexShrink: 0,
    },
    headerInfo: {
      flex: 1,
    },
    headerTitle: {
      fontFamily: "var(--f-display)",
      fontWeight: 700,
      fontSize: "0.92rem",
      color: "#fff",
    },
    headerSub: {
      fontSize: "0.7rem",
      color: "rgba(255,255,255,0.75)",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    onlineDot: {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: "#4ade80",
      display: "inline-block",
    },
    closeBtn: {
      background: "rgba(255,255,255,0.15)",
      border: "none",
      borderRadius: "8px",
      color: "#fff",
      width: "28px",
      height: "28px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1rem",
      flexShrink: 0,
      transition: "background 150ms ease",
    },
    // Messages area
    messages: {
      flex: 1,
      overflowY: "auto",
      padding: "14px 14px 8px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      scrollbarWidth: "thin",
      scrollbarColor: "var(--surface-2) transparent",
    },
    // Bubble styles
    botBubble: {
      alignSelf: "flex-start",
      background: "var(--surface-2)",
      border: "1px solid var(--border)",
      color: "var(--text)",
      borderRadius: "16px 16px 16px 4px",
      padding: "10px 14px",
      maxWidth: "88%",
      fontSize: "0.8rem",
      fontFamily: "var(--f-body)",
      lineHeight: 1.5,
    },
    userBubble: {
      alignSelf: "flex-end",
      background: "linear-gradient(135deg, #E8231A, #c91a12)",
      color: "#fff",
      borderRadius: "16px 16px 4px 16px",
      padding: "10px 14px",
      maxWidth: "80%",
      fontSize: "0.8rem",
      fontFamily: "var(--f-body)",
      lineHeight: 1.5,
    },
    // Typing indicator
    typing: {
      alignSelf: "flex-start",
      background: "var(--surface-2)",
      border: "1px solid var(--border)",
      borderRadius: "16px 16px 16px 4px",
      padding: "10px 14px",
      display: "flex",
      gap: "4px",
      alignItems: "center",
    },
    dot: (delay) => ({
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      background: "var(--text-muted)",
      animation: "chatDotBounce 1.2s infinite ease-in-out",
      animationDelay: delay,
    }),
    // Input area
    inputArea: {
      padding: "10px 12px",
      borderTop: "1px solid var(--border)",
      display: "flex",
      gap: "8px",
      alignItems: "center",
      background: "var(--surface)",
      flexShrink: 0,
    },
    inputField: {
      flex: 1,
      background: "var(--surface-2)",
      border: "1px solid var(--border)",
      borderRadius: "12px",
      color: "var(--text)",
      fontFamily: "var(--f-body)",
      fontSize: "0.8rem",
      padding: "9px 12px",
      outline: "none",
      resize: "none",
      lineHeight: 1.4,
    },
    sendBtn: {
      width: "36px",
      height: "36px",
      borderRadius: "10px",
      background: "linear-gradient(135deg, #E8231A, #c91a12)",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1rem",
      flexShrink: 0,
      transition: "opacity 150ms ease, transform 150ms ease",
      opacity: input.trim() ? 1 : 0.4,
    },
  };

  return (
    <>
      {/* Inject typing animation */}
      <style>{`
        @keyframes chatDotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        .resbot-input:focus {
          border-color: var(--red) !important;
          box-shadow: 0 0 0 2px rgba(232,35,26,0.15) !important;
        }
        .resbot-close:hover { background: rgba(255,255,255,0.25) !important; }
        .resbot-send:hover { transform: scale(1.08); }
        .resbot-send:active { transform: scale(0.94); }
      `}</style>

      {/* Floating Action Button */}
      <button
        id="chatbot-toggle-btn"
        style={s.fab}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chatbot" : "Open chatbot"}
        title={open ? "Close chat" : "Chat with ResBot"}
      >
        {open ? "✕" : "🤖"}
      </button>

      {/* Chat Window */}
      <div style={s.window} role="dialog" aria-label="ResBot Chat">

        {/* Header */}
        <div style={s.header}>
          <div style={s.avatar}>🤖</div>
          <div style={s.headerInfo}>
            <div style={s.headerTitle}>ResBot</div>
            <div style={s.headerSub}>
              <span style={s.onlineDot} />
              Food Assistant · Always Online
            </div>
          </div>
          <button
            className="resbot-close"
            style={s.closeBtn}
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div style={s.messages}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={msg.from === "bot" ? s.botBubble : s.userBubble}
            >
              {msg.from === "bot" ? renderText(msg.text) : msg.text}
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div style={s.typing}>
              <span style={s.dot("0s")} />
              <span style={s.dot("0.2s")} />
              <span style={s.dot("0.4s")} />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Error banner */}
        {error && (
          <div style={{
            padding: "6px 14px",
            background: "rgba(232,35,26,0.1)",
            borderTop: "1px solid rgba(232,35,26,0.2)",
            fontSize: "0.7rem",
            color: "#E8231A",
            fontFamily: "var(--f-body)",
          }}>
            {error}
          </div>
        )}

        {/* Input */}
        <div style={s.inputArea}>
          <textarea
            ref={inputRef}
            id="chatbot-input"
            className="resbot-input"
            style={s.inputField}
            rows={1}
            placeholder="Ask me anything about food..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            aria-label="Chat input"
          />
          <button
            id="chatbot-send-btn"
            className="resbot-send"
            style={s.sendBtn}
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            aria-label="Send message"
          >
            ➤
          </button>
        </div>

      </div>
    </>
  );
};

export default Chatbot;
