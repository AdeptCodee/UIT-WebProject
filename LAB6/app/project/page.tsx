import React from "react";
import ChatWidget from "@/components/ChatWidget";
import { documentation } from "@/lib/docs";

export default function ProjectPage() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}
      >
        Next.js Documentation
      </h1>
      <p style={{ color: "#666", marginBottom: "40px" }}>
        Static Generated Page (SEO Friendly) tích hợp AI Chatbot.
        <br />
        Sinh viên: <strong>Nguyên - 23521065</strong>
      </p>

      {/* Static Content (RAG Source) */}
      <div style={{ display: "grid", gap: "20px" }}>
        {documentation.map((doc) => (
          <div
            key={doc.id}
            style={{
              padding: "20px",
              border: "1px solid #eaeaea",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0" }}>Doc Segment #{doc.id}</h3>
            <p style={{ lineHeight: "1.6" }}>{doc.content}</p>
          </div>
        ))}
      </div>

      {/* Dynamic AI Widget */}
      <ChatWidget />
    </div>
  );
}
