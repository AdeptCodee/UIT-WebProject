// Accordion.jsx
import { useState } from "react";
import Panel from "./Panel";

function Accordion() {
  // Lưu trữ panel đang mở (0, 1 hoặc null)
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div>
      <h2>Accordion Example</h2>

      <Panel
        title="Bạn trai tôi tên gì?"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(activeIndex === 0 ? null : 0)}
      >
        Bạn trai bạn tên là Nguyên.
      </Panel>

      <Panel
        title="Bạn gái tôi tên gì?"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(activeIndex === 1 ? null : 1)}
      >
        Bạn gái bạn tên là Ngọc.
      </Panel>
    </div>
  );
}

export default Accordion;
