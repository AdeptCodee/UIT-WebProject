/** @jsx h */
/** @jsxFrag Fragment */
import "./styles.css";
import "./styles/counter.css";
import { h, Fragment, mount } from "./jsx-runtime";
import { TodoApp } from "./todo-app";

function App() {
  return (
    <div className="app-container">
      <TodoApp />
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  mount(<App />, rootElement);
}
