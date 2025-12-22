import React, { useState } from "react";

function Login() {
  // Một state object lưu cả username và password
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Hàm chung để cập nhật từng field dựa vào thuộc tính name
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Xử lý submit form
  function handleSubmit(event) {
    event.preventDefault(); // ngăn reload trang
    console.log("Submitted formData:", formData);
    alert(`Username: ${formData.username}\nPassword: ${formData.password}`);
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360 }}>
      <h2>Login Form (Exercise 6)</h2>

      <label style={{ display: "block", marginBottom: 8 }}>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
          style={{ display: "block", width: "100%", padding: 6, marginTop: 4 }}
        />
      </label>

      <label style={{ display: "block", marginBottom: 8 }}>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          style={{ display: "block", width: "100%", padding: 6, marginTop: 4 }}
        />
      </label>

      <button type="submit" style={{ padding: "8px 12px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>Submit
      </button>

      <div style={{ marginTop: 12 }}>
        <p>-----Console-----</p>
        <p>Entered Username: {formData.username}</p>
        <p>Entered Password: {formData.password}</p>
      </div>
    </form>
  );
}

export default Login;
