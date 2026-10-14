import * as React from "react";

/**
 * Flow Page — the frame every Flows/* page story renders in.
 *
 * Every composed pattern is wrapped in <Part>, naming the story it comes from; every ui
 * component marks itself with data-ds. When a page is embedded (the flow canvas), it posts the
 * patterns and each visible component instance, measured, to the parent window so the canvas
 * can spotlight them — regions come from the live layout, never from a screenshot. Portalled
 * layers (sheets, dialogs) are measured too.
 *
 * A page also tells the canvas when its action happens, so the flow moves on: typing or
 * submitting (`advanceOn`), or any control that calls `useFlowAdvance()`. Wheel gestures the
 * page has no use for are handed back so the canvas keeps panning and zooming.
 */
export type PartInfo = { id: string; label: string; family?: string };

/** Marks a composed piece. `display: contents` keeps it out of layout. A `family` names the
 *  job a pattern does (e.g. "sign-in"), so the canvas can compare different patterns that do
 *  the same job - an admin sign-in against an employee sign-in. */
export function Part({ of, children }: { of: PartInfo; children: React.ReactNode }) {
  return <div data-part={of.id} data-label={of.label} data-family={of.family} style={{ display: "contents" }}>{children}</div>;
}

/** The components a page is built from, keyed by the data-ds mark each one renders. */
export const COMPONENTS: Record<string, PartInfo> = {
  wordmark: { id: "brand--brand-page", label: "Brand/Wordmark" },
  button:   { id: "components-button--buttons", label: "Components/Button" },
  input:    { id: "components-input--input-story", label: "Components/Input" },
  label:    { id: "components-label--label-story", label: "Components/Label" },
  avatar:   { id: "components-avatar--avatar-story", label: "Components/Avatar" },
  tabs:     { id: "components-tabs--tabs-story", label: "Components/Tabs" },
  card:     { id: "components-card--card-story", label: "Components/Card" },
  badge:    { id: "components-badge--badges", label: "Components/Badge" },
  skeleton: { id: "components-skeleton--skeleton-story", label: "Components/Skeleton" },
  sheet:    { id: "components-sheet--sheet-story", label: "Components/Sheet" },
  dialog:   { id: "components-dialog--dialog-story", label: "Components/Dialog" },
  checkbox: { id: "components-checkbox--checkbox-story", label: "Components/Checkbox" },
  select:   { id: "components-select--select-story", label: "Components/Select" },
  collapsible: { id: "components-collapsible--collapsible-story", label: "Components/Collapsible" },
};

type Box = { l: number; t: number; r: number; b: number };

/** What of an element is actually on screen: clipped by scroll/overflow ancestors and the
 *  viewport; nothing if it is invisible (opacity 0, hidden). */
function visibleBox(el: Element): Box | null {
  if ((el as HTMLElement).checkVisibility && !(el as HTMLElement).checkVisibility({ opacityProperty: true, visibilityProperty: true })) return null;
  const r = el.getBoundingClientRect();
  let box: Box = { l: r.left, t: r.top, r: r.right, b: r.bottom };
  for (let a = el.parentElement; a; a = a.parentElement) {
    const cs = getComputedStyle(a);
    if (cs.overflowX !== "visible" || cs.overflowY !== "visible") {
      const c = a.getBoundingClientRect();
      box = { l: Math.max(box.l, c.left), t: Math.max(box.t, c.top), r: Math.min(box.r, c.right), b: Math.min(box.b, c.bottom) };
    }
  }
  box = { l: Math.max(box.l, 0), t: Math.max(box.t, 0), r: Math.min(box.r, window.innerWidth), b: Math.min(box.b, window.innerHeight) };
  return box.r - box.l > 1 && box.b - box.t > 1 ? box : null;
}

const norm = (x: Box) => {
  const vw = window.innerWidth, vh = window.innerHeight, n = (v: number) => Math.round(v * 1000) / 1000;
  return [n(x.l / vw), n(x.t / vh), n((x.r - x.l) / vw), n((x.b - x.t) / vh)];
};

/** What a pattern is made of on this screen: each visible component it renders itself (not
 *  inside a nested pattern), with its width in px - "tabs@280". Two screens rendering the same
 *  pattern with different signatures are an inconsistency the canvas can point at. */
function signature(part: HTMLElement) {
  const sig = new Set<string>();
  part.querySelectorAll<HTMLElement>("[data-ds]").forEach((el) => {
    if (el.closest("[data-part]") !== part || !COMPONENTS[el.dataset.ds!]) return;
    const box = visibleBox(el);
    if (box) sig.add(`${el.dataset.ds}@${Math.round((box.r - box.l) / 4) * 4}`);
  });
  return Array.from(sig).sort();
}

/** Patterns (one union rect each, from <Part>, with their signature and family) and components
 *  (one rect per visible instance, from data-ds), as fractions of the viewport. */
