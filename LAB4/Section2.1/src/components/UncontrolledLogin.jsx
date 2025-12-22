import { useRef } from "react";

export default function UncontrolledLogin() {
  // Tạo ref trỏ tới input
  const usernameRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // lấy giá trị từ input DOM
    const value = usernameRef.current.value;

    alert("Username: " + value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Uncontrolled Login</h2>

      <input type="text" placeholder="Nhập username..." ref={usernameRef} />

      <button type="submit">Login</button>
    </form>
  );
}
