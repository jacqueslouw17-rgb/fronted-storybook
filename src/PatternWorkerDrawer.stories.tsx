import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChevronDown, Lock, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Worker Drawer (verbatim from the LIVE F1 Fronted admin, fronted-admin-v6-1-clone).
 * The single right-side worker drawer used across the whole hiring pipeline. It is ONE pattern
 * with a read-only and an edit mode. Its section cards — Personal Information, Working Engagement,
 * Payment Information, Emergency Contact, Documents — carry the standardised field set (structured
 * name + structured address + structured ID) and unlock progressively as the worker moves through
 * the pipeline: Personal + Engagement are populated early, while Payment Information / Emergency
 * Contact / Documents read “Collected during Onboarding” until onboarding completes. Markup and
 * fields captured verbatim from the live DOM.
 */
const meta: Meta = { title: "Patterns/Worker Drawer", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

/* ── Section card — verbatim SectionAccordion ── */
function SectionCard({ title, badge, open, children }: { title: string; badge?: React.ReactNode; open?: boolean; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/30 bg-card/20 overflow-hidden transition-all">
      <button className="w-full flex items-center gap-3 px-4 py-3 text-left group transition-colors hover:bg-card/40 cursor-pointer">
        <div className="flex-1 min-w-0"><p className="text-sm font-medium text-foreground leading-tight">{title}</p></div>
        {badge}
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground/60 shrink-0 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && <div className="border-t border-border/20"><div className="p-4 pt-3 space-y-3">{children}</div></div>}
    </div>
  );
}

/* ── Locked section row — verbatim LockedSectionRow (default subtext “Collected during Onboarding”) ── */
function LockedSectionRow({ title, subtext = "Onboarding" }: { title: string; subtext?: string }) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/20 px-5 py-3 opacity-60">
      <div className="flex items-center gap-2">
        <Lock className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
        <h3 className="text-sm font-medium text-muted-foreground leading-tight">{title}</h3>
      </div>
      <p className="text-[11px] text-muted-foreground/70 mt-1 ml-[22px]">Collected during <span className="font-medium">{subtext}</span></p>
    </div>
  );
}

/* ── Read-only detail row — verbatim DetailRow ── */
function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="group flex items-start justify-between gap-4 -mx-2 px-2 py-1.5 rounded-md hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="text-sm text-muted-foreground truncate">{label}</span>
        <button type="button" aria-label={`More info about ${label}`} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"><Info className="h-3 w-3" /></button>
      </div>
      <span className="text-sm font-medium text-foreground text-right">{value || "—"}</span>
    </div>
  );
}

/* ── Editable field — verbatim DetailRow (edit mode) ── */
function EditRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5 py-1.5">
      <Label className="text-xs font-medium text-foreground/75">{label}</Label>
      <Input readOnly defaultValue={value} className="h-10" />
    </div>
  );
}

/* ── Document row — verbatim DocumentRow (name + filename + View; no per-row status badge) ── */
function DocumentRow({ name, fileName }: { name: string; fileName: string }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border border-border/40 bg-card/30 w-full">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">{name}</p>
          <p className="text-[11px] text-muted-foreground">{fileName}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button type="button" aria-label={`Open ${name}`} className="text-[11px] font-medium text-foreground/80 transition-colors hover:text-foreground hover:underline">View</button>
        </div>
      </div>
    </div>
  );
}

/* ── Verbatim data — employee (Maria Santos, PH, Payroll ready) ── */
type FieldRow = [string, string];
const EMPLOYEE = {
  name: "Maria Santos", flag: "🇵🇭", subtitle: "Employee · Full-Stack Developer",
  personal: [
    ["First name", "Maria"], ["Middle name(s)", "Reyes"], ["Last name", "Santos"],
    ["Date of birth", "Mar 3, 1984"], ["Nationality", "Filipino"],
    ["Personal email", "maria.santos@example.com"], ["Mobile number", "+63 905090098"],
    ["Address line 1", "148 Salcedo Street"], ["Address line 2", "Unit 12B, Legazpi Village"],
    ["City", "Makati"], ["Region", "National Capital Region (NCR)"],
    ["Municipality", "Makati"], ["Municipality code", "137602"], ["Postal code", "1229"], ["Country", "Philippines"],
    ["Document type", "National ID (PhilSys)"], ["Document number", "1234-5678-9012-3456"],
    ["Issuing country", "Philippines"], ["Expiry date", "Aug 3, 2033"],
  ] as FieldRow[],
  engagement: [
    ["Worker type", "Employee (EOR)"], ["Role", "Full-Stack Developer"], ["Country", "🇵🇭 Philippines"],
    ["Start date", "Feb 1, 2026"], ["Work location", "Philippines"], ["Monthly salary", "PHP 95,000/mo"],
  ] as FieldRow[],
  payment: [
    ["Account holder name", "Maria Santos"], ["Bank name", "BDO Unibank"], ["Account number", "••••7890"],
    ["SWIFT code", "BNORPHMM"], ["Bank address", "Makati, Philippines"], ["Account country", "Philippines"], ["Account currency", "PHP"],
  ] as FieldRow[],
  emergency: [["Name", "Ana Santos"], ["Relationship", "Sibling"], ["Contact number", "+63 707839494"]] as FieldRow[],
  documents: [
    ["Employment agreement", "Maria_Santos_Agreement_Signed.pdf"], ["Identity document", "Maria_ID_doc.pdf"],
    ["Proof of address", "Maria_Proof_of_Address.pdf"], ["Tax form", "Maria_Tax_Form.pdf"],
  ] as FieldRow[],
};

