import { createElement } from "./jsx-runtime";
import { Dashboard } from "./dashboard";

const root = document.getElementById("root");
if (root) {
  root.appendChild(Dashboard());
}
