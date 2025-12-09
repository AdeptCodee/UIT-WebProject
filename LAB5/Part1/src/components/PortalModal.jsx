import React from "react";
import ReactDOM from "react-dom";

// Style cho cái nền mờ (Overlay)
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  zIndex: 1000, // Đè lên mọi thứ
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

// Style cho cái hộp Modal
const modalStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  minWidth: "300px",
  zIndex: 1001,
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Nhiệm vụ 1 & 2: Dùng createPortal để đẩy nội dung ra document.body
  return ReactDOM.createPortal(
    <div style={overlayStyle} onClick={onClose}>
      {/* stopPropagation để click vào hộp modal không bị đóng modal */}
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            float: "right",
            background: "red",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          X
        </button>
        <div style={{ marginTop: "20px" }}>{children}</div>
      </div>
    </div>,
    document.body // Đích đến là body của trang web
  );
};

export default Modal;
