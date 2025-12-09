// src/api.js
// Tách hàm này ra đây để dễ test (Mocking)
export const loginAPI = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Calling Real API..."); // Log để biết khi nào chạy thật
      resolve({ success: true });
    }, 500);
  });
};
