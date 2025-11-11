// src/App.jsx
import React from "react";
import UserProfile from "./UserProfile";
import "./App.css"; // nếu bạn dùng CSS
import Counter from "./Counter";

function App() {
  const user1 = {
    name: "Ngoc Nguyen",
    email: "ngoc.nguyen@example.com",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-TcgnJCA-vBzr8hutHs03uFDlLm8-vmA5Ng&s",
    imageSize: 90,
  };

  const user2 = {
    name: "Nguyen Truong",
    email: "nguyen.truong@example.com",
    avatarUrl:
      "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-51.jpg",
    imageSize: 70,
  };

  return (
    <div>
      {/* user1 dùng theme 'light' */}
      <UserProfile userData={user1} />

      {/* user2 dùng theme 'dark' */}
      <UserProfile userData={user2} theme="dark" />

      {/* bộ đếm */}
      <Counter />
    </div>
  );
}

export default App;
