import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChevronDown, Lock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Worker Onboarding (verbatim from the LIVE F3 flow,
 * demofronted.live/flows/worker-onboarding-v2-1). The self-onboarding form the worker
 * completes after signing: a single page with two accordion sections — Sign in (credentials)
 * and Bank Details, which stays locked until sign-in. Only these two sections exist in the
 * live prototype. Markup verbatim from the live DOM / SectionAccordion.
 */
const meta: Meta = { title: "Patterns/Worker Onboarding", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

/* Section — verbatim SectionAccordion (open / collapsed / locked) */
function SectionCard({ title, subtitle, open, locked, children }: { title: string; subtitle?: string; open?: boolean; locked?: boolean; children?: React.ReactNode }) {
  return (
    <div className={cn("rounded-xl border border-border/30 bg-card/20 overflow-hidden transition-all", locked && "opacity-60")}>
      <button className={cn("w-full flex items-center gap-3 px-4 py-3 text-left group transition-colors", locked ? "cursor-not-allowed" : "hover:bg-card/40 cursor-pointer")}>
        {locked && <Lock className="h-4 w-4 text-muted-foreground/60 shrink-0" />}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground leading-tight">{title}</p>
          {subtitle && <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {!locked && <ChevronDown className={cn("h-4 w-4 text-muted-foreground/60 shrink-0 transition-transform duration-200", open && "rotate-180")} />}
      </button>
      {open && children && <div className="border-t border-border/20"><div className="p-4 pt-3 space-y-4">{children}</div></div>}
    </div>
  );
}

function Group({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        {hint && <p className="text-[11px] text-muted-foreground/70 mt-0.5">{hint}</p>}
      </div>
      {children}
    </div>
  );
}
function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label>{label}</Label>{children}</div>;
}

function Header() {
  return (
    <div className="space-y-2 mb-4">
      <h1 className="text-2xl font-bold text-foreground">Hi Maria! Let's get you set up</h1>
      <p className="text-sm text-muted-foreground">Sign in and add your bank details to finish your onboarding.</p>
    </div>
  );
}

export const WorkerOnboarding: Story = {
  name: "Worker Onboarding",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Worker Onboarding"
        lead={<>The self-onboarding form the worker completes after signing — a single page with two accordion sections: <strong>Sign in</strong> (credentials from the onboarding email) and <strong>Bank Details</strong>, which stays locked until sign-in. These are the only two sections in the live prototype. Markup verbatim from demofronted.live/flows/worker-onboarding-v2-1.</>}
        meta="Verbatim from live F3 · worker-onboarding-v2-1"
      />

      {/* Live state — Sign in open, Bank Details locked */}
      <h3 style={eyebrow}>On load — Sign in open, Bank Details locked</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <div className="w-[560px] max-w-full">
          <Header />
          <div className="space-y-3">
            <SectionCard title="Sign in" open>
              <Group label="Your credentials" hint="Use the credentials from your onboarding email to continue.">
                <F label="Email address"><Input readOnly type="email" defaultValue="" placeholder="you@company.com" /></F>
                <F label="Password"><Input readOnly type="password" defaultValue="" placeholder="Enter your password" /></F>
                <Button className="w-full">Sign In</Button>
              </Group>
            </SectionCard>
            <SectionCard title="Bank Details" subtitle="Sign in first" locked />
          </div>
        </div>
      </div>
      <p style={{ ...note, marginTop: 4 }}>Header h1 text-2xl font-bold · sections SectionAccordion rounded-xl border-border/30 bg-card/20 · trigger px-4 py-3 · locked section opacity-60 + Lock + “Sign in first” cursor-not-allowed · Sign in group “YOUR CREDENTIALS”.</p>

      {/* After sign-in — Bank Details expanded */}
      <h3 style={eyebrow}>After sign-in — Bank Details</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <div className="w-[560px] max-w-full space-y-3">
          <SectionCard title="Sign in" subtitle="Signed in" />
          <SectionCard title="Bank Details" open>
            <F label="Bank country">
              <Select><SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger><SelectContent><SelectItem value="ph">🇵🇭 Philippines</SelectItem><SelectItem value="no">🇳🇴 Norway</SelectItem></SelectContent></Select>
            </F>
            <F label="Bank name"><Input readOnly defaultValue="" placeholder="e.g., BDO, BPI, Wells Fargo" /></F>
            <F label="Account holder"><Input readOnly defaultValue="" placeholder="Full name on the account" /></F>
            <F label="Account number"><Input readOnly defaultValue="" placeholder="Enter your account number" /></F>
            <F label="SWIFT / BIC"><Input readOnly defaultValue="" placeholder="For international payments" /></F>
            <div className="flex items-start space-x-2">
              <Checkbox id="ack" />
              <label htmlFor="ack" className="text-sm leading-none">I confirm my bank details are correct and acknowledge the payment schedule</label>
            </div>
            <Button className="w-full">Continue<ArrowRight className="ml-2 h-4 w-4" /></Button>
          </SectionCard>
        </div>
      </div>

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={150} rows={[
        ["Header", "greeting + one-line instruction", "h1 text-2xl font-bold · p text-sm text-muted-foreground"],
        ["Section", "Sign in / Bank Details accordion", "rounded-xl border-border/30 bg-card/20 · trigger px-4 py-3"],
        ["Locked section", "Bank Details before sign-in", "opacity-60 · Lock + “Sign in first” · cursor-not-allowed"],
        ["Sign in", "credentials group — email + password + Sign In", "group label uppercase · Input + Button w-full"],
        ["Bank Details", "country/name/holder/number/SWIFT + acknowledgement", "Select + Inputs · Checkbox · Continue + ArrowRight"],
      ]} />
    </div>
  ),
};
