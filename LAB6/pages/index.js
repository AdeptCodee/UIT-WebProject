import Link from "next/link";
import { useState } from "react";
import posts from "../data/data.json";

export default function Home() {
  const [apiResult, setApiResult] = useState(null);

  // Hàm gọi API để test Exercise 3
  const callSecretApi = async (includeKey) => {
    const headers = {};
    if (includeKey) {
      // Key này phải khớp với trong .env.local
      headers["x-api-key"] = "nguyen-23521065-secret";
    }

    try {
      const res = await fetch("/api/secret", { headers });
      const data = await res.json();
      setApiResult({
        status: res.status,
        data: data,
      });
    } catch (error) {
      setApiResult({ status: "Error", data: { message: "Failed to fetch" } });
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          color: "#0070f3",
          borderBottom: "2px solid #eaeaea",
          paddingBottom: "10px",
        }}
      >
        Báo cáo LAB 6 - Nguyên - 23521065
      </h1>

      {/* --- EXERCISE 1 --- */}
      <section style={{ marginBottom: "40px" }}>
        <h2>📂 Exercise 1: Dynamic Blog (Pages Router)</h2>
        <ul
          style={{
            background: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: "10px" }}>
              <Link
                href={`/blog/${post.id}`}
                style={{
                  textDecoration: "none",
                  color: "#0070f3",
                  fontWeight: "bold",
                }}
              >
                📄 {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* --- EXERCISE 2 --- */}
      <section style={{ marginBottom: "40px" }}>
        <h2>🚀 Exercise 2: Dashboard (App Router)</h2>
        <Link href="/dashboard">
          <button
            style={{
              padding: "10px 20px",
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Truy cập Dashboard Demo →
          </button>
        </Link>
      </section>

      <hr
        style={{
          border: "0",
          borderTop: "1px solid #eaeaea",
          margin: "40px 0",
        }}
      />

      {/* --- EXERCISE 3 (MỚI THÊM) --- */}
      <section>
        <h2>🔒 Exercise 3: API Middleware Security</h2>
        <p>
          Thử truy cập vào <code>/api/secret</code> với các trường hợp:
        </p>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {/* Nút Test Sai */}
          <button
            onClick={() => callSecretApi(false)}
            style={{
              padding: "10px",
              background: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            1. Gọi API (Không có Key)
          </button>

          {/* Nút Test Đúng */}
          <button
            onClick={() => callSecretApi(true)}
            style={{
              padding: "10px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            2. Gọi API (Có Key Đúng)
          </button>
        </div>

        {/* Khu vực hiển thị kết quả */}
        {apiResult && (
          <div
            style={{
              padding: "15px",
              borderRadius: "5px",
              background: apiResult.status === 200 ? "#d4edda" : "#f8d7da",
              color: apiResult.status === 200 ? "#155724" : "#721c24",
              border: `1px solid ${
                apiResult.status === 200 ? "#c3e6cb" : "#f5c6cb"
              }`,
            }}
          >
            <p>
              <strong>Status Code:</strong> {apiResult.status}
            </p>
            <p>
              <strong>Response:</strong>
            </p>
            <pre>{JSON.stringify(apiResult.data, null, 2)}</pre>
          </div>
        )}
      </section>
    </div>
  );
}
