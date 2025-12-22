import React, { useState } from "react";
// QUAN TRỌNG: Import từ file api.js
import { loginAPI } from "../api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Gọi hàm từ file api.js
      await loginAPI(email, password);
      setMessage("Welcome back!");
    } catch (error) {
      setMessage("Login failed");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ border: "1px solid #ccc", padding: 20, margin: 20 }}
    >
      <h3>Login Form (Testing Target)</h3>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Submit"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default LoginForm;
