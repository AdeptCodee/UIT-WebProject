/** @jsx h */
/** @jsxFrag Fragment */
import "./styles.css";
import { h, Fragment, mount, useState } from "./jsx-runtime";

function App() {
  const [getCount, setCount] = useState(0);

  const handleClick = () => {
    const newCount = getCount() + 1;
    setCount(newCount);
    console.log("State updated to:", newCount);
    alert(
      "Đã tăng count! (Lưu ý: Giao diện sẽ không tự cập nhật ở bài này, hãy xem Console log)"
    );
  };

  return (
    <div
      className="app-container"
      style={{ padding: "20px", backgroundColor: "#f0f0f0" }}
    >
      <h1>Chào mừng đến với Lab 2!</h1>
      <p>Đây là demo JSX không cần React.</p>
      <button
        onClick={handleClick}
        style={{ padding: "10px 15px", fontSize: "16px", cursor: "pointer" }}
      >
        Nhấn vào tôi!
      </button>
      <p>Giá trị Count hiện tại (trong state): {getCount()}</p>
      <p style={{ fontStyle: "italic", color: "#555" }}>
        Lưu ý: Ở bài tập này, giá trị trên màn hình sẽ không tự động cập nhật
        khi state thay đổi.
      </p>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  mount(<App />, rootElement);
}
