import { useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Login</h2>
      <input ref={inputRef} placeholder="Username" />
      <br />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}
