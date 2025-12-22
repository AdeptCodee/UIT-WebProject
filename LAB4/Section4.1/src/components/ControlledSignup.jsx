import { useState } from "react";

function ControlledSignup() {
  // 1. Tạo state object
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 3. Hàm xử lý thay đổi input
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Cập nhật đúng key dựa trên name
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 4. Hàm submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default ControlledSignup;
