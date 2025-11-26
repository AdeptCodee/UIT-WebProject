import { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <h2>Theme Switcher</h2>

        <button onClick={toggleTheme}>Đổi Theme của button dưới</button>

        <Dashboard />
      </div>
    </ThemeContext.Provider>
  );
}
