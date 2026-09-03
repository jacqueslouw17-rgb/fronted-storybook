import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Contract Workspace (verbatim from F1 Fronted admin, F1v6_ContractCreationScreen
 * inside F1v6_ContractDraftWorkspace). The "Review [name]'s Details" step: a centred header
 * with a worker progress indicator, then two collapsible sections — Personal Profile and
 * Working Engagement (with country-default term fields) — built from the Field molecule and
 * the Input / Select atoms, then Previous / Review Agreement actions.
 */
const meta: Meta = { title: "Patterns/Contract Workspace", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

/* ── Field molecule — verbatim (Label + control + hint/error) ── */
function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-foreground/75 flex items-center gap-1.5">{label}</Label>
      {children}
      {error ? <p className="text-destructive text-[11px] font-medium">{error}</p> : hint && <p className="text-muted-foreground text-[11px]">{hint}</p>}
    </div>
  );
}

/* ── Section card — verbatim SectionAccordion ── */
function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/30 bg-card/20 overflow-hidden transition-all">
      <button className="w-full flex items-center gap-3 px-4 py-3 text-left group transition-colors hover:bg-card/40 cursor-pointer">
        <div className="flex-1 min-w-0"><p className="text-sm font-medium text-foreground leading-tight">{title}</p></div>
        <ChevronDown className="h-4 w-4 text-muted-foreground/60 shrink-0 transition-transform duration-200 rotate-180" />
      </button>
      <div className="border-t border-border/20"><div className="p-4 pt-3 space-y-3">{children}</div></div>
    </div>
  );
}

/* ── Number + unit control — verbatim NumberFieldWithUnit ── */
function NumberUnit({ value, unit }: { value: string; unit: string }) {
  return (
    <div className="flex items-center gap-2">
      <Input readOnly defaultValue={value} className="flex-1 h-10" />
      <span className="inline-flex h-10 items-center text-xs font-medium text-muted-foreground bg-muted/50 px-2.5 rounded-md border border-border/40 whitespace-nowrap select-none">{unit}</span>
    </div>
  );
}

