import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { userId } = useParams();

  return <h1>Profile for User: {userId}</h1>;
}