/* ── Verbatim data — contractor (Marcus Chen, SG, pre-onboarding) ── */
const CONTRACTOR = {
  name: "Marcus Chen", flag: "🇸🇬", subtitle: "Contractor · Senior Backend Engineer",
  personal: [
    ["First name", "Marcus"], ["Last name", "Chen"],
    ["Date of birth", "Dec 12, 1993"], ["Nationality", "Singaporean"],
    ["Personal email", "marcus.chen@example.com"], ["Mobile number", "+65 900948451"],
    ["Address line 1", "18 Cross Street"], ["Address line 2", "#12-01 China Square Central"],
    ["City", "Singapore"], ["Region", "Central Region"], ["Postal code", "048423"], ["Country", "Singapore"],
    ["Document type", "NRIC"], ["Document number", "S8412345D"], ["Issuing country", "Singapore"], ["Expiry date", "May 12, 2032"],
  ] as FieldRow[],
  engagement: [
    ["Worker type", "Contractor (COR)"], ["Role", "Senior Backend Engineer"], ["Country", "🇸🇬 Singapore"],
    ["Start date", "Feb 1, 2026"], ["Work location", "Singapore"], ["Monthly fee", "SGD 12,000/mo"],
  ] as FieldRow[],
};

function rows(list: FieldRow[], edit: boolean) {
  return <div className="space-y-0.5">{list.map(([l, v]) => edit ? <EditRow key={l} label={l} value={v} /> : <DetailRow key={l} label={l} value={v} />)}</div>;
}

