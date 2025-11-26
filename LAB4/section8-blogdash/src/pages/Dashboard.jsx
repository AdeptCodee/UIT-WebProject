import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function Dashboard() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div>
      <h2>Posts</h2>
      {data.map((post) => (
        <p key={post.id}>
          <Link to={`/dashboard/post/${post.id}`}>{post.title}</Link>
        </p>
      ))}
    </div>
  );
}
