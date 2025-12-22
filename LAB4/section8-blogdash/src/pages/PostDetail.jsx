import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function PostDetail() {
  const { postId } = useParams();

  const { data, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>Error loading post</p>;

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </div>
  );
}
