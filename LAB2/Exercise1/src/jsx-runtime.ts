export interface VNode {
  type: string | ComponentFunction;
  props: Record<string, any>;
  children: (VNode | string | number)[];
}

export interface ComponentProps {
  children?: (VNode | string | number)[];
  [key: string]: any;
}

export type ComponentFunction = (props: ComponentProps) => VNode;

export function createElement(
  type: string | ComponentFunction,
  props: Record<string, any> | null,
  ...children: (VNode | string | number | null | undefined)[]
): VNode {
  props = props || {};
  const flatChildren = children
    .flat()
    .filter((c): c is VNode | string | number => c != null);
  if (typeof type === "function") {
    return type({ ...props, children: flatChildren });
  }
  return { type, props, children: flatChildren };
}

export function createFragment(
  props: Record<string, any> | null,
  ...children: (VNode | string | number)[]
): VNode {
  return createElement("fragment", props, ...children);
}

export const h = createElement;
export const Fragment = createFragment;

// Event Delegation
const delegatedEvents: Record<string, boolean> = {};

function setupEventDelegation(eventType: string) {
  if (delegatedEvents[eventType]) return; // tránh đăng ký trùng
  delegatedEvents[eventType] = true;

  document.addEventListener(eventType, (e) => {
    const target = e.target as HTMLElement;
    const path = e.composedPath() as HTMLElement[];

    for (const el of path) {
      if (!(el instanceof HTMLElement)) continue;
      const handlerId = el.getAttribute?.(`data-on${eventType}`);
      if (handlerId && eventHandlers[handlerId]) {
        eventHandlers[handlerId](e);
        break;
      }
    }
  });
}

const eventHandlers: Record<string, (e: Event) => void> = {};
let handlerIdCounter = 0;

// renderToDOM
export function renderToDOM(vnode: VNode | string | number): Node {
  if (typeof vnode === "string" || typeof vnode === "number") {
    return document.createTextNode(String(vnode));
  }

  if (typeof vnode.type === "function") {
    const result = (vnode.type as Function)({
      ...(vnode.props || {}),
      children: vnode.children,
    });
    return renderToDOM(result);
  }

  const el = document.createElement(vnode.type as string);
  const props = vnode.props || {};

  for (const key in props) {
    const value = props[key];

    // Feature 1: Refs Suppor
    if (key === "ref" && typeof value === "function") {
      value(el);
      continue;
    }

    // Feature 2: CSS-in-JS Support
    if (key === "style") {
      if (typeof value === "string") {
        el.setAttribute("style", value);
      } else if (typeof value === "object" && value !== null) {
        const styleStr = Object.entries(value)
          .map(([prop, val]) => {
            const kebab = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
            return `${kebab}: ${val}`;
          })
          .join("; ");
        el.setAttribute("style", styleStr);
      }
      continue;
    }

    // Feature 3: Event Delegation
    if (key.startsWith("on") && typeof value === "function") {
      const eventType = key.slice(2).toLowerCase();
      const handlerId = `h${++handlerIdCounter}`;
      eventHandlers[handlerId] = value;
      el.setAttribute(`data-on${eventType}`, handlerId);
      setupEventDelegation(eventType);
      continue;
    }

    if (key === "className") {
      el.setAttribute("class", value);
    } else if (value === true) {
      el.setAttribute(key, "");
    } else if (value !== false && value != null) {
      el.setAttribute(key, String(value));
    }
  }

  vnode.children.forEach((c) => {
    el.appendChild(renderToDOM(c));
  });

  return el;
}
// mount & useState 
export function mount(vnode: VNode, container: HTMLElement): void {
  container.appendChild(renderToDOM(vnode));
}

export function useState<T>(initialValue: T): [() => T, (newValue: T) => void] {
  let value = initialValue;
  const get = () => value;
  const set = (newValue: T) => {
    value = newValue;
  };
  return [get, set];
}
