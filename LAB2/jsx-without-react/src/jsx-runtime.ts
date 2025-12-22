export interface ComponentProps {
  children?: (VNode | string | number)[];
  [key: string]: any;
}

export type ComponentFunction = (props: ComponentProps) => VNode;

export interface VNode {
  type: string | ComponentFunction;
  props: Record<string, any>;
  children: (VNode | string | number)[];
}

export function createElement(
  type: string | ComponentFunction,
  props: Record<string, any> | null,
  ...children: (VNode | string | number)[]
): VNode {
  const processedProps = props || {};

  const finalChildren = children
    .flat()
    .filter(
      (child) =>
        child !== null && child !== undefined && typeof child !== "boolean"
    );

  return {
    type: type,
    props: processedProps,
    children: finalChildren,
  };
}

export function createFragment(
  props: Record<string, any> | null,
  ...children: (VNode | string | number)[]
): VNode {
  return createElement("fragment", props, ...children);
}

export { createElement as h, createFragment as Fragment };

export function renderToDOM(vnode: VNode | string | number): Node {
  if (typeof vnode === "string" || typeof vnode === "number") {
    return document.createTextNode(String(vnode));
  }

  if (vnode.type === "fragment") {
    const fragment = document.createDocumentFragment();
    vnode.children.forEach((child) => {
      fragment.appendChild(renderToDOM(child));
    });
    return fragment;
  }

  if (typeof vnode.type === "function") {
    const componentNode = vnode.type({
      ...vnode.props,
      children: vnode.children,
    });
    return renderToDOM(componentNode);
  }

  const element = document.createElement(vnode.type);

  Object.keys(vnode.props).forEach((key) => {
    const value = vnode.props[key];
    if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.substring(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else if (key === "className") {
      element.className = String(value);
    } else if (key === "style" && typeof value === "object") {
      Object.keys(value).forEach((styleKey) => {
        (element.style as any)[styleKey] = value[styleKey];
      });
    } else if (typeof value === "boolean") {
      if (value) {
        (element as any)[key] = true;
        element.setAttribute(key, "");
      }
    } else if (value !== null && value !== undefined) {
      element.setAttribute(key, String(value));
    }
  });

  vnode.children.forEach((child) => {
    element.appendChild(renderToDOM(child));
  });

  return element;
}

export function mount(vnode: VNode, container: HTMLElement): void {
  container.innerHTML = "";
  const domNode = renderToDOM(vnode);
  container.appendChild(domNode);
}

let currentComponent: (() => VNode) | null = null;
let rootContainer: HTMLElement | null = null;

export function useState<T>(initialValue: T): [() => T, (newValue: T) => void] {
  let value: T = initialValue;

  const getValue = (): T => {
    return value;
  };

  const setValue = (newValue: T): void => {
    value = newValue;
    if (currentComponent && rootContainer) {
      const vnode = currentComponent();
      rootContainer.innerHTML = '';
      rootContainer.appendChild(renderToDOM(vnode));
    }
  };

  return [getValue, setValue];
}

export function mountWithUpdates(vnode: VNode, container: HTMLElement): void {
  if (typeof vnode.type === 'function') {
    const componentFn = vnode.type as ComponentFunction;
    currentComponent = () => componentFn(vnode.props);
    rootContainer = container;
  }
  mount(vnode, container);
}
