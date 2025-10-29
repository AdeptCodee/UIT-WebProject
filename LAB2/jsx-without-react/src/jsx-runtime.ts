// src/jsx-runtime.ts
export interface VNode {
  type: string | Function;
  props: Record<string, any> | null;
  children: (VNode | string | number)[];
}

// === JSX Runtime Core ===
export function createElement(
  type: string | Function,
  props: Record<string, any> | null,
  ...children: (VNode | string | number)[]
): VNode {
  return {
    type,
    props: props || {},
    children: children.flat().filter((c) => c != null),
  };
}

// Thêm hàm createFragment
export function createFragment(
  props: Record<string, any> | null,
  ...children: (VNode | string | number)[]
): VNode {
  return createElement("fragment", props, ...children);
}

// === DOM Rendering ===
export function renderToDOM(vnode: VNode | string | number): Node {
  if (typeof vnode === "string" || typeof vnode === "number") {
    return document.createTextNode(String(vnode));
  }

  // Handle fragment
  if (vnode.type === "fragment") {
    const fragment = document.createDocumentFragment();
    vnode.children.forEach((child) => fragment.appendChild(renderToDOM(child)));
    return fragment;
  }

  // Handle functional components
  if (typeof vnode.type === "function") {
    return renderToDOM((vnode.type as Function)(vnode.props || {}));
  }

  // Create DOM element
  const el = document.createElement(vnode.type as string);

  // Set attributes
  for (const [key, value] of Object.entries(vnode.props || {})) {
    if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.substring(2).toLowerCase(), value);
    } else if (key === "className") {
      el.setAttribute("class", value);
    } else if (key === "style" && typeof value === "object") {
      Object.assign(el.style, value);
    } else {
      el.setAttribute(key, value);
    }
  }

  // Append children
  vnode.children.forEach((child) => el.appendChild(renderToDOM(child)));
  return el;
}

// === Mount ===
export function mount(vnode: VNode, container: HTMLElement): void {
  container.appendChild(renderToDOM(vnode));
}

// === Simple useState ===
export function useState<T>(initial: T): [() => T, (val: T) => void] {
  let value = initial;
  const get = () => value;
  const set = (v: T) => (value = v);
  return [get, set];
}
