import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Nếu không có file này thì xóa dòng này đi
import { Provider } from "react-redux";

// Kiểm tra kỹ đường dẫn này.
// Nếu file store.js nằm trong folder src/store/ thì viết thế này:
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
