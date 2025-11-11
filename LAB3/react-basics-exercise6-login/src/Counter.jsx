import React, { useState } from "react";

function Counter() {
  // Khai báo một biến state 'count' và hàm cập nhật 'setCount'
  const [count, setCount] = useState(0);

  // Hàm xử lý khi nhấn nút
  const handleIncrement = () => {
    setCount(count + 1); // cập nhật state
  };

  return (
    <div className="counter-container">
      <h2>HOT!!! Vừa rồi, chúng tôi phát hiện ra cặp đôi đáng iu nhất trên thế giới hú hú!</h2>
      <p>Lượt thích: {count}</p>
      <button onClick={handleIncrement}>Like</button>
    </div>
  );
}

export default Counter;
