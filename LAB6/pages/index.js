import Link from "next/link";
import posts from "../data/data.json";

export default function Home() {
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

      <section style={{ marginBottom: "40px" }}>
        <h2> Exercise 1: Dynamic Blog (Pages Router)</h2>
        <ul
          style={{
            background: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          {posts.map((post) => (
            <li
              key={post.id}
              style={{ marginBottom: "10px", listStyle: "none" }}
            >
              <span style={{ marginRight: "10px" }}>📄</span>
              <Link
                href={`/blog/${post.id}`}
                style={{
                  textDecoration: "none",
                  color: "#0070f3",
                  fontWeight: "bold",
                }}
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <hr
        style={{
          border: "0",
          borderTop: "1px solid #eaeaea",
          margin: "40px 0",
        }}
      />

      <section>
        <h2> Exercise 2: Dashboard (App Router)</h2>
        <div style={{ marginTop: "20px" }}>
          <Link href="/dashboard">
            <button
              style={{
                padding: "15px 30px",
                fontSize: "16px",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Truy cập Dashboard Demo →
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
