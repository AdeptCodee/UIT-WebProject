"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";

export default function ChatWidget() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat", // Trỏ tới API ta vừa tạo
    });
  const [isOpen, setIsOpen] = useState(false);
  // Map of messageId -> currently displayed text (for typing animation)
  const [displayed, setDisplayed] = useState<Record<string, string>>({});
  const timers = useRef<Record<string, number>>({});

  useEffect(() => {
    // For each assistant message, animate newly added characters
    messages.forEach((m) => {
      if (m.role !== "assistant") return;
      const target = String(m.content || "");
      const current = displayed[m.id] || "";

      // If already matching or empty remainder, set directly
      if (current === target) return;

      // If target starts with current, animate the remainder
      if (target.startsWith(current)) {
        // clear any existing timer for this message
        if (timers.current[m.id]) {
          clearInterval(timers.current[m.id]);
        }

        const remaining = target.slice(current.length);
        let index = 0;

        // show one character at a time
        timers.current[m.id] = window.setInterval(() => {
          index += 1;
          setDisplayed((prev) => ({
            ...prev,
            [m.id]: current + remaining.slice(0, index),
          }));

          if (index >= remaining.length) {
            clearInterval(timers.current[m.id]);
            delete timers.current[m.id];
          }
        }, 20); // 20ms per char for smooth typing
      } else {
        // if content changed drastically (e.g., edited), replace immediately
        setDisplayed((prev) => ({ ...prev, [m.id]: target }));
      }
    });

    // cleanup on unmount
    return () => {
      Object.values(timers.current).forEach((t) => clearInterval(t));
      timers.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        fontFamily: "Arial",
      }}
    >
      {/* Nút bật tắt Chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: "#0070f3",
            color: "white",
            padding: "15px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            fontSize: "24px",
          }}
        >
          🤖
        </button>
      )}

      {/* Cửa sổ Chat */}
      {isOpen && (
        <div
          style={{
            width: "350px",
            height: "500px",
            background: "white",
            border: "1px solid #eaeaea",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "15px",
              borderBottom: "1px solid #eaeaea",
              display: "flex",
              justifyContent: "space-between",
              background: "#f9f9f9",
              borderRadius: "12px 12px 0 0",
            }}
          >
            <strong>AI Knowledge Base</strong>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              padding: "15px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {messages.length === 0 && (
              <p
                style={{
                  color: "#888",
                  textAlign: "center",
                  marginTop: "50px",
                }}
              >
                Hãy hỏi gì đó về Next.js hoặc Nguyên...
              </p>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  background: m.role === "user" ? "#0070f3" : "#f0f0f0",
                  color: m.role === "user" ? "white" : "black",
                  padding: "10px 15px",
                  borderRadius: "15px",
                  maxWidth: "80%",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "0.8em",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  {m.role === "user" ? "Bạn" : "AI Bot"}
                </span>
                {m.role === "assistant"
                  ? displayed[m.id] ?? m.content
                  : m.content}
              </div>
            ))}
            {isLoading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  color: "#888",
                  fontSize: "12px",
                }}
              >
                AI đang nhập...
              </div>
            )}
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: "15px",
              borderTop: "1px solid #eaeaea",
              display: "flex",
            }}
          >
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Hỏi về Next.js..."
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "20px",
                border: "1px solid #ddd",
                marginRight: "10px",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              style={{
                background: "#0070f3",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Gửi
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
