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
 * Patterns — Worker Drawer (verbatim from F1 Fronted admin, F1v6_DoneWorkerDetailDrawer).
 * The single right-side worker drawer used across the whole hiring pipeline. It is ONE
 * pattern with a read-only and an edit mode; its five section cards (Personal Profile,
 * Working Engagement, Payroll Parameters, Payout Destination, Documents) unlock
 * progressively as the worker moves through the seven pipeline stages — locked sections
 * become a muted "Collected during …" row. Markup verbatim from source (primary text uses
 * text-emphasis per the system's a11y swap).
 */
const meta: Meta = { title: "Patterns/Worker Drawer", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

/* ── Pipeline stages (the seven kanban columns) → drawer access ── */
type Stage =
  | "offer"            // Offer Accepted
  | "data-pending"     // Awaiting worker details
  | "drafting"         // Prepare Contract
  | "awaiting-signature" // Waiting for Signature
  | "trigger-onboarding" // Onboard Worker
  | "onboarding-pending" // Awaiting onboarding
  | "certified";       // Payroll ready

const STAGE_ORDER: Stage[] = ["offer", "data-pending", "drafting", "awaiting-signature", "trigger-onboarding", "onboarding-pending", "certified"];
const STAGE_LABEL: Record<Stage, string> = {
  "offer": "Offer Accepted",
  "data-pending": "Awaiting worker details",
  "drafting": "Prepare Contract",
  "awaiting-signature": "Waiting for Signature",
  "trigger-onboarding": "Onboard Worker",
  "onboarding-pending": "Awaiting onboarding",
  "certified": "Payroll ready",
};
// The stage at which each section first unlocks (verbatim from source SECTION_UNLOCKED_AT).
type SectionKey = "personal" | "engagement" | "payroll" | "payout" | "documents";
const SECTION_UNLOCKED_AT: Record<SectionKey, Stage> = {
  personal: "offer",
  engagement: "offer",
  payroll: "certified",
  payout: "certified",
  documents: "onboarding-pending",
};
const at = (stage: Stage, min: Stage) => STAGE_ORDER.indexOf(stage) >= STAGE_ORDER.indexOf(min);
const unlocked = (s: SectionKey, stage: Stage) => at(stage, SECTION_UNLOCKED_AT[s]);

/* ── Section card — verbatim from SectionAccordion (shared) ── */
function SectionCard({ title, badge, headerAction, open, children }: { title: string; badge?: React.ReactNode; headerAction?: React.ReactNode; open?: boolean; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/30 bg-card/20 overflow-hidden transition-all">
      <button className="w-full flex items-center gap-3 px-4 py-3 text-left group transition-colors hover:bg-card/40 cursor-pointer">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground leading-tight">{title}</p>
        </div>
        {badge}
        {headerAction && <div>{headerAction}</div>}
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground/60 shrink-0 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && <div className="border-t border-border/20"><div className="p-4 pt-3 space-y-3">{children}</div></div>}
    </div>
  );
}

/* ── Locked section row — verbatim LockedSectionRow ── */
function LockedSectionRow({ title, unlockedAt, subtext }: { title: string; unlockedAt: string; subtext?: string }) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/20 px-5 py-3 opacity-60">
      <div className="flex items-center gap-2">
        <Lock className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
        <h3 className="text-sm font-medium text-muted-foreground leading-tight">{title}</h3>
      </div>
      <p className="text-[11px] text-muted-foreground/70 mt-1 ml-[22px]">
        {subtext ?? <>Collected during <span className="font-medium">{unlockedAt}</span></>}
      </p>
    </div>
  );
}

/* ── Inline "collected during" placeholder — verbatim LockedSectionPlaceholder ── */
function LockedInline({ unlockedAt }: { unlockedAt: string }) {
  return (
    <div className="flex items-center gap-2 py-1.5 px-1 text-xs text-muted-foreground/70">
      <Lock className="h-3 w-3 shrink-0" />
      <span>Collected during <span className="font-medium text-muted-foreground">{unlockedAt}</span></span>
    </div>
  );
}

/* ── Read-only detail row — verbatim DetailRow (view mode) ── */
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

