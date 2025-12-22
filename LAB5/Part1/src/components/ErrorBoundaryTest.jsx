import React from "react";
import { ErrorBoundary } from "react-error-boundary";

// Component "Quả bom" - Render phát là nổ lỗi luôn
export const Bomb = () => {
  throw new Error("Boom! Component bị lỗi rồi.");
};

// Component hiển thị khi có lỗi (Fallback)
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" style={{ color: "red" }}>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

// Component chính bọc ErrorBoundary
export const SafeComponent = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {/* Mặc định render an toàn, lát nữa test mình sẽ nhét Bomb vào đây */}
      <div>Component An Toàn</div>
    </ErrorBoundary>
  );
};