/* ── The single Worker Drawer ── */
function WorkerDrawer({ variant, edit = false }: { variant: "employee-full" | "contractor-pre"; edit?: boolean }) {
  const D = variant === "employee-full" ? EMPLOYEE : CONTRACTOR;
  const full = variant === "employee-full";
  const active = full && !edit;
  return (
    <div className="w-[520px] max-w-full rounded-lg border border-border bg-background overflow-hidden shadow-overlay flex flex-col">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-border/30 shrink-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-foreground leading-tight truncate">{D.name}</span>
            <span className="text-base shrink-0">{D.flag}</span>
            {active && <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 bg-accent-green-fill/10 text-accent-green-text border-accent-green-outline/20">Active</span>}
          </div>
          <p className="text-[11px] text-muted-foreground/60 mt-0.5">{D.subtitle}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-6 pb-6 pt-3 space-y-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground/60">Worker details</p>
          <div className="space-y-3">
            {/* Personal Information */}
            <SectionCard title="Personal Information" open>{rows(D.personal, edit)}</SectionCard>

            {/* Working Engagement */}
            <SectionCard title="Working Engagement" open>{rows(D.engagement, edit)}</SectionCard>

            {/* Payment Information */}
            {full ? (
              <SectionCard title="Payment Information" open>{rows(EMPLOYEE.payment, edit)}</SectionCard>
            ) : <LockedSectionRow title="Payment Information" />}

            {/* Emergency Contact — appears once populated (post-onboarding) */}
            {full && <SectionCard title="Emergency Contact" open>{rows(EMPLOYEE.emergency, edit)}</SectionCard>}

            {/* Documents */}
            {full ? (
              <SectionCard title="Documents" open badge={!edit ? <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-accent-green-fill/10 text-accent-green-text border-accent-green-outline/20">Verified</Badge> : undefined}>
                <div className="space-y-2">{EMPLOYEE.documents.map(([n, f]) => <DocumentRow key={n} name={n} fileName={f} />)}</div>
              </SectionCard>
            ) : <LockedSectionRow title="Documents" />}

            {edit && (
              <div className="pt-3"><div className="flex gap-2">
                <Button variant="outline" className="flex-1">Cancel</Button>
                <Button className="flex-1 bg-gradient-primary hover:opacity-90">Save changes</Button>
              </div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const WorkerDrawerPattern: Story = {
  name: "Worker Drawer",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Worker Drawer"
        lead={<>The one worker drawer used across the whole hiring pipeline, with a <strong>read-only</strong> and an <strong>edit</strong> mode. Section cards — Personal Information, Working Engagement, Payment Information, Emergency Contact, Documents — carry the standardised field set: structured name (First / Middle / Last), structured address, and structured ID. Payment Information, Emergency Contact and Documents read “Collected during Onboarding” until onboarding completes; at Payroll ready every section is populated. Markup and fields captured verbatim from the live fronted-admin-v6-1 drawer.</>}
        meta="Verbatim from live F1 · Worker drawer (fronted-admin-v6-1-clone)"
      />

      <h3 style={eyebrow}>Read-only — all sections unlocked (Payroll ready · employee)</h3>
      <p style={{ ...note, marginBottom: 14 }}>Sheet w-[520px] · header px-5 pt-4 pb-3 border-b (name + flag + Active badge + “Employee · Role”) · “Worker details” label · sections space-y-3. Structured name, structured address (Municipality + Municipality code shown where the country provides them — e.g. PH), structured ID, plus Payment Information + Emergency Contact + Documents (name · filename · View).</p>
      <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}><WorkerDrawer variant="employee-full" /></div>

      <h3 style={eyebrow}>Read-only — pre-onboarding (contractor)</h3>
      <p style={{ ...note, marginBottom: 10 }}>Before onboarding completes, Personal Information + Working Engagement are populated; Payment Information and Documents show the muted “Collected during Onboarding” locked row, and Emergency Contact is not yet rendered. Contractor engagement uses <strong>Monthly fee</strong> (COR) instead of Monthly salary, and Singapore’s address omits Municipality / Municipality code.</p>
      <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}><WorkerDrawer variant="contractor-pre" /></div>

      <h3 style={eyebrow}>Edit mode</h3>
      <p style={{ ...note, marginBottom: 10 }}>Same drawer at Payroll ready with values swapped for fields (Label + Input) and a Cancel / Save changes footer (bg-gradient-primary). No Active or Verified badge in edit.</p>
      <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}><WorkerDrawer variant="employee-full" edit /></div>

      <h3 style={eyebrow}>Section → fields</h3>
      <DocTable head={["Section", "Fields (live)", "notes"]} w0={170} rows={[
        ["Personal Information", "First name · Middle name(s) · Last name · Date of birth · Nationality · Personal email · Mobile number · Address line 1 · Address line 2 · City · Region · Municipality · Municipality code · Postal code · Country · Document type · Document number · Issuing country · Expiry date", "Structured name (Middle omitted when empty), structured address (Municipality + code only where the country provides them), structured ID"],
        ["Working Engagement", "Worker type · Role · Country · Start date · Work location · Monthly salary / Monthly fee", "Employee → Monthly salary; Contractor → Monthly fee (never both). No contract-terms sub-block."],
        ["Payment Information", "Account holder name · Bank name · Account number · SWIFT code · Bank address · Account country · Account currency", "Account number masked (••••7890). Locked “Collected during Onboarding” pre-onboarding."],
        ["Emergency Contact", "Name · Relationship · Contact number", "Appears once populated (post-onboarding)."],
        ["Documents", "Employment agreement · Identity document · Proof of address · Tax form", "Row = name + filename + View (no per-row status badge). Section header keeps a Verified badge."],
      ]} />

      <h3 style={eyebrow}>Section availability by stage</h3>
      <DocTable head={["Section", "Populated at", "Before"]} w0={180} rows={[
        ["Personal Information", "Offer / worker submits details", "—"],
        ["Working Engagement", "Offer / worker submits details", "—"],
        ["Payment Information", "Onboarding complete", "Locked row · “Collected during Onboarding”"],
        ["Emergency Contact", "Onboarding complete", "Not rendered until populated"],
        ["Documents", "Onboarding complete", "Locked row · “Collected during Onboarding”"],
      ]} />

      <h3 style={eyebrow}>Field masking (per the standardised parameter spec)</h3>
      <DocTable head={["Masking", "Fields", "Behaviour"]} w0={120} rows={[
        ["None", "Name · Role · Country · Worker type · Start date · Work location", "Visible to all roles"],
        ["Personal", "Email · Mobile · Address · Payment Information · Emergency Contact", "Masked unless the viewer holds “unmask personal information”"],
        ["Sensitive", "Date of birth · Nationality · Document number · Document · Account number", "Masked unless the viewer holds “unmask sensitive personal information”"],
      ]} />

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={150} rows={[
        ["Header", "name + flag + Active badge (Payroll ready) + subtitle", "px-5 pt-4 pb-3 border-b border-border/30 · badge bg-accent-green-fill/10"],
        ["Section card", "collapsible label/value rows; edit forces open", "rounded-xl border-border/30 bg-card/20 · header px-4 py-3 + ChevronDown"],
        ["Locked section", "muted row with lock + “Collected during Onboarding”", "rounded-xl border-border/40 bg-card/20 opacity-60 · Lock h-3.5"],
        ["Detail row", "muted label + info-on-hover / right-aligned value", "group -mx-2 px-2 py-1.5 hover:bg-muted/50 · value text-foreground"],
        ["Document row", "name + filename + View (no status badge)", "rounded-lg border-border/40 bg-card/30 · View text-[11px]"],
        ["Edit footer", "Cancel + Save changes", "flex gap-2 · Save bg-gradient-primary hover:opacity-90"],
      ]} />
    </div>
  ),
};