/* ── Editable field — verbatim DetailRow (edit mode): the Label + Input atoms ── */
function EditRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5 py-1.5">
      <Label className="text-xs font-medium text-foreground/75">{label}</Label>
      <Input readOnly defaultValue={value} className="h-10" />
    </div>
  );
}

/* ── Document row — verbatim DocumentRow ── */
function DocumentRow({ name, status, fileName }: { name: string; status: "uploaded" | "verified"; fileName: string }) {
  const cfg = status === "verified"
    ? { label: "Verified", className: "bg-accent-green-fill/10 text-accent-green-text border-accent-green-outline/20" }
    : { label: "Uploaded", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" };
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border border-border/40 bg-card/30 w-full">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground truncate">{name}</p>
        <p className="text-[11px] text-muted-foreground">{fileName}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-4", cfg.className)}>{cfg.label}</Badge>
        <button type="button" aria-label={`Open ${name}`} className="text-[11px] font-medium text-foreground/80 transition-colors hover:text-foreground hover:underline">View</button>
      </div>
    </div>
  );
}

const M = {
  name: "Maria Santos", flag: "🇵🇭", country: "Philippines", role: "Senior Backend Engineer", salary: "PHP 280,000",
  email: "maria.santos@example.com", phone: "+63 917 555 0142", dob: "14 Mar 1991", nationality: "Filipino",
  address: "12 Bonifacio St, Makati, Metro Manila", nationalId: "PH-9921-7745-01",
  start: "1 Feb 2026", tin: "TIN 284-991-002", philHealth: "PH-0099-2211-8", bankCountry: "🇵🇭 Philippines",
  bankName: "BDO Unibank", holder: "Maria Santos", account: "•••• •••• 4471", type: "Employee (EOR)",
};