function Workspace() {
  return (
    <div className="w-[560px] max-w-full space-y-4">
      {/* AgentHeader — centred title + subtitle + worker progress */}
      <div className="flex flex-col items-center space-y-3 px-4">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Review Marcus's Details</h1>
          <p className="text-sm text-muted-foreground">Confirm the details below before generating contract documents.</p>
        </div>
        <div className="w-full max-w-xl px-4">
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm text-muted-foreground">Worker</span>
            <span className="text-lg font-bold text-foreground">1</span>
            <span className="text-sm text-muted-foreground">/ 3</span>
            <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden ml-1"><div className="h-full bg-primary rounded-full" style={{ width: "33%" }} /></div>
          </div>
        </div>
      </div>

      {/* Section 1 — Personal Profile */}
      <SectionCard title="Personal Profile">
        <Field label="Full Name"><Input readOnly defaultValue="Marcus Chen" placeholder="e.g., Marcus Chen" className="h-10" /></Field>
        <Field label="Email"><Input readOnly defaultValue="marcus.chen@example.com" className="h-10" /></Field>
        <Field label="Nationality">
          <button className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm"><span>Singaporean</span><ChevronDown className="h-4 w-4 opacity-50" /></button>
        </Field>
        <Field label="Address"><Input readOnly defaultValue="10 Marina Blvd, Singapore" className="h-10" /></Field>
        <Field label="ID Number"><Input readOnly defaultValue="S1234567D" className="h-10" /></Field>
      </SectionCard>

      {/* Section 2 — Working Engagement */}
      <SectionCard title="Working Engagement">
        <Field label="Role"><Input readOnly defaultValue="Senior Backend Engineer" className="h-10" /></Field>
        <Field label="Country">
          <button className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm"><span>🇸🇬 Singapore</span><ChevronDown className="h-4 w-4 opacity-50" /></button>
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Employment Type">
            <Select defaultValue="employee"><SelectTrigger className="h-10"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="employee">Employee</SelectItem><SelectItem value="contractor">Contractor</SelectItem></SelectContent></Select>
          </Field>
          <Field label="Start Date">
            <button className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm"><span>Feb 1, 2026</span></button>
          </Field>
        </div>
        <Field label="Monthly Salary">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium pointer-events-none select-none">SGD</span>
            <Input readOnly defaultValue="12,000" placeholder="5,000" className="h-10 pl-12" />
          </div>
        </Field>
        <Field label="Work Location"><Input readOnly defaultValue="Singapore" placeholder="e.g., Manila, Oslo" className="h-10" /></Field>

        {/* Country-default terms */}
        <div className="border-t border-border/40 pt-3 mt-1">
          <p className="text-[11px] text-muted-foreground mb-3">Country defaults for Singapore — adjust as negotiated</p>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Probation Period" hint="Max: 180 days"><NumberUnit value="180" unit="days" /></Field>
              <Field label="Notice Period" hint="Min: 30 days"><NumberUnit value="30" unit="days" /></Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Annual Leave" hint="Min: 7 days"><NumberUnit value="14" unit="days" /></Field>
              <Field label="Sick Leave" hint="Min: 14 days"><NumberUnit value="14" unit="days" /></Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Weekly Hours" hint="Max: 44 hrs"><NumberUnit value="40" unit="hours" /></Field>
              <Field label="Pay Frequency" hint="Fixed for Singapore">
                <Select defaultValue="monthly"><SelectTrigger className="h-10 opacity-60"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="monthly">Monthly</SelectItem><SelectItem value="fortnightly">Fortnightly</SelectItem></SelectContent></Select>
              </Field>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row justify-center gap-3 pt-2">
        <Button variant="outline" size="lg" className="px-8">Previous</Button>
        <Button size="lg">Review Agreement</Button>
      </div>
    </div>
  );
}

export const ContractWorkspace: Story = {
  name: "Contract Workspace",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Contract Workspace"
        lead={<>The contract review-and-draft step from the Fronted admin — “Review [name]'s Details”. A centred header with a worker progress indicator, then two collapsible sections (Personal Profile and Working Engagement, including country-default term fields), built from the Field molecule and the Input / Select atoms, closing on Previous / Review Agreement. Markup verbatim from F1v6_ContractCreationScreen.</>}
        meta="Verbatim from F1 · Contract draft workspace (fronted-admin-v6-1-clone)"
      />

      <h3 style={eyebrow}>Review details</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}><Workspace /></div>
      <p style={{ ...note, marginTop: 10 }}>Header items-center space-y-3 · title text-2xl font-bold · progress “Worker N / total” + bar · SectionCard (SectionAccordion) rounded-xl border-border/30 bg-card/20 · Field = Label text-xs font-medium text-foreground/75 + control + hint · country-default grid grid-cols-2 · NumberFieldWithUnit Input + unit chip · actions Previous (outline) + Review Agreement (primary lg).</p>

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={160} rows={[
        ["Header", "centred title + subtitle + Worker N/total progress", "flex-col items-center space-y-3 · h1 text-2xl font-bold · bar w-16 h-1.5"],
        ["Section", "Personal Profile / Working Engagement, collapsible", "rounded-xl border-border/30 bg-card/20 · body p-4 pt-3 space-y-3"],
        ["Field", "label + control + hint / error", "Label text-xs font-medium text-foreground/75 · error text-destructive text-[11px]"],
        ["Salary", "currency prefix + amount input", "relative · prefix absolute left-3 · Input pl-12"],
        ["Terms", "country-default probation/notice/leave/hours/frequency", "grid grid-cols-2 gap-3 · NumberFieldWithUnit + unit chip bg-muted/50"],
        ["Actions", "Previous (outline) + Review Agreement (primary)", "flex justify-center gap-3 · Button size=lg"],
      ]} />
    </div>
  ),
};
