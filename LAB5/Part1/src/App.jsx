// src/App.jsx
import React from "react";
import UserProfile from "./components/UserProfile";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Lab 5: React Advanced</h1>
      <hr />

      {/* Bài 1.1 */}
      <UserProfile />

      <hr />

      {/* Bài 1.2 */}
      <ShoppingCart />
    </div>
  );
}

export default App;
