// src/App.jsx
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import ShoppingCart from "./components/ShoppingCart";
import HeavyList from "./components/HeavyList";

const AdminPanel = React.lazy(() => import("./components/AdminPanel"));

function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
        <h1>Lab 5: React Advanced</h1>

        <nav style={{ marginBottom: 12 }}>
          <Link to="/" style={{ marginRight: 12 }}>
            Home
          </Link>
          <Link to="/dashboard" style={{ marginRight: 12 }}>
            Part 2 - Heavy List
          </Link>
          <Link to="/admin">Admin Panel</Link>
        </nav>

        <Routes>
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

          <Route path="/dashboard" element={<HeavyList />} />

          <Route
            path="/admin"
            element={
              <Suspense fallback={<div>Loading admin...</div>}>
                <AdminPanel />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
