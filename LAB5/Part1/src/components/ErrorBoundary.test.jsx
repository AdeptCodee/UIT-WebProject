import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "react-error-boundary";
import { Bomb } from "./ErrorBoundaryTest";
import { vi } from "vitest";

// Fallback UI đơn giản để test
const Fallback = () => <div>Something went wrong</div>;

describe("Error Boundary", () => {
  test("Hiển thị Fallback UI khi component con bị lỗi", () => {
    // 1. Chặn cái console.error đỏ lòm khi chạy test (cho đỡ rác màn hình)
    const consoleSpy = vi.spyOn(console, "error");
    consoleSpy.mockImplementation(() => {});

    // 2. Render Component "Bomb" bên trong ErrorBoundary
    // Lưu ý: React sẽ cố gắng bắt lỗi này
    render(
      <ErrorBoundary FallbackComponent={Fallback}>
        <Bomb />
      </ErrorBoundary>
    );

    // 3. Assert: Kiểm tra xem dòng chữ "Something went wrong" có hiện ra không
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    // Dọn dẹp: trả lại console.error bình thường
    consoleSpy.mockRestore();
  });
});
