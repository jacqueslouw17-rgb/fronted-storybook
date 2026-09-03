import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChevronDown, X, User, Sparkles, MapPin, Upload, FileText, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Worker Drawers (verbatim from F1 Fronted admin).
 * The three right-side worker-creation drawers, each a header + scrollable form body of
 * section cards + a docked footer. Add Candidate (F1v6_AddCandidateDrawer, ATS source +
 * progressive disclosure), Manual Worker (F1v6_ManualWorkerDrawer, 5 sections + document
 * uploads), and Onboarding Form (F1v6_OnboardingFormDrawer, "Configure & Send"). Markup
 * verbatim from source (primary text uses text-emphasis per the system's a11y swap).
 */
const meta: Meta = { title: "Patterns/Worker Drawers", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

/* ── Shared static primitives (SectionAccordion / Field not in the UI kit) ── */
function SectionCard({ title, badge, defaultOpen = true, children }: { title: string; badge?: React.ReactNode; defaultOpen?: boolean; children?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-sm font-medium text-foreground leading-tight truncate">{title}</h3>
          {badge}
        </div>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform shrink-0", defaultOpen && "rotate-180")} />
      </div>
      {defaultOpen && children && <div className="px-4 pb-4 space-y-3">{children}</div>}
    </div>
  );
}

function Field({ label, optional, hint, children }: { label: string; optional?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-foreground/75 flex items-center gap-1.5">
        {label}
        {optional && <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4 font-normal">Optional</Badge>}
      </Label>
      {children}
      {hint && <p className="text-muted-foreground text-[11px]">{hint}</p>}
    </div>
  );
}

/* ── 1) Add Candidate drawer (F1v6_AddCandidateDrawer) ── */
function AddCandidateDrawer() {
  return (
    <div className="w-[560px] max-w-full rounded-lg border border-border bg-background overflow-hidden shadow-overlay flex flex-col">
      {/* Sticky header */}
      <div className="shrink-0 bg-background/95 backdrop-blur-sm border-b border-border/50 px-5 py-4">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-foreground">Add Worker</span>
          <button className="rounded-sm opacity-70 transition-opacity hover:opacity-100"><X className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-3 space-y-3">
        {/* Candidate source select */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between h-10 rounded-xl px-5 border border-input bg-background text-sm">
            <span className="flex items-center gap-2">
              <span>🇵🇭</span>
              <span className="font-medium text-foreground">Maria Santos</span>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 ml-1"><Sparkles className="h-2.5 w-2.5 mr-0.5" />ATS</Badge>
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </div>

        {/* Section 1: Personal Profile */}
        <SectionCard title="Personal Profile">
          <Field label="Full Name"><Input value="Maria Santos" readOnly className="h-10" /></Field>
          <Field label="Email"><Input value="maria.santos@email.com" readOnly className="h-10" /></Field>
          <Field label="Nationality"><Input value="Filipino" readOnly className="h-10" /></Field>
          <Field label="Address"><Input placeholder="Residential address" readOnly className="h-10" /></Field>
        </SectionCard>

        {/* Section 2: Working Engagement */}
        <SectionCard title="Working Engagement" defaultOpen={false} badge={<Badge variant="outline" className="text-xs font-medium gap-1">🇵🇭 Philippines</Badge>}>
          {/* Empty-state before country pick */}
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-12 w-12 rounded-full bg-muted/40 flex items-center justify-center mb-3">
              <MapPin className="h-5 w-5 text-muted-foreground/60" />
            </div>
            <p className="text-sm text-muted-foreground/70 max-w-[220px]">Contract fields will appear once you select a country above</p>
          </div>
        </SectionCard>
      </div>

      {/* Docked footer */}
      <div className="shrink-0 px-6 py-3 bg-background border-t border-border/40 flex gap-3">
        <Button variant="outline" className="flex-1 h-11">Cancel</Button>
        <Button className="flex-1 h-11">Save Worker</Button>
      </div>
    </div>
  );
}

/* ── 2) Manual Worker drawer (F1v6_ManualWorkerDrawer) ── */
function ManualWorkerDrawer() {
  return (
    <div className="w-[576px] max-w-full rounded-lg border border-border bg-background overflow-hidden shadow-overlay flex flex-col">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-border/30 shrink-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-foreground leading-tight truncate">Juan Dela Cruz</span>
            <span className="text-base shrink-0">🇵🇭</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-[11px] text-muted-foreground/60">Add directly to Done</p>
            <Badge className="text-[9px] px-1.5 py-0 h-4 bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">Inactive</Badge>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1.5">For workers already running payroll externally. Fill all sections, upload signed contracts, and save.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
        {/* 1) Personal Profile */}
        <SectionCard title="Personal Profile">
          <Field label="Full Name"><Input value="Juan Dela Cruz" readOnly className="h-10" /></Field>
          <Field label="Email"><Input value="juan@email.com" readOnly className="h-10" /></Field>
          <Field label="Phone" optional><Input placeholder="+63 917 123 4567" readOnly className="h-10" /></Field>
        </SectionCard>

        {/* 2) Working Engagement (collapsed) */}
        <SectionCard title="Working Engagement" defaultOpen={false} />
        {/* 3) Payroll Parameters (collapsed) */}
        <SectionCard title="Payroll Parameters" defaultOpen={false} />
        {/* 4) Payout Destination (collapsed) */}
        <SectionCard title="Payout Destination" defaultOpen={false} />

        {/* 5) Documents */}
        <SectionCard title="Documents" badge={<Badge variant="secondary" className="text-[10px] px-2 py-0 h-4 font-normal">1/2 required</Badge>}>
          <p className="text-[11px] text-muted-foreground/80">PDF, JPG or PNG · up to 10MB each</p>

          {/* Signed contract — uploaded */}
          <div className="rounded-lg border p-3 transition-colors border-border/40 bg-card/30 hover:bg-muted/40">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-medium text-foreground truncate">Signed contract</p>
              <Badge variant="outline" className="text-[9px] px-1 py-0 h-3.5 border-amber-500/30 text-amber-600 shrink-0 pointer-events-none">Required</Badge>
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <FileText className="h-3 w-3 text-primary/70" />
              <span className="text-[11px] text-muted-foreground truncate">Juan_Contract_Signed.pdf</span>
              <button className="text-muted-foreground/50 hover:text-destructive transition-colors"><X className="h-3 w-3" /></button>
            </div>
          </div>

          {/* ID document — empty required */}
          <div className="rounded-lg border p-3 transition-colors border-amber-500/30 bg-amber-500/5 cursor-pointer hover:bg-amber-500/10">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-medium text-foreground truncate">ID document</p>
              <Badge variant="outline" className="text-[9px] px-1 py-0 h-3.5 border-amber-500/30 text-amber-600 shrink-0 pointer-events-none">Required</Badge>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-emphasis"><Upload className="h-3 w-3" />Upload ID document</div>
          </div>

          {/* Additional supporting — optional */}
          <div className="rounded-lg border border-border/40 bg-card/30 p-3 cursor-pointer hover:bg-muted/40">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-medium text-foreground truncate">Additional Supporting documents</p>
              <Badge variant="secondary" className="text-[9px] px-1 py-0 h-3.5 shrink-0">Optional</Badge>
            </div>
            <p className="text-[11px] text-muted-foreground/70 mt-0.5">Tax, social security or any other supporting files</p>
            <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-emphasis"><Upload className="h-3 w-3" />Upload additional files</div>
          </div>
        </SectionCard>

        {/* Validation summary */}
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
          <p className="text-[11px] text-amber-700 font-medium mb-1">Before saving:</p>
          <ul className="text-[11px] text-amber-600 space-y-0.5 list-disc list-inside">
            <li>Upload ID document</li>
          </ul>
        </div>
      </div>

      {/* Docked footer */}
      <div className="shrink-0 px-5 py-3 bg-background border-t border-border/40">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">Cancel</Button>
          <Button className="flex-1">Add</Button>
        </div>
      </div>
    </div>
  );
}

/* ── 3) Onboarding Form drawer (F1v6_OnboardingFormDrawer, Configure & Send) ── */
function OnboardingFormDrawer() {
  return (
    <div className="w-[576px] max-w-full rounded-lg border border-border bg-background overflow-hidden shadow-overlay flex flex-col">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-border/30 shrink-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-foreground leading-tight truncate">Sarah Chen</span>
            <span className="text-base shrink-0">🇸🇪</span>
          </div>
          <p className="text-[11px] text-muted-foreground/60 mt-0.5">UX Designer · Data Collection</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
        {/* Section 1: Personal Profile */}
        <SectionCard title="Personal Profile">
          <Field label="Full Name"><Input value="Sarah Chen" disabled className="bg-muted/50 h-10" /></Field>
          <Field label="Email"><Input value="sarah.chen@email.com" disabled className="bg-muted/50 h-10" /></Field>
          <Field label="Nationality" optional><Input placeholder="Select nationality" readOnly className="h-10" /></Field>
          <Field label="ID Number" optional><Input placeholder="National ID / Government ID" readOnly className="h-10" /></Field>
        </SectionCard>

        {/* Section 2: Working Engagement (with AI employment suggestion) */}
        <SectionCard title="Working Engagement">
          <Field label="Role"><Input value="UX Designer" disabled className="bg-muted/50 h-10" /></Field>
          <Field label="Country"><Input value="Sweden" readOnly className="h-10" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Employment Type">
              <div className="space-y-3">
                <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <Bot className="h-4 w-4 text-emphasis flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">Based on Sweden hiring model, I suggest: <span className="font-semibold text-foreground">Contractor</span></p>
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="default" size="sm" className="flex-1">✅ Contractor</Button>
                  <Button type="button" variant="outline" size="sm" className="flex-1">💼 Employee</Button>
                </div>
              </div>
            </Field>
            <Field label="Start Date"><Input placeholder="Pick a date" readOnly className="h-10" /></Field>
          </div>
          <Field label="Monthly Fee"><Input placeholder="5,000" readOnly className="h-10 pl-12" /></Field>
        </SectionCard>
      </div>

      {/* Sticky action buttons (in-flow at bottom) */}
      <div className="shrink-0 px-5 py-3 bg-background border-t border-border/40">
        <div className="flex gap-3">
          <Button type="button" variant="outline" className="flex-1">Save Changes</Button>
          <Button type="button" className="flex-1">Send Form</Button>
        </div>
      </div>
    </div>
  );
}

export const WorkerDrawers: Story = {
  name: "Worker Drawers",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Worker Drawers"
        lead={<>The three right-side worker-creation drawers from the Fronted admin. Each is a header + a scrollable body of collapsible section cards + a docked footer. Add Worker (ATS source select with progressive disclosure), Add Worker Manually (five sections plus required document uploads and a validation summary), and the "Configure & Send" onboarding form (Personal Profile + Working Engagement with an AI employment suggestion). Structure verbatim from F1v6_AddCandidateDrawer, F1v6_ManualWorkerDrawer and F1v6_OnboardingFormDrawer.</>}
        meta="Verbatim from F1 · Worker creation drawers (fronted-admin-v6-1-clone)"
      />

      <h3 style={eyebrow}>Add Worker drawer</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}><AddCandidateDrawer /></div>
      <p style={{ ...note, marginTop: 10 }}>Sticky header (Add Worker + close X) · ATS/manual source select (rounded-xl px-5 h-10) · Personal Profile + Working Engagement section cards · Working Engagement shows a MapPin empty-state until a country is picked · docked footer Cancel / Save Worker (h-11).</p>

      <h3 style={eyebrow}>Add Worker Manually drawer</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}><ManualWorkerDrawer /></div>
      <p style={{ ...note, marginTop: 10 }}>Header with status badge + helper copy · five section cards (Personal, Engagement, Payroll, Payout, Documents) · Documents = uploaded / required (amber) / optional upload rows + "N/2 required" badge · amber validation summary · docked footer Cancel / Add.</p>

      <h3 style={eyebrow}>Configure &amp; Send (Onboarding Form) drawer</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}><OnboardingFormDrawer /></div>
      <p style={{ ...note, marginTop: 10 }}>Header (name + flag · role · Data Collection) · Personal Profile (ATS fields disabled bg-muted/50) · Working Engagement with a Bot-icon AI employment suggestion (bg-primary/5 border-primary/10) + Contractor/Employee toggle · docked footer Save Changes / Send Form.</p>

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={160} rows={[
        ["Drawer shell", "Right sheet, flex column, p-0", "sm:max-w-[560px] / sm:max-w-xl · flex flex-col overflow-hidden"],
        ["Header", "Add Worker: sticky title + X; Manual/Onboarding: name + flag + subtitle", "px-5 py-4 border-b · or px-5 pt-4 pb-3 border-b border-border/30"],
        ["Body", "Scrollable stack of section cards", "flex-1 overflow-y-auto px-5/px-6 py-3 space-y-3"],
        ["Section card", "Collapsible titled group (SectionAccordion)", "rounded-xl border-border/60 bg-card/50 · ChevronDown"],
        ["Field", "Label (+ Optional badge) over control", "space-y-1.5 · Label text-xs text-foreground/75 · Input h-10"],
        ["Empty state", "Country-gated fields placeholder (Add Worker)", "py-8 text-center · MapPin in bg-muted/40 circle"],
        ["Upload row", "Required (amber) / uploaded / optional document", "rounded-lg border-amber-500/30 bg-amber-500/5 · or border-border/40 bg-card/30"],
        ["Validation", "Amber 'Before saving' checklist (Manual)", "rounded-lg border-amber-500/20 bg-amber-500/5 · list-disc"],
        ["Footer", "Docked Cancel + primary action", "shrink-0 px-5 py-3 border-t border-border/40 · flex gap-3"],
      ]} />
    </div>
  ),
};
