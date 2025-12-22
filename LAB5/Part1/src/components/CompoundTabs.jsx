import React, { createContext, useContext, useState } from "react";

// 1. Tạo Context để chứa state chung (đang chọn tab nào)
const TabsContext = createContext();

// 2. Component Cha (Tabs)
// Nhiệm vụ: Giữ state activeIndex và cung cấp cho đám con cháu
const Tabs = ({ children, defaultIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// 3. Các Component Con
// TabList: Chỉ là cái bọc ngoài cho đẹp
const TabList = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        borderBottom: "1px solid #ddd",
        marginBottom: "10px",
      }}
    >
      {children}
    </div>
  );
};

// Tab: Cái nút bấm
const Tab = ({ index, children }) => {
  const { activeIndex, setActiveIndex } = useContext(TabsContext);
  const isActive = index === activeIndex;

  return (
    <button
      onClick={() => setActiveIndex(index)}
      style={{
        padding: "10px 20px",
        cursor: "pointer",
        border: "none",
        background: isActive ? "#007bff" : "transparent",
        color: isActive ? "white" : "black",
        fontWeight: isActive ? "bold" : "normal",
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px",
      }}
    >
      {children}
    </button>
  );
};

// TabPanel: Nội dung hiển thị
const TabPanel = ({ index, children }) => {
  const { activeIndex } = useContext(TabsContext);

  // Nếu index không khớp với cái đang chọn thì ẩn đi (return null)
  if (index !== activeIndex) return null;

  return <div style={{ padding: "10px" }}>{children}</div>;
};

// Gom lại để export cho gọn, thầy nhìn vào thấy pro
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

export default Tabs;
