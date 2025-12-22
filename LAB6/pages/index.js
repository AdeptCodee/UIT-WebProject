import Link from "next/link";
// Import dữ liệu trực tiếp vì đây là file nội bộ,
// hoặc bạn có thể dùng getStaticProps để fetch nếu muốn giả lập production chuẩn chỉnh.
import posts from "../data/data.json";

export default function Home() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Blog List (Exercise 1)</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "10px" }}>
            <Link
              href={`/blog/${post.id}`}
              style={{ textDecoration: "none", color: "blue" }}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
