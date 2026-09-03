import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Shield, CheckCircle2, AlertTriangle, FileText, ExternalLink, User, IndianRupee, CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Payroll Verification (verbatim from F1 Fronted admin,
 * F1v6_PayrollVerificationDrawer + F1v6_PayrollDataCollectionDrawer).
 * Before a worker with submitted payroll data moves to contract drafting, the admin ticks
 * through every item (identity, tax/statutory, payout destination) — a progress bar gates the
 * Approve action. Markup verbatim from the source (primary text uses text-emphasis per the
 * system's a11y swap).
 */
const meta: Meta = { title: "Patterns/Payroll Verification", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

/* ── Verification row — verbatim from F1v6_PayrollVerificationDrawer.VerificationRow ── */
function VerificationRow({
  label, value, verified, hasDocument, documentName, flagged, flagReason,
}: { label: string; value: string; verified: boolean; hasDocument?: boolean; documentName?: string; flagged?: boolean; flagReason?: string }) {
  return (
    <div className={cn(
      "flex items-start gap-3 p-3 rounded-lg border transition-all duration-200",
      verified ? "bg-accent-green-fill/5 border-accent-green-outline/20" :
      flagged ? "bg-accent-amber-fill/5 border-accent-amber-outline/30" :
      "bg-muted/20 border-border/40"
    )}>
      <Checkbox checked={verified} className="mt-0.5 h-4 w-4" />
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
          {verified && <CheckCircle2 className="h-3 w-3 text-accent-green-text" />}
          {flagged && !verified && <AlertTriangle className="h-3 w-3 text-accent-amber-text" />}
        </div>
        <p className="text-sm font-medium text-foreground">{value}</p>
        {hasDocument && documentName && (
          <button className="flex items-center gap-1.5 text-xs text-emphasis hover:text-emphasis/80 transition-colors mt-1">
            <FileText className="h-3 w-3" />
            <span className="underline underline-offset-2">{documentName}</span>
            <ExternalLink className="h-2.5 w-2.5" />
          </button>
        )}
        {flagged && flagReason && !verified && (
          <p className="text-[10px] text-accent-amber-text mt-1">{flagReason}</p>
        )}
      </div>
    </div>
  );
}

/* ── Section card — mirrors the SectionAccordion header + rows ── */
function SectionCard({ title, icon: Icon, verified, children }: { title: string; icon: React.ElementType; verified?: boolean; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border/40 bg-card/40 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground flex-1">{title}</span>
        {verified && (
          <Badge className="text-[10px] px-2 py-0 h-4 font-normal bg-accent-green-text/15 text-accent-green-text border-0">
            <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" /> Verified
          </Badge>
        )}
      </div>
      <div className="px-4 pb-4 space-y-2">{children}</div>
    </div>
  );
}

/* ── Verification drawer — verbatim header + body from F1v6_PayrollVerificationDrawer ── */
function VerificationDrawer() {
  const verifiedCount = 3;
  const totalCount = 8;
  const progress = Math.round((verifiedCount / totalCount) * 100);
  return (
    <div className="w-full sm:w-[520px] rounded-lg border border-border bg-background overflow-hidden shadow-overlay">
      {/* Header */}
      <div className="bg-background border-b border-border/60">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-accent-amber-fill/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-accent-amber-text" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-base font-semibold">Review &amp; Verify Submission</div>
              <p className="text-xs text-muted-foreground mt-0.5">🇮🇳 Priya Nair · Senior Engineer</p>
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="px-6 pb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">Verification progress</span>
            <span className="text-xs font-medium text-foreground">{verifiedCount}/{totalCount} verified</span>
          </div>
          <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500 bg-primary" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Status banner */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-accent-amber-fill/10 border border-accent-amber-outline/20">
          <AlertTriangle className="h-4 w-4 text-accent-amber-text shrink-0" />
          <div>
            <p className="text-xs font-medium text-foreground">Payroll data included — admin verification required</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Worker submitted personal details + payroll info. Verify all items before proceeding to contract.</p>
          </div>
        </div>

        <SectionCard title="Personal Information" icon={User} verified>
          <VerificationRow label="Full Name & Contact" value="Priya Nair · submitted email & phone" verified />
          <VerificationRow label="Aadhaar / PAN Card" value="Aadhaar XXXX-XXXX-4532 · PAN ABCDE1234F" verified hasDocument documentName="aadhaar_pan_scan.pdf" />
        </SectionCard>

        <SectionCard title="Tax & Compliance" icon={IndianRupee}>
          <VerificationRow label="PAN Number" value="ABCDE1234F — Verified via NSDL" verified hasDocument documentName="pan_card.pdf" />
          <VerificationRow label="Income Tax Regime" value="Old Regime — deductions claimed below" verified={false} flagged flagReason="Old regime selected — all investment proofs must be verified" />
        </SectionCard>

        <SectionCard title="Payout Destination" icon={CreditCard}>
          <VerificationRow label="Bank Account" value="HDFC Bank · IFSC: HDFC0001234 · A/C: XXXX4567" verified={false} hasDocument documentName="bank_statement.pdf" />
        </SectionCard>
      </div>

      {/* Footer */}
      <div className="p-4">
        <Button disabled className="w-full gap-2" size="lg">
          <Shield className="h-4 w-4" />Verify all items to proceed ({verifiedCount}/{totalCount})
        </Button>
        <p className="text-[10px] text-muted-foreground text-center mt-2">All items must be verified before the worker can proceed to contract drafting</p>
      </div>
    </div>
  );
}

export const PayrollVerification: Story = {
  name: "Payroll Verification",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Payroll Verification"
        lead={<>Before a worker who submitted payroll data can move to contract drafting, the admin verifies every collected item. A Shield header with a live progress bar sits above grouped sections (Personal Information, Tax & Compliance, Payout Destination), each a checklist of rows that can be verified, flagged, or linked to an uploaded document. The Approve action stays disabled until every item is ticked. Markup verbatim from F1v6_PayrollVerificationDrawer + F1v6_PayrollDataCollectionDrawer.</>}
        meta="Verbatim from F1 · Verification + data collection drawers (fronted-admin-v6-1-clone)"
      />

      <h3 style={eyebrow}>Verification drawer</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}><VerificationDrawer /></div>
      <p style={{ ...note, marginTop: 10 }}>Sheet w-[520px] p-0 · sticky header: amber Shield tile + "Review & Verify Submission" + worker line, then a progress bar (bg-primary fill, turns accent-green when complete). Body: amber status banner, then SectionCards (icon + title + optional Verified badge) each holding VerificationRows. Footer: full-width gated Approve button.</p>

      <h3 style={eyebrow}>Verification row states</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 460 }}>
        <VerificationRow label="Full Name & Contact" value="Priya Nair · submitted email & phone" verified />
        <VerificationRow label="Section 80C — Investments" value="₹1,50,000 (ELSS + PPF + Life Insurance)" verified={false} hasDocument documentName="80C_investment_proof.pdf" />
        <VerificationRow label="HRA Exemption" value="₹18,000/month — Rent receipts provided" verified={false} flagged flagReason="Landlord PAN not provided — verify if rent > ₹1L/year" />
      </div>
      <p style={{ ...note, marginTop: 10 }}>Verified = bg-accent-green-fill/5 border-accent-green-outline/20 + green check. Flagged = bg-accent-amber-fill/5 border-accent-amber-outline/30 + amber triangle + a [10px] reason line. Default = bg-muted/20 border-border/40. Rows with a document show a linked filename (text-emphasis) with FileText + ExternalLink.</p>

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={160} rows={[
        ["Header", "amber Shield tile + title + worker line", "px-6 py-4 · h-10 tile bg-accent-amber-fill/20"],
        ["Progress", "label + N/total + track", "h-1.5 bg-muted/40 · fill bg-primary (→ accent-green when complete)"],
        ["Status banner", "verification-required notice", "p-3 rounded-lg bg-accent-amber-fill/10 border-accent-amber-outline/20"],
        ["Section", "icon + title + Verified badge + rows", "SectionAccordion header + space-y-2 rows"],
        ["Row", "checkbox + label + value + doc/flag", "p-3 rounded-lg border · state-driven tint"],
        ["Footer", "gated Approve button + helper", "Button w-full size-lg disabled until all verified"],
      ]} />
    </div>
  ),
};
