import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
      {/* 1. Static Sidebar Navigation */}
      <aside
        style={{
          width: "200px",
          background: "#f4f4f4",
          padding: "20px",
          borderRight: "1px solid #ddd",
        }}
      >
        <h3>Dashboard</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "10px" }}>
            <a href="/dashboard">Home</a>
          </li>
          <li style={{ marginBottom: "10px" }}>Analytics</li>
          <li style={{ marginBottom: "10px" }}>Settings</li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "20px" }}>{children}</main>
    </div>
  );
}