function measureParts(root: HTMLElement) {
  const patterns = Array.from(root.querySelectorAll<HTMLElement>("[data-part]")).map((el) => {
    const boxes = Array.from(el.children).map(visibleBox).filter(Boolean) as Box[];
    if (!boxes.length) return null;
    const u = { l: Math.min(...boxes.map((x) => x.l)), t: Math.min(...boxes.map((x) => x.t)), r: Math.max(...boxes.map((x) => x.r)), b: Math.max(...boxes.map((x) => x.b)) };
    return { kind: "pattern", id: el.dataset.part, label: el.dataset.label, family: el.dataset.family || undefined,
             rects: [norm(u)], sig: signature(el) };
  }).filter(Boolean);
  const byName = new Map<string, number[][]>();
  root.querySelectorAll<HTMLElement>("[data-ds]").forEach((el) => {
    const box = visibleBox(el);
    if (!box || !COMPONENTS[el.dataset.ds!]) return;
    byName.set(el.dataset.ds!, [...(byName.get(el.dataset.ds!) || []), norm(box)]);
  });
  const components = Array.from(byName, ([name, rects]) => ({ kind: "component", ...COMPONENTS[name], rects }));
  return [...patterns, ...components];
}

/** Whether something under `el` can still scroll in the wheel's direction. */
function canScroll(el: Element | null, dx: number, dy: number) {
  for (let a = el; a && a !== document.documentElement; a = a.parentElement) {
    const cs = getComputedStyle(a);
    if (dy && /(auto|scroll)/.test(cs.overflowY) && a.scrollHeight > a.clientHeight + 1 &&
        (dy < 0 ? a.scrollTop > 0 : a.scrollTop + a.clientHeight < a.scrollHeight - 1)) return true;
    if (dx && /(auto|scroll)/.test(cs.overflowX) && a.scrollWidth > a.clientWidth + 1 &&
        (dx < 0 ? a.scrollLeft > 0 : a.scrollLeft + a.clientWidth < a.scrollWidth - 1)) return true;
  }
  return false;
}

export type Advance = "input" | "submit";

const AdvanceContext = React.createContext<(via: string) => void>(() => {});

/** Call the returned function when the screen's action happens (a click that moves the
 *  journey on). On the canvas the flow advances to the next step; standalone it does nothing. */
export function useFlowAdvance() {
  return React.useContext(AdvanceContext);
}

export function FlowPage({ children, advanceOn = [] }: { children: React.ReactNode; advanceOn?: Advance[] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const advance = React.useRef(advanceOn);
  advance.current = advanceOn;
  const advanced = React.useRef(false);
  const post = React.useCallback((via: string) => {
    if (window.parent === window || advanced.current) return;
    advanced.current = true;
    window.parent.postMessage({ type: "flow-page-advance", via }, "*");
  }, []);
  React.useEffect(() => {
    if (window.parent === window) return;
    const root = ref.current;
    const onAction = (kind: Advance) => (e: Event) => {
      if (!advance.current.includes(kind) || advanced.current) return;
      if (kind === "submit") e.preventDefault();
      post(kind);
    };
    const onInput = onAction("input"), onSubmit = onAction("submit");
    root?.addEventListener("input", onInput, true);
    root?.addEventListener("submit", onSubmit, true);
    const onWheel = (e: WheelEvent) => {
      const zoom = e.ctrlKey || e.metaKey;
      if (!zoom && canScroll(e.target as Element, e.deltaX, e.deltaY)) return;
      e.preventDefault();
      window.parent.postMessage({ type: "flow-page-wheel", dx: e.deltaX, dy: e.deltaY, mode: e.deltaMode,
        zoom, shift: e.shiftKey, x: e.clientX, y: e.clientY }, "*");
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    // Measure the whole document: sheets and dialogs render in portals outside the page root.
    const measure = () => window.parent.postMessage({ type: "flow-page-parts", parts: measureParts(document.body) }, "*");
    const timers = [50, 400, 1200].map((ms) => window.setTimeout(measure, ms));
    document.fonts?.ready.then(measure);
    // The canvas lets you use a focused page: re-measure after scrolling or any change.
    let pending = 0;
    const soon = () => { window.clearTimeout(pending); pending = window.setTimeout(measure, 120); };
    const observer = new MutationObserver(soon);
    observer.observe(document.body, { subtree: true, childList: true, attributes: true });
    const onMessage = (e: MessageEvent) => { if (e.data?.type === "flow-page-parts?") measure(); };
    // Esc inside the page closes the step on the canvas (unless a layer in the page uses it).
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.querySelector("[role=dialog],[role=alertdialog]")) window.parent.postMessage({ type: "flow-page-escape" }, "*");
    };
    window.addEventListener("message", onMessage);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", soon, true);
    window.addEventListener("keydown", onKey);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(pending);
      observer.disconnect();
      window.removeEventListener("message", onMessage);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", soon, true);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      root?.removeEventListener("input", onInput, true);
      root?.removeEventListener("submit", onSubmit, true);
    };
  }, [post]);
  // A full screen takes the app's heading hierarchy via data-app-base (globals.css).
  return (
    <AdvanceContext.Provider value={post}>
      <div ref={ref} data-app-base="">{children}</div>
    </AdvanceContext.Provider>
  );
}
