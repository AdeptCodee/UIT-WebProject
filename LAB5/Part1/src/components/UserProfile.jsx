import React, { useReducer, useEffect } from "react";

// 1. Định nghĩa trạng thái ban đầu (Initial State)
// Mình gom hết vào một object cho gọn theo đề bài
const initialState = {
  status: "idle", // Các trạng thái: 'idle' | 'loading' | 'resolved' | 'rejected'
  data: null,
  error: null,
};

// 2. Viết hàm reducer để xử lý logic
// Hàm này nhận vào state cũ và action, trả về state mới
function fetchReducer(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      // Khi bắt đầu fetch, status chuyển sang loading, xóa lỗi cũ
      return { ...state, status: "loading", error: null };

    case "FETCH_SUCCESS":
      // Challenge: Chỉ cho phép thành công nếu đang ở trạng thái loading
      // Để tránh trường hợp component bị unmount hoặc request bị hủy mà vẫn set state
      if (state.status === "loading") {
        return {
          ...state,
          status: "resolved",
          data: action.payload,
          error: null,
        };
      }
      return state; // Nếu không phải đang loading thì giữ nguyên, không làm gì cả

    case "FETCH_FAILURE":
      // Tương tự, chỉ báo lỗi nếu đang loading
      if (state.status === "loading") {
        return {
          ...state,
          status: "rejected",
          error: action.payload,
          data: null,
        };
      }
      return state;

    default:
      return state;
  }
}

// Dữ liệu 3 users
const users = [
  { id: 1, name: "Nguyen Truong", email: "nguyen.truong@example.com" },
  { id: 2, name: "Adept Truong", email: "adept.truong@example.com" },
  { id: 3, name: "23521065", email: "23521065@example.com" },
];

// Component chính
const UserProfile = () => {
  // Thay thế useState bằng useReducer
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const [selectedUserId, setSelectedUserId] = React.useState(1);

  useEffect(() => {
    // Hàm giả lập việc gọi API
    const fetchData = async () => {
      // Bắn action báo là "Tao bắt đầu lấy dữ liệu nha"
      dispatch({ type: "FETCH_INIT" });

      try {
        // Giả vờ đợi 1 giây
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Tìm user theo ID đã chọn
        const selectedUser = users.find((u) => u.id === selectedUserId);

        // Lấy xong thì bắn action Success kèm dữ liệu
        dispatch({ type: "FETCH_SUCCESS", payload: selectedUser });
      } catch (err) {
        // Lỗi thì bắn action Failure
        dispatch({ type: "FETCH_FAILURE", payload: err.message });
      }
    };

    fetchData();
  }, [selectedUserId]);

  // Render ra giao diện dựa trên state.status
  if (state.status === "loading") return <div>Đang tải dữ liệu...</div>;
  if (state.status === "rejected")
    return <div>Toang rồi ông giáo ạ: {state.error}</div>;
  if (state.status === "resolved" && state.data) {
    return (
      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          backgroundColor: "#fff",
        }}
      >
        <h2 style={{ color: "#333", marginTop: 0 }}>
          Bài 1.1: User Profile (useReducer - Finite State Machine)
        </h2>

        {/* Dropdown chọn User */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="userSelect"
            style={{ color: "#555", fontWeight: "600" }}
          >
            Chọn User:{" "}
          </label>
          <select
            id="userSelect"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(Number(e.target.value))}
            style={{
              padding: "8px 10px",
              marginLeft: "10px",
              color: "#333",
              backgroundColor: "#fff",
              borderRadius: "4px",
              border: "2px solid #007bff",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
                style={{ color: "#333", backgroundColor: "#fff" }}
              >
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Hiển thị thông tin User */}
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            color: "#333",
          }}
        >
          <h3 style={{ color: "#222", marginTop: "0", marginBottom: "10px" }}>
            Thông tin User
          </h3>
          <p style={{ color: "#444", margin: "8px 0" }}>
            <strong>Tên:</strong> {state.data.name}
          </p>
          <p style={{ color: "#444", margin: "8px 0" }}>
            <strong>Email:</strong> {state.data.email}
          </p>
        </div>
      </div>
    );
  }

  return <div>Chưa có dữ liệu (Idle)</div>;
};

export default UserProfile;
