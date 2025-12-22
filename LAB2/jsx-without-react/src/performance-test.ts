import { createElement, renderToDOM } from "./jsx-runtime";

function benchmark(label: string, fn: () => void) {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(label + ": " + (end - start).toFixed(2) + "ms");
}

function testCreateElement() {
  benchmark("createElement", () => {
    for (let i = 0; i < 10000; i++) {
      createElement("div", { className: "box" }, "item");
    }
  });
}

function testRender() {
  const root = document.createElement("div");
  document.body.appendChild(root);
  benchmark("renderToDOM", () => {
    for (let i = 0; i < 1000; i++) {
      const vnode = createElement("p", null, "Hello " + i);
      const node = renderToDOM(vnode);
      root.appendChild(node);
    }
  });
}

testCreateElement();
testRender();