/* ── The single Worker Drawer — read-only or edit, gated by pipeline stage ── */
function WorkerDrawer({ stage, edit = false }: { stage: Stage; edit?: boolean }) {
  const personalFull = at(stage, "drafting");
  const Row = edit ? (p: { label: string; value: string }) => <EditRow {...p} /> : (p: { label: string; value?: string }) => <DetailRow {...p} />;
  return (
    <div className="w-[520px] max-w-full rounded-lg border border-border bg-background overflow-hidden shadow-overlay flex flex-col">
      {/* Header — matches payroll drawer pattern */}
      <div className="px-5 pt-4 pb-3 border-b border-border/30 shrink-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-foreground leading-tight truncate">{M.name}</span>
            <span className="text-base shrink-0">{M.flag}</span>
            {stage === "certified" && !edit && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 bg-accent-green-fill/10 text-accent-green-text border-accent-green-outline/20">Active</span>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground/60 mt-0.5">Employee · {M.role}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-6 pb-6 pt-3 space-y-3">
          <div className="space-y-3">
            {/* 1) Personal Profile */}
            {unlocked("personal", stage) ? (
              <SectionCard title="Personal Profile" open={edit || true}>
                <div className="space-y-0.5">
                  <Row label="Full name" value={M.name} />
                  <Row label="Email" value={M.email} />
                  {personalFull ? (
                    <>
                      <Row label="Phone" value={M.phone} />
                      <Row label="Date of birth" value={M.dob} />
                      <Row label="Nationality" value={M.nationality} />
                      <Row label="Residential address" value={M.address} />
                      <Row label="National ID" value={M.nationalId} />
                    </>
                  ) : <div className="pt-1"><LockedInline unlockedAt={STAGE_LABEL["drafting"]} /></div>}
                </div>
              </SectionCard>
            ) : <LockedSectionRow title="Personal Profile" unlockedAt={STAGE_LABEL[SECTION_UNLOCKED_AT.personal]} />}

            {/* 2) Working Engagement */}
            {unlocked("engagement", stage) ? (
              <SectionCard title="Working Engagement" open={edit || true}>
                <div className="space-y-0.5">
                  <Row label="Worker type" value={M.type} />
                  <Row label="Role / title" value={M.role} />
                  <Row label="Country" value={`${M.flag} ${M.country}`} />
                  <Row label="Start date" value={M.start} />
                  <Row label="Monthly Salary" value={M.salary} />
                </div>
                {personalFull ? (
                  <div className="border-t border-border/40 pt-3 mt-2">
                    <p className="text-[11px] text-muted-foreground mb-2">Contract terms</p>
                    <div className="space-y-0.5">
                      <Row label="Probation period" value="180 days" />
                      <Row label="Notice period" value="30 days" />
                      <Row label="Annual leave" value="5 days" />
                      <Row label="Sick leave" value="5 days" />
                      <Row label="Weekly hours" value="48 hrs" />
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-border/40 pt-3 mt-2">
                    <p className="text-[11px] text-muted-foreground mb-1">Contract terms</p>
                    <LockedInline unlockedAt={STAGE_LABEL["drafting"]} />
                  </div>
                )}
              </SectionCard>
            ) : <LockedSectionRow title="Working Engagement" unlockedAt={STAGE_LABEL[SECTION_UNLOCKED_AT.engagement]} />}

            {/* 3) Payroll Parameters — unlocks at Payroll ready */}
            {unlocked("payroll", stage) ? (
              <SectionCard title="Payroll Parameters" open={edit || true}>
                <div className="space-y-0.5">
                  <Row label="TIN" value={M.tin} />
                  <Row label="PhilHealth number" value={M.philHealth} />
                </div>
              </SectionCard>
            ) : <LockedSectionRow title="Payroll Parameters" unlockedAt={STAGE_LABEL[SECTION_UNLOCKED_AT.payroll]} subtext={stage === "onboarding-pending" ? "Being collected — onboarding in progress" : undefined} />}

            {/* 4) Payout Destination — unlocks at Payroll ready */}
            {unlocked("payout", stage) ? (
              <SectionCard title="Payout Destination" open={edit || true}>
                <div className="space-y-0.5">
                  <Row label="Bank country" value={M.bankCountry} />
                  <Row label="Bank name" value={M.bankName} />
                  <Row label="Account holder" value={M.holder} />
                  <Row label="Account number" value={M.account} />
                </div>
              </SectionCard>
            ) : <LockedSectionRow title="Payout Destination" unlockedAt={STAGE_LABEL[SECTION_UNLOCKED_AT.payout]} subtext={stage === "onboarding-pending" ? "Being collected — onboarding in progress" : undefined} />}

            {/* 5) Documents — hidden during onboarding (still being collected) */}
            {stage !== "onboarding-pending" && (unlocked("documents", stage) ? (
              <SectionCard title="Documents" open={edit || true} badge={!edit ? <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-accent-green-fill/10 text-accent-green-text border-accent-green-outline/20">Verified</Badge> : undefined}>
                <div className="space-y-2">
                  <DocumentRow name="Employment agreement" status="verified" fileName="Maria_Agreement_Signed.pdf" />
                  <DocumentRow name="Identity document" status="verified" fileName="Maria_ID_doc.pdf" />
                  <DocumentRow name="Proof of address" status="verified" fileName="Maria_Proof_of_Address.pdf" />
                  <DocumentRow name="Tax form" status="verified" fileName="Maria_Tax_Form.pdf" />
                </div>
              </SectionCard>
            ) : <LockedSectionRow title="Documents" unlockedAt={STAGE_LABEL[SECTION_UNLOCKED_AT.documents]} />)}

            {/* Edit-mode Save / Cancel — sticky footer of the scrollable drawer */}
            {edit && (
              <div className="pt-3">
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">Cancel</Button>
                  <Button className="flex-1 bg-gradient-primary hover:opacity-90">Save changes</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const STEPS: { stage: Stage; heading: string; blurb: string }[] = [
  { stage: "offer", heading: "1 · Offer Accepted", blurb: "Worker accepted the offer. Only offer-level Personal + Engagement are populated; everything else is locked until data is collected." },
  { stage: "data-pending", heading: "2 · Awaiting worker details", blurb: "Data form sent, not yet returned. Same unlocks as Offer Accepted — only offer-level Personal + Engagement are populated." },
  { stage: "drafting", heading: "3 · Prepare Contract", blurb: "Worker submitted their details. Full Personal profile and full Working Engagement (contract terms) now unlock; Documents still pending." },
  { stage: "awaiting-signature", heading: "4 · Waiting for Signature", blurb: "Contract drafted and sent. Details stay unlocked; Documents unlock once onboarding begins." },
  { stage: "trigger-onboarding", heading: "5 · Onboard Worker", blurb: "Contract signed — ready to start onboarding. Same view as Waiting for Signature until onboarding kicks off." },
  { stage: "onboarding-pending", heading: "6 · Awaiting onboarding", blurb: "Onboarding checklist in progress. Payroll Parameters + Payout Destination read “Being collected”; the Documents card is hidden while it fills." },
  { stage: "certified", heading: "7 · Payroll ready", blurb: "All five sections unlocked and verified. Header shows the Active lifecycle badge and Documents carries a Verified badge." },
];

export const WorkerDrawerPattern: Story = {
  name: "Worker Drawer",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Worker Drawer"
        lead={<>The one worker drawer used across the whole hiring pipeline. It is a single pattern with a <strong>read-only</strong> and an <strong>edit</strong> mode; its five section cards unlock progressively as the worker moves through the seven pipeline stages, and a locked section collapses to a muted “Collected during …” row. Markup verbatim from F1v6_DoneWorkerDetailDrawer.</>}
        meta="Verbatim from F1 · Worker drawer (fronted-admin-v6-1-clone)"
      />

      <h3 style={eyebrow}>Read-only — by pipeline stage</h3>
      <p style={{ ...note, marginBottom: 14 }}>Sheet w-[520px] · header px-5 pt-4 pb-3 border-b · sections space-y-3 · unlock map: Personal & Engagement at Offer, full detail at Prepare Contract, Documents at Onboarding, Payroll Parameters & Payout Destination at Payroll ready.</p>
      <div style={{ display: "grid", gap: 28 }}>
        {STEPS.map((s) => (
          <div key={s.stage}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ds-color-heading)", marginBottom: 2 }}>{s.heading}</div>
            <p style={{ ...note, marginTop: 0, marginBottom: 10 }}>{s.blurb}</p>
            <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}><WorkerDrawer stage={s.stage} /></div>
          </div>
        ))}
      </div>

      <h3 style={eyebrow}>Edit mode</h3>
      <p style={{ ...note, marginBottom: 10 }}>Same drawer at Payroll ready with every section forced open, values become fields, and a Cancel / Save changes footer (bg-gradient-primary). No lifecycle or Verified badge in edit.</p>
      <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}><WorkerDrawer stage="certified" edit /></div>

      <h3 style={eyebrow}>Section unlock by stage</h3>
      <DocTable head={["Section", "Unlocks at", "Before unlock"]} w0={180} rows={[
        ["Personal Profile", "Offer Accepted (full detail at Prepare Contract)", "—"],
        ["Working Engagement", "Offer Accepted (contract terms at Prepare Contract)", "—"],
        ["Documents", "Awaiting onboarding → shown at Payroll ready", "Locked row · hidden while onboarding"],
        ["Payroll Parameters", "Payroll ready", "Locked · “Being collected” during onboarding"],
        ["Payout Destination", "Payroll ready", "Locked · “Being collected” during onboarding"],
      ]} />

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={150} rows={[
        ["Header", "name + flag + lifecycle badge (Payroll ready only) + subtitle", "px-5 pt-4 pb-3 border-b border-border/30 · badge bg-accent-green-fill/10"],
        ["Section card", "collapsible label/value rows; edit forces open", "rounded-xl border-border/60 bg-card/50 · header px-5 py-3 + ChevronDown"],
        ["Locked section", "muted row with lock + “Collected during …”", "rounded-xl border-border/40 bg-card/20 opacity-60 · Lock h-3.5"],
        ["Detail row", "muted label + info icon on hover / right-aligned value", "group -mx-2 px-2 py-1.5 hover:bg-muted/50 · value text-foreground"],
        ["Documents", "signed agreement + ID + tax rows, Verified badge", "DocumentRow rounded-lg border-border/40 bg-card/30 + status Badge"],
        ["Edit footer", "Cancel + Save changes", "flex gap-2 · Save bg-gradient-primary hover:opacity-90"],
      ]} />
    </div>
  ),
};
