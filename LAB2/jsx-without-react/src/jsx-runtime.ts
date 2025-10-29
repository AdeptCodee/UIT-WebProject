
export type VNode = {
  type: string | Function | symbol;
  props: Record<string, any> | null;
  children: Array<VNode | string | number>;
};

export function createElement(
  type: string | Function | symbol,
  props: Record<string, any> | null,
  ...children: Array<VNode | string | number>
): VNode {
  return { type, props, children };
}

export function renderToDOM(vnode: VNode | string | number): Node {
  if (typeof vnode === "string" || typeof vnode === "number") {
    return document.createTextNode(String(vnode));
  }

  if (vnode.type === Symbol.for("fragment")) {
    const fragment = document.createDocumentFragment();
    vnode.children.forEach((child) => fragment.appendChild(renderToDOM(child)));
    return fragment;
  }

  if (typeof vnode.type === "function") {
    const componentResult = (vnode.type as Function)({
      ...(vnode.props || {}),
      children: vnode.children,
    });
    return renderToDOM(componentResult as VNode);
  }

  const el = document.createElement(vnode.type as string);

  if (vnode.props) {
    for (const [key, value] of Object.entries(vnode.props)) {
      if (key === "className") {
        el.setAttribute("class", value);
      } else if (key === "style" && typeof value === "object") {
        Object.assign(el.style, value);
      } else if (key.startsWith("on") && typeof value === "function") {
        const eventName = key.slice(2).toLowerCase();
        el.addEventListener(eventName, value);
      } else if (typeof value === "boolean") {
        if (value) el.setAttribute(key, "");
      } else {
        el.setAttribute(key, String(value));
      }
    }
  }

  vnode.children.forEach((child) => {
    el.appendChild(renderToDOM(child));
  });

  return el;
}

export function mount(vnode: VNode, container: HTMLElement): void {
  const domNode = renderToDOM(vnode);
  container.appendChild(domNode);
}

export function useState<T>(initialValue: T): [() => T, (newValue: T) => void] {
  let value = initialValue;
  const get = () => value;
  const set = (newValue: T) => {
    value = newValue;
    console.log("State updated:", value);
  };
  return [get, set];
}
