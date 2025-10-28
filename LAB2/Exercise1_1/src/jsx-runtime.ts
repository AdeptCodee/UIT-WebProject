export function h(tag: any, props: any, ...children: any[]): HTMLElement {
  const element = document.createElement(tag);
  for (const key in props || {}) {
    element.setAttribute(key, props[key]);
  }
  for (const child of children) {
    element.appendChild(
      typeof child === "string" ? document.createTextNode(child) : child
    );
  }
  return element;
}

export function Fragment(props: { children: any[] }) {
  const fragment = document.createDocumentFragment();
  props.children.forEach((child) =>
    fragment.appendChild(
      typeof child === "string" ? document.createTextNode(child) : child
    )
  );
  return fragment;
}
