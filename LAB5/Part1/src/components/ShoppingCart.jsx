// src/components/ShoppingCart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  cartActions,
  selectCartTax,
  selectTotalAmount,
} from "../store/cartSlice";

// Dữ liệu sản phẩm
const products = [
  { id: 1, name: "Laptop Gaming", price: 1000 },
  { id: 2, name: "iPhone 15", price: 800 },
  { id: 3, name: "AirPods Pro", price: 250 },
];

const ShoppingCart = () => {
  const dispatch = useDispatch();
  // Lấy dữ liệu từ Store ra
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector(selectTotalAmount);
  const tax = useSelector(selectCartTax); // Cái Challenge thầy yêu cầu nè

  // Hàm thêm sản phẩm
  const handleAddItem = (product) => {
    dispatch(cartActions.addItem(product));
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        marginTop: "20px",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ color: "#333", marginTop: 0 }}>
        Bài 1.2: Shopping Cart (Redux Toolkit)
      </h2>

      {/* Nút thêm sản phẩm */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#333", marginBottom: "12px" }}>Thêm Sản Phẩm:</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => handleAddItem(product)}
              style={{
                padding: "10px 15px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              + {product.name} (${product.price})
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => dispatch(cartActions.clearCart())}
        style={{
          padding: "8px 15px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Xóa hết Giỏ Hàng
      </button>

      {/* Hiển thị giỏ hàng */}
      <h3 style={{ color: "#333" }}>Giỏ Hàng ({cartItems.length} sản phẩm):</h3>
      {cartItems.length === 0 ? (
        <p style={{ color: "#888", fontStyle: "italic" }}>Giỏ hàng trống</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cartItems.map((item) => (
            <li
              key={item.id}
              style={{
                padding: "10px",
                backgroundColor: "#f9f9f9",
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#333", fontWeight: "500" }}>
                {item.name} - ${item.price} x {item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => dispatch(cartActions.removeItem(item.id))}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Xóa 1
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Tính toán */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
          fontWeight: "bold",
          border: "1px solid #ddd",
          color: "#333",
        }}
      >
        <p style={{ margin: "8px 0", color: "#333" }}>
          Tổng tiền: ${totalAmount.toFixed(2)}
        </p>
        <p style={{ margin: "8px 0", color: "#333" }}>
          Thuế (10%): ${tax.toFixed(2)} (Tính bằng createSelector)
        </p>
        <p
          style={{
            fontSize: "1.1em",
            color: "#197c2a",
            margin: "8px 0",
            fontWeight: "bold",
          }}
        >
          Thành tiền: ${(totalAmount + tax).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ShoppingCart;
