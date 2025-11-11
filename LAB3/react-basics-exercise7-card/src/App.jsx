import React from "react";
import Card from "./Card";
import UserProfile from "./UserProfile";
import Accordion from "./Accordion";

function App() {
  const user1 = {
    name: "Nguyên Trương",
    email: "nguyen.truong@example.com",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-TcgnJCA-vBzr8hutHs03uFDlLm8-vmA5Ng&s",
    imageSize: 90,
  };

  const user2 = {
    name: "Ngọc Nguyễn",
    email: "ngoc.nguyen@example.com",
    avatarUrl:
      "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-51.jpg",
    imageSize: 70,
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <Card title="User 1 Profile">
        <UserProfile userData={user1} />
      </Card>

      <Card title="User 2 Profile">
        <UserProfile userData={user2} />
      </Card>
      <Accordion />
    </div>
  );
}

export default App;
