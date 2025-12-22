import { useEffect, useState } from "react";

function PostFetcher() {
  const [data, setData] = useState(null);     // 1. data
  const [loading, setLoading] = useState(true); // 2. loading
  const [error, setError] = useState(null);     // 3. error

  useEffect(() => {
    async function fetchPost() {
      setLoading(true); // Khi re-fetch thì vẫn đúng quy trình

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1"
        );

        if (!response.ok) {
          throw new Error("HTTP Error: " + response.status);
        }

        const json = await response.json();

        setData(json);    // Lưu data
        setError(null);   // Reset lại error
      } catch (err) {
        setError(err);    // Lưu lỗi
        setData(null);    // Không có data
      } finally {
        setLoading(false); // Tắt loading
      }
    }

    fetchPost();
  }, []); // chạy 1 lần khi mount

  // 4. Conditional rendering
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error !== null) {
    return <div>Error: {error.message}</div>;
  }

  if (data !== null) {
    return <h1>{data.title}</h1>;
  }

  return null;
}

export default PostFetcher;
