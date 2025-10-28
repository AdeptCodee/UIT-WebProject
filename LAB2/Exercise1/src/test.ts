import { createElement, createFragment } from "./jsx-runtime";

const vnode = createElement("div", { className: "test" }, "Hello World");
console.log(vnode);
/*
  Expected output:
  {
    type: "div",
    props: { className: "test" },
    children: ["Hello World"]
  }
*/

const frag = createFragment(null, "A", "B", createElement("p", null, "C"));
console.log(frag);
/*
  Expected output:
  {
    type: "fragment",
    props: {},
    children: ["A", "B", { type: "p", props: {}, children: ["C"] }]
  }
*/
