const vnodePool: any[] = [];

function getVNode(type: any, props: any, ...children: any[]) {
  if (vnodePool.length > 0) {
    const node = vnodePool.pop();
    node.type = type;
    node.props = props;
    node.children = children;
    return node;
  }
  return { type, props, children };
}

function releaseVNode(node: any) {
  vnodePool.push(node);
}

const queue: (() => void)[] = [];
let scheduled = false;

function batchUpdate(fn: () => void) {
  queue.push(fn);
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(() => {
      while (queue.length) queue.shift()?.();
      scheduled = false;
    });
  }
}

function delegate(root: HTMLElement) {
  root.addEventListener("click", (e) => {
    const t = e.target as HTMLElement;
    if (t && t.dataset && t.dataset.action) {
      const ev = new CustomEvent(t.dataset.action);
      t.dispatchEvent(ev);
    }
  });
}

function preventLeaks(root: HTMLElement) {
  const all = root.querySelectorAll("*");
  all.forEach((el) => {
    for (const k in el) {
      if (k.startsWith("__react")) (el as any)[k] = null;
    }
  });
}

export { getVNode, releaseVNode, batchUpdate, delegate, preventLeaks };
