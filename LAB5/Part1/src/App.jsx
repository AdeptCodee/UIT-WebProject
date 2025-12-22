// src/App.jsx
import React, { Suspense, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Import Part 1 & 2
import UserProfile from "./components/UserProfile";
import ShoppingCart from "./components/ShoppingCart";
import HeavyList from "./components/HeavyList";

// Import Part 3 (Đảm bảo bạn đã tạo 2 file này ở bước trước)
import Tabs from "./components/CompoundTabs";
import Modal from "./components/PortalModal";

// Lazy load cho Part 2.3
const AdminPanel = React.lazy(() => import("./components/AdminPanel"));

// --- COMPONENT RIÊNG CHO PART 3 (Để code App gọn hơn) ---
const Part3Demo = () => {
  // State quản lý đóng mở Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hàm test sự kiện nổi bọt (Event Bubbling)
  const handleParentClick = () => {
    alert(
      "Challenge Passed: Sự kiện Click từ Modal (Portal) đã nổi bọt về div cha!"
    );
  };

  return (
    <div>
      <h2>Part 3.1: Compound Component (Tabs)</h2>
      <Tabs defaultIndex={0}>
        <Tabs.List>
          <Tabs.Tab index={0}>React</Tabs.Tab>
          <Tabs.Tab index={1}>Redux</Tabs.Tab>
          <Tabs.Tab index={2}>Vue</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel index={0}>React là thư viện UI.</Tabs.Panel>
        <Tabs.Panel index={1}>Redux quản lý state.</Tabs.Panel>
        <Tabs.Panel index={2}>Vue rất dễ học.</Tabs.Panel>
      </Tabs>

      <hr />

      <h2>Part 3.2: React Portal & Modal</h2>
      {/* Div cha có overflow hidden để test Portal thoát ra ngoài */}
      <div
        onClick={handleParentClick} // Bắt sự kiện click tại đây
        style={{
          height: "100px",
          overflow: "hidden", // Cố tình làm hẹp để che khuất nội dung
          border: "2px dashed red",
          padding: "20px",
          background: "#ffebee",
          cursor: "pointer",
        }}
      >
        <p>Div cha chật hẹp (Click vào vùng đỏ này cũng hiện Alert)</p>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Ngăn click nút mở modal kích hoạt alert ngay lập tức
            setIsModalOpen(true);
          }}
        >
          Mở Modal (Trapdoor)
        </button>

        {/* Modal dùng Portal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h3>Modal này dùng Portal!</h3>
          <p>
            Nó render ở document.body chứ không phải trong cái div đỏ chật hẹp
            kia.
          </p>
          <button onClick={() => console.log("Click nút trong modal")}>
            Click thử nút này (Sẽ kích hoạt Alert của div đỏ)
          </button>
        </Modal>
      </div>
    </div>
  );
};

// --- APP CHÍNH ---
function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "20px",
          paddingBottom: "100px",
        }}
      >
        <h1>Lab 5: React Advanced</h1>

        {/* Menu điều hướng */}
        <nav
          style={{
            marginBottom: 20,
            paddingBottom: 10,
            borderBottom: "1px solid #ccc",
          }}
        >
          <Link to="/" style={{ marginRight: 15, fontWeight: "bold" }}>
            Part 1 (State)
          </Link>
          <Link to="/part2" style={{ marginRight: 15, fontWeight: "bold" }}>
            Part 2 (Performance)
          </Link>
          <Link to="/admin" style={{ marginRight: 15, fontWeight: "bold" }}>
            Part 2 (Lazy Admin)
          </Link>
          <Link to="/part3" style={{ fontWeight: "bold", color: "green" }}>
            Part 3 (Patterns)
          </Link>
        </nav>

        {/* Định nghĩa các trang */}
        <Routes>
          {/* Part 1 */}
          <Route
            path="/"
            element={
              <div>
                <UserProfile />
                <hr />
                <ShoppingCart />
              </div>
            }
          />

          {/* Part 2.1 & 2.2 */}
          <Route path="/part2" element={<HeavyList />} />

          {/* Part 2.3 (Lazy Load) */}
          <Route
            path="/admin"
            element={
              <Suspense
                fallback={
                  <div style={{ color: "blue" }}>Đang tải Admin...</div>
                }
              >
                <AdminPanel />
              </Suspense>
            }
          />

          {/* Part 3 */}
          <Route path="/part3" element={<Part3Demo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
