import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { vi } from "vitest";
// Import hàm cần mock
import * as api from "../api";

// Mock toàn bộ file api.js
vi.mock("../api", () => ({
  loginAPI: vi.fn(),
}));

describe("LoginForm Component", () => {
  test("User nhập liệu và login thành công", async () => {
    // 1. Arrange
    render(<LoginForm />);

    // Cài đặt giả lập: Khi loginAPI được gọi, trả về success ngay lập tức
    // Lưu ý: api.loginAPI ở đây là hàm giả (mock)
    const mockLogin = vi.mocked(api.loginAPI);
    mockLogin.mockResolvedValue({ success: true });

    // 2. Act
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(emailInput, { target: { value: "student@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitBtn);

    // 3. Assert
    // Kiểm tra hàm giả có được gọi không
    expect(mockLogin).toHaveBeenCalledWith(
      "student@example.com",
      "password123"
    );

    // Chờ dòng chữ Welcome back hiện ra
    const successMsg = await screen.findByText(/welcome back/i);
    expect(successMsg).toBeInTheDocument();
  });
});
