import { useRouter } from "next/router";
import posts from "../../data/data.json";

export default function BlogPost({ post }) {
  const router = useRouter();

  // Kiểm tra nếu trang đang ở trạng thái fallback (đang được tạo ra)
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Trường hợp không tìm thấy bài viết (dù getStaticProps đã xử lý notFound)
  if (!post) return <div>Post not found</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <br />
      <button onClick={() => router.back()}>Back to Home</button>
    </div>
  );
}

// 1. getStaticPaths: Xác định danh sách các đường dẫn (paths) cần build tĩnh
export async function getStaticPaths() {
  // Tạo danh sách paths từ data.json, ví dụ: [{ params: { id: '1' } }, ...]
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    // Challenge: Đặt fallback: true để cho phép Next.js tạo trang mới
    // khi người dùng truy cập một id chưa được build trước đó.
    fallback: true,
  };
}

// 2. getStaticProps: Lấy dữ liệu cho từng trang dựa trên params.id
export async function getStaticProps({ params }) {
  // Tìm bài viết trong data.json khớp với id trên URL
  // Lưu ý: params.id là string, nên cần so sánh cẩn thận nếu id trong json là number
  const post = posts.find((p) => p.id === params.id);

  if (!post) {
    return {
      notFound: true, // Trả về trang 404 nếu không tìm thấy ID
    };
  }

  return {
    props: {
      post,
    },
    // (Tùy chọn) revalidate: 10, // Nếu muốn ISR (Incremental Static Regeneration)
  };
}
