import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AuthShell, SignInCard } from "@/components/flows/auth";
import { FeedbackBubble } from "@/components/flows/feedback-bubble";
import { AdminDashboardShell } from "@/components/flows/admin-dashboard-shell";
import { AdminTopbar } from "@/components/flows/admin-topbar";
import { DashboardHeader, type DashboardTab } from "@/components/flows/dashboard-header";
import { TrackerLoading as TrackerLoadingGrid } from "@/components/flows/tracker-loading";
import { WorkerPipeline } from "@/components/flows/worker-pipeline";
import { FlowPage, Part, useFlowAdvance, type Advance, type PartInfo } from "@/components/flows/flow-page";
import "./tokens.css";
import "./typography.css";

/**
 * Flows — F1 Sign in. Each story is one full screen of the sign-in happy path on
 * demofronted.live, composed only from the patterns in this Storybook:
 * sign in → credentials entered → signing in → tracker loading → pipeline.
 * Pages render in <FlowPage> (components/flows/flow-page), which reports their parts to the
 * flow canvas.
 */
const meta: Meta = {
  title: "Flows/F1 Sign in",
  parameters: { layout: "fullscreen" },
  globals: { theme: "interim" },
};
export default meta;
type Story = StoryObj;

const P = {
  login:    { id: "patterns-login--login", label: "Patterns/Login" },
  bubble:   { id: "patterns-feedback-bubble--feedback-bubble", label: "Patterns/Feedback Bubble" },
  shell:    { id: "patterns-admin-dashboard-shell--admin-dashboard-shell", label: "Patterns/Admin Dashboard Shell" },
  topbar:   { id: "patterns-admin-topbar--admin-topbar", label: "Patterns/Admin Topbar" },
  header:   { id: "patterns-dashboard-header--dashboard-header", label: "Patterns/Dashboard Header" },
  loading:  { id: "patterns-tracker-loading--tracker-loading", label: "Patterns/Tracker Loading" },
  pipeline: { id: "patterns-worker-pipeline--worker-pipeline", label: "Patterns/Worker Pipeline" },
} satisfies Record<string, PartInfo>;

const credentials = { email: "joe@example.com", password: "example-password" };

function SignInScreen({ advanceOn, ...props }: React.ComponentProps<typeof SignInCard> & { advanceOn?: Advance[] }) {
  return (
    <FlowPage advanceOn={advanceOn}>
      <Part of={P.login}><AuthShell fullPage><SignInCard {...props} /></AuthShell></Part>
      <Part of={P.bubble}><FeedbackBubble /></Part>
    </FlowPage>
  );
}

/** The header with a working Workers | Payroll | Payments switch. The body stays on Workers;
 *  choosing Payments is where the contractor payments flow branches off (on the canvas it
 *  moves on to Flows/F1 Contractor payments). */
function LiveHeader() {
  const [tab, setTab] = React.useState<DashboardTab>("tracker");
  const advance = useFlowAdvance();
  return <DashboardHeader payments tab={tab} onTabChange={(t) => { setTab(t); if (t === "payments") advance("payments"); }} />;
}

function DashboardScreen({ children, body }: { children: React.ReactNode; body: PartInfo }) {
  return (
    <FlowPage>
      <Part of={P.shell}>
        <AdminDashboardShell
          topbar={<Part of={P.topbar}><AdminTopbar fixed /></Part>}
          header={<Part of={P.header}><LiveHeader /></Part>}
        >
          <Part of={body}>{children}</Part>
        </AdminDashboardShell>
      </Part>
    </FlowPage>
  );
}

export const SignIn: Story = {
  name: "1 · Sign in",
  // Typing (or trying Sign In) moves on to the filled form.
  render: () => <SignInScreen advanceOn={["input", "submit"]} />,
};

export const CredentialsEntered: Story = {
  name: "2 · Credentials entered",
  render: () => <SignInScreen {...credentials} advanceOn={["submit"]} />,
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
