import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AuthShell, SignInCard } from "@/components/flows/auth";
import { FeedbackBubble } from "@/components/flows/feedback-bubble";
import { AdminDashboardShell } from "@/components/flows/admin-dashboard-shell";
import { AdminTopbar } from "@/components/flows/admin-topbar";
import { DashboardHeader } from "@/components/flows/dashboard-header";
import { TrackerLoading as TrackerLoadingGrid } from "@/components/flows/tracker-loading";
import { WorkerPipeline } from "@/components/flows/worker-pipeline";
import "./tokens.css";
import "./typography.css";

/**
 * Flows — F1 Sign in. Each story is one full screen of the sign-in happy path on
 * demofronted.live, composed only from the patterns in this Storybook:
 * sign in → credentials entered → signing in → tracker loading → pipeline.
 *
 * Every composed pattern is wrapped in <Part>, naming the story it comes from; every ui
 * component marks itself with data-ds. When a page is embedded (the flow canvas), it posts the
 * patterns and each visible component instance, measured, to the parent window so the canvas
 * can spotlight them — regions come from the live layout, never from a screenshot.
 */
const meta: Meta = {
  title: "Flows/F1 Sign in",
  parameters: { layout: "fullscreen" },
  globals: { theme: "interim" },
};
export default meta;
type Story = StoryObj;

type PartInfo = { id: string; label: string };

const P = {
  login:    { id: "patterns-login--login", label: "Patterns/Login" },
  bubble:   { id: "patterns-feedback-bubble--feedback-bubble", label: "Patterns/Feedback Bubble" },
  shell:    { id: "patterns-admin-dashboard-shell--admin-dashboard-shell", label: "Patterns/Admin Dashboard Shell" },
  topbar:   { id: "patterns-admin-topbar--admin-topbar", label: "Patterns/Admin Topbar" },
  header:   { id: "patterns-dashboard-header--dashboard-header", label: "Patterns/Dashboard Header" },
  loading:  { id: "patterns-tracker-loading--tracker-loading", label: "Patterns/Tracker Loading" },
  pipeline: { id: "patterns-worker-pipeline--worker-pipeline", label: "Patterns/Worker Pipeline" },
} satisfies Record<string, PartInfo>;

/** Marks a composed piece. `display: contents` keeps it out of layout. */
function Part({ of, children }: { of: PartInfo; children: React.ReactNode }) {
  return <div data-part={of.id} data-label={of.label} style={{ display: "contents" }}>{children}</div>;
}

/** The components a page is built from, keyed by the data-ds mark each one renders. */
const COMPONENTS: Record<string, PartInfo> = {
  wordmark: { id: "brand--brand-page", label: "Brand/Wordmark" },
  button:   { id: "components-button--buttons", label: "Components/Button" },
  input:    { id: "components-input--input-story", label: "Components/Input" },
  label:    { id: "components-label--label-story", label: "Components/Label" },
  avatar:   { id: "components-avatar--avatar-story", label: "Components/Avatar" },
  tabs:     { id: "components-tabs--tabs-story", label: "Components/Tabs" },
  card:     { id: "components-card--card-story", label: "Components/Card" },
  badge:    { id: "components-badge--badges", label: "Components/Badge" },
  skeleton: { id: "components-skeleton--skeleton-story", label: "Components/Skeleton" },
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

/** Patterns (one union rect each, from <Part>) and components (one rect per visible instance,
 *  from data-ds), as fractions of the viewport. */
function measureParts(root: HTMLElement) {
  const patterns = Array.from(root.querySelectorAll<HTMLElement>("[data-part]")).map((el) => {
    const boxes = Array.from(el.children).map(visibleBox).filter(Boolean) as Box[];
    if (!boxes.length) return null;
    const u = { l: Math.min(...boxes.map((x) => x.l)), t: Math.min(...boxes.map((x) => x.t)), r: Math.max(...boxes.map((x) => x.r)), b: Math.max(...boxes.map((x) => x.b)) };
    return { kind: "pattern", id: el.dataset.part, label: el.dataset.label, rects: [norm(u)] };
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

/** A full screen of the flow. Reports its parts to an embedding window. */
function FlowPage({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (window.parent === window) return;
    const post = () => {
      if (!ref.current) return;
      window.parent.postMessage({ type: "flow-page-parts", parts: measureParts(ref.current) }, "*");
    };
    const timers = [50, 400, 1200].map((ms) => window.setTimeout(post, ms));
    document.fonts?.ready.then(post);
    const onMessage = (e: MessageEvent) => { if (e.data?.type === "flow-page-parts?") post(); };
    window.addEventListener("message", onMessage);
    window.addEventListener("resize", post);
    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("message", onMessage);
      window.removeEventListener("resize", post);
    };
  }, []);
  // A full screen takes the app's heading hierarchy via data-app-base (globals.css).
  return <div ref={ref} data-app-base="">{children}</div>;
}

const credentials = { email: "joe@example.com", password: "example-password" };

function SignInScreen(props: React.ComponentProps<typeof SignInCard>) {
  return (
    <FlowPage>
      <Part of={P.login}><AuthShell fullPage><SignInCard {...props} /></AuthShell></Part>
      <Part of={P.bubble}><FeedbackBubble /></Part>
    </FlowPage>
  );
}

function DashboardScreen({ children, body }: { children: React.ReactNode; body: PartInfo }) {
  return (
    <FlowPage>
      <Part of={P.shell}>
        <AdminDashboardShell
          topbar={<Part of={P.topbar}><AdminTopbar fixed /></Part>}
          header={<Part of={P.header}><DashboardHeader /></Part>}
        >
          <Part of={body}>{children}</Part>
        </AdminDashboardShell>
      </Part>
    </FlowPage>
  );
}

export const SignIn: Story = {
  name: "1 · Sign in",
  render: () => <SignInScreen />,
};

export const CredentialsEntered: Story = {
  name: "2 · Credentials entered",
  render: () => <SignInScreen {...credentials} />,
};

export const SigningIn: Story = {
  name: "3 · Signing in",
  render: () => <SignInScreen {...credentials} loading />,
};

export const TrackerLoading: Story = {
  name: "4 · Tracker loading",
  render: () => <DashboardScreen body={P.loading}><TrackerLoadingGrid /></DashboardScreen>,
};

export const Pipeline: Story = {
  name: "5 · Pipeline",
  render: () => <DashboardScreen body={P.pipeline}><WorkerPipeline /></DashboardScreen>,
};
