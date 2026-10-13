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
 * Every composed piece is wrapped in <Part>, naming the story it comes from. When a page is
 * embedded (the flow canvas), it posts each part's measured rect to the parent window so the
 * canvas can spotlight it — regions come from the live layout, never from a screenshot.
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

function measureParts(root: HTMLElement) {
  const vw = window.innerWidth, vh = window.innerHeight;
  const round = (v: number) => Math.round(v * 1000) / 1000;
  return Array.from(root.querySelectorAll<HTMLElement>("[data-part]")).map((el) => {
    const rects = Array.from(el.children).map((c) => c.getBoundingClientRect()).filter((r) => r.width && r.height);
    if (!rects.length) return null;
    const l = Math.max(0, Math.min(...rects.map((r) => r.left)));
    const t = Math.max(0, Math.min(...rects.map((r) => r.top)));
    const r = Math.min(vw, Math.max(...rects.map((x) => x.right)));
    const b = Math.min(vh, Math.max(...rects.map((x) => x.bottom)));
    return { id: el.dataset.part, label: el.dataset.label, rect: [round(l / vw), round(t / vh), round((r - l) / vw), round((b - t) / vh)] };
  }).filter(Boolean);
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
  // A full screen takes the app's base: Inter (the interim theme's --ds-font-body is
  // the system stack) and the app heading hierarchy via data-app-base (globals.css).
  return <div ref={ref} data-app-base="" style={{ fontFamily: "var(--ds-font-sans)" }}>{children}</div>;
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
