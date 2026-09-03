import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, CheckCircle2, ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Onboarding Steps (verbatim from F3 Worker Onboarding, worker-onboarding-v2).
 * The self-onboarding wizard screens the worker completes after their contract is signed:
 * Welcome (Sign in), Personal Profile, Tax Details, Bank Details and the Completion screen.
 * Each is a card with a header, a field stack built from the Label + Input / Select atoms,
 * and a Continue action. Markup verbatim from the WorkerStep*_v2 source screens.
 */
const meta: Meta = { title: "Patterns/Onboarding Steps", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

/* Field block — verbatim onboarding field (space-y-2 · Label · control) */
function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label>{label}</Label>{children}</div>;
}
function Screen({ children }: { children: React.ReactNode }) {
  return <div className="w-[560px] max-w-full rounded-lg border border-border bg-background overflow-hidden shadow-card">{children}</div>;
}

export const OnboardingSteps: Story = {
  name: "Onboarding Steps",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Onboarding Steps"
        lead={<>The self-onboarding wizard the worker completes after signing — Welcome (Sign in), Personal Profile, Tax Details, Bank Details and Completion. Each screen is a card with a header, a stack of fields built from the Label + Input / Select atoms, and a Continue action. Markup verbatim from the WorkerStep*_v2 screens (worker-onboarding-v2).</>}
        meta="Verbatim from F3 · Worker onboarding (worker-onboarding-v2)"
      />

      {/* ── Welcome (Sign in) ── */}
      <h3 style={eyebrow}>1 · Welcome (Sign in)</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <Screen>
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Sign in</h2>
              <p className="text-sm text-muted-foreground">Use your default credentials from the email.</p>
            </div>
            <div className="bg-card/40 border border-border/40 rounded-lg p-4 space-y-4">
              <F label="Full Name"><Input readOnly defaultValue="" placeholder="John Doe" /></F>
              <F label="Email"><Input readOnly defaultValue="" placeholder="you@company.com" /></F>
              <F label="Password"><Input readOnly type="password" defaultValue="" placeholder="••••••••" /></F>
            </div>
            <div className="pt-1"><Button className="w-full" size="lg">Get Started</Button></div>
          </div>
        </Screen>
      </div>

      {/* ── Personal Profile ── */}
      <h3 style={eyebrow}>2 · Personal Profile</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <Screen>
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Personal Profile</h3>
              <p className="text-sm text-muted-foreground">Review and confirm your personal details. Some fields are pre-filled from your contract.</p>
            </div>
            <div className="space-y-4">
              <F label="Full name"><Input readOnly defaultValue="Marcus Chen" /></F>
              <F label="Email"><Input readOnly defaultValue="marcus.chen@example.com" /></F>
              <F label="Phone"><Input readOnly defaultValue="" placeholder="+1 234 567 8900" /></F>
              <F label="Date of birth"><Input readOnly defaultValue="Mar 14, 1991" /></F>
              <F label="Nationality"><Input readOnly defaultValue="Singaporean" /></F>
              <F label="Address"><Input readOnly defaultValue="" placeholder="Enter your address" /></F>
              <F label="Identity document (JPG, PNG, or PDF)">
                <div className="rounded-lg border border-dashed border-border/60 bg-muted/10 px-3 py-6 text-center text-xs font-medium text-muted-foreground">Upload document</div>
              </F>
            </div>
            <Button className="w-full" size="lg">Continue</Button>
          </div>
        </Screen>
      </div>

      {/* ── Tax Details ── */}
      <h3 style={eyebrow}>3 · Tax Details</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <Screen>
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Pre-employment Requirements</h3>
              <p className="text-sm text-muted-foreground">We need your tax and identification details to ensure compliance.</p>
            </div>
            <div className="space-y-4">
              <F label="Country of tax residency">
                <button className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm"><span>🇸🇬 Singapore</span><ChevronsUpDown className="h-4 w-4 opacity-50" /></button>
              </F>
              <F label="Tax identification number"><Input readOnly defaultValue="" placeholder="Enter your tax number" /></F>
              <F label="Income Tax Regime">
                <Select><SelectTrigger className="h-10"><SelectValue placeholder="Select tax regime" /></SelectTrigger><SelectContent><SelectItem value="new">New regime</SelectItem><SelectItem value="old">Old regime</SelectItem></SelectContent></Select>
              </F>
            </div>
            <Button className="w-full" size="lg">Continue<ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
        </Screen>
      </div>

      {/* ── Bank Details ── */}
      <h3 style={eyebrow}>4 · Bank Details</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <Screen>
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Bank Details</h3>
              <p className="text-sm text-muted-foreground">Enter your bank details so we can process your payments.</p>
            </div>
            <div className="space-y-4">
              <F label="Bank country">
                <Select><SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger><SelectContent><SelectItem value="ph">🇵🇭 Philippines</SelectItem><SelectItem value="no">🇳🇴 Norway</SelectItem></SelectContent></Select>
              </F>
              <F label="Bank name"><Input readOnly defaultValue="" placeholder="e.g., BDO, BPI, Wells Fargo" /></F>
              <F label="Account holder"><Input readOnly defaultValue="" placeholder="Full name on the account" /></F>
              <F label="Account number"><Input readOnly defaultValue="" placeholder="Enter your account number" /></F>
              <F label="SWIFT / BIC"><Input readOnly defaultValue="" placeholder="For international payments" /></F>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox id="ack" />
              <label htmlFor="ack" className="text-sm leading-none">I confirm my bank details are correct and acknowledge the payment schedule</label>
            </div>
            <Button className="w-full" size="lg">Continue<ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
        </Screen>
      </div>

      {/* ── Completion ── */}
      <h3 style={eyebrow}>5 · Completion</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <Screen>
          <div className="p-6 flex justify-center">
            <div className="max-w-md w-full text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-6 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500/30"><CheckCircle2 className="h-16 w-16 text-green-600" /></div>
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Onboarding Complete! 🎉</h1>
                <p className="text-lg text-muted-foreground">Welcome to the team, Marcus!</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-sm text-blue-600"><span aria-hidden>💡</span> <strong>What's next?</strong> Check your email for your first day schedule. Your manager will reach out shortly to welcome you to the team!</p>
              </div>
              <Button className="w-full" size="lg">Go to My Dashboard</Button>
            </div>
          </div>
        </Screen>
      </div>

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["Screen", "Detail", "classes"]} w0={150} rows={[
        ["Welcome", "Sign in header + account-setup card (name/email/password) + Get Started", "bg-card/40 border-border/40 rounded-lg p-4 · Button w-full size=lg"],
        ["Personal Profile", "confirm details — name, email, phone, DOB, nationality, address, ID upload", "h3 text-lg font-semibold · fields space-y-4 · dashed upload"],
        ["Tax Details", "country of tax residency + tax number + income tax regime", "Command country picker · Input · Select · Continue + ArrowRight"],
        ["Bank Details", "bank country/name/holder/number/SWIFT + acknowledgement", "Select + Inputs · Checkbox acknowledgement · Continue + ArrowRight"],
        ["Completion", "green check + Onboarding Complete + what's-next + dashboard CTA", "rounded-full bg-gradient green-500/20 · h1 text-2xl · blue-500/10 notice"],
      ]} />
    </div>
  ),
};
