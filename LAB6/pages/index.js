import Link from "next/link";
import Image from "next/image"; // Import component Image
import { useState } from "react";
import posts from "../data/data.json";

export default function Home() {
  const [apiResult, setApiResult] = useState(null);
  const [showOptimizedImage, setShowOptimizedImage] = useState(true); // State để switch giữa img thường và Next Image

  // Hàm gọi API Ex3
  const callSecretApi = async (includeKey) => {
    const headers = {};
    if (includeKey) headers["x-api-key"] = "nguyen-23521065-secret";
    try {
      const res = await fetch("/api/secret", { headers });
      const data = await res.json();
      setApiResult({ status: res.status, data });
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
        <h2>Exercise 1: Dynamic Blog</h2>
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
                style={{ textDecoration: "none", color: "#0070f3" }}
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* --- EXERCISE 2 --- */}
      <section style={{ marginBottom: "40px" }}>
        <h2>Exercise 2: Dashboard</h2>
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
            Go to Dashboard
          </button>
        </Link>
      </section>

      {/* --- EXERCISE 3 --- */}
      <section style={{ marginBottom: "40px" }}>
        <h2>Exercise 3: API Security</h2>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <button
            onClick={() => callSecretApi(false)}
            style={{
              padding: "10px",
              background: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Test No Key
          </button>
          <button
            onClick={() => callSecretApi(true)}
            style={{
              padding: "10px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Test Valid Key
          </button>
        </div>
        {apiResult && (
          <pre style={{ background: "#eee", padding: "10px" }}>
            {JSON.stringify(apiResult, null, 2)}
          </pre>
        )}
      </section>

      <hr
        style={{
          border: "0",
          borderTop: "1px solid #eaeaea",
          margin: "40px 0",
        }}
      />

      {/* --- EXERCISE 4 (MỚI) --- */}
      <section>
        <h2>Exercise 4: Image & Font Optimization</h2>
        <p>So sánh Core Web Vitals (CLS):</p>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "20px" }}>
            <input
              type="radio"
              name="imgType"
              checked={!showOptimizedImage}
              onChange={() => setShowOptimizedImage(false)}
            />
            Standard HTML Img Tag (High CLS)
          </label>
          <label>
            <input
              type="radio"
              name="imgType"
              checked={showOptimizedImage}
              onChange={() => setShowOptimizedImage(true)}
            />
            Next.js Image Component (No CLS)
          </label>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            minHeight: "400px",
          }}
        >
          {/* Văn bản giả để thấy nội dung bị đẩy xuống khi ảnh load chậm */}
          <p>
            Nội dung phía trên ảnh. Hãy refresh trang (Ctrl + F5) để quan sát
            hiện tượng Layout Shift.
          </p>

          {showOptimizedImage ? (
            // OPTIMIZED: Next Image
            <Image
              src="/large-image.jpg"
              alt="Optimized Example"
              width={800}
              height={400}
              style={{ objectFit: "cover", borderRadius: "8px" }}
              priority // Load ngay lập tức
            />
          ) : (
            // UNOPTIMIZED: Standard Img
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/large-image.jpg"
              alt="Unoptimized Example"
              style={{ width: "100%", maxWidth: "800px", height: "auto" }}
            />
          )}

          <p>Nội dung phía dưới ảnh.</p>
        </div>
      </section>
    </div>
  );
}
