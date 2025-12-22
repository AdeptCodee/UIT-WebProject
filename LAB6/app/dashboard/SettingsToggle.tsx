"use client"; // Bắt buộc dòng này để dùng useState

import { useState } from "react";

export default function SettingsToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Style động dựa trên state
  const panelStyle = {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: isDarkMode ? "#333" : "#fff",
    color: isDarkMode ? "#fff" : "#000",
    transition: "all 0.3s ease",
  };

  return (
    <div style={panelStyle}>
      <h3>Settings Panel (Client Component)</h3>
      <p>
        Current Mode: <strong>{isDarkMode ? "Dark 🌙" : "Light ☀️"}</strong>
      </p>

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{ padding: "8px 16px", cursor: "pointer" }}
      >
        Toggle Mode
      </button>
    </div>
  );
}
