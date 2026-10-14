import * as React from "react";
import { AlertCircle, Calendar, ChevronDown, Clock, FileText, Info, Loader2, Pencil, RotateCcw, Upload, User, X } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/sonner";
import { ContractRichTextEditor } from "@/components/flows/contract-editor";
import { Part } from "@/components/flows/flow-page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Background } from "@/components/flows/admin-dashboard-shell";
import { cn } from "@/lib/utils";
import frontedLogo from "../../fronted-logo.png";

/** Layers that portal out of the page mark the pattern they belong to themselves. */
const PANEL_PARTS = {
  reset:  { id: "patterns-contract-actions--reset-dialog", label: "Patterns/Contract Actions · Reset dialog" },
  upload: { id: "patterns-contract-actions--upload-dialog", label: "Patterns/Contract Actions · Upload dialog" },
  editor: { id: "patterns-contract-actions--contract-editor", label: "Patterns/Contract Actions · Contract editor" },
};

/**
 * Contract Flow — the F1 v6.1 "Draft Contract" journey for one candidate, from the pipeline's
 * Prepare Contract card to Waiting for Signature. Verbatim markup (as rendered) from:
 *   FrostedHeader                shared/FrostedHeader (logo + close)
 *   ContractFormShell            pages/ContractCreation (the /flows/contract-creation page)
 *   ContractFlowShell            F1v61_FrontedAdminDashboard (drafting / reviewing phases)
 *   PageHeading                  agent/AgentHeader (showPulse off, showInput off)
 *   ReviewDetailsForm            F1v6_ContractCreationScreen (v6.1) — Personal Information +
 *                                Working Engagement sections, Review Agreement
 *   ContractDraftWorkspace       F1v6_ContractDraftWorkspace (v6.1) — candidate card, Edit
 *                                history, the contract preview gated on scroll-to-end, and its
 *                                branches: edit (ContractRichTextEditor), reset (regenerate),
 *                                upload (ContractUploadDialog), no documents
 *   ResetContractDialog / UploadContractDialog / EditHistory (ContractAuditLog)
 *   ContractReviewBoard          contract-flow/ContractReviewBoard — Send for Signature
 *   SentToast                    the "Contracts sent for signature" toast
 * Copied as the demo has it, including a known issue: the payment clause reads
 * "EUR SGD 12,000/mo".
 */

export type Candidate = {
  firstName: string; lastName: string; name: string; email: string; role: string;
  country: string; flag: string; nationality: string; city: string; address: string; idNumber: string;
  salary: string; fee: string; startDate: string; startLabel: string; type: string;
};

export const MARCUS: Candidate = {
  firstName: "Marcus", lastName: "Chen", name: "Marcus Chen", email: "marcus.chen@example.com",
  role: "Senior Backend Engineer", country: "Singapore", flag: "🇸🇬", nationality: "Singaporean",
  city: "Singapore", address: "88 Orchard Road, #12-01", idNumber: "SG-2024-556789",
  salary: "SGD 12,000/mo", fee: "12000", startDate: "2026-11-01", startLabel: "Nov 1, 2026", type: "Contractor",
};

/* ---------------------------------------------------------------- frame */

/** The bar over the contract pages: logo left, close right, frosted once the page scrolls. */
export function FrostedHeader({ onClose }: { onClose?: () => void }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-8 py-4 sm:py-6 transition-all duration-500 ease-out ">
      <img data-ds="wordmark" src={frontedLogo} alt="Fronted" className="h-5 sm:h-6 w-auto cursor-pointer hover:opacity-80 transition-opacity" />
      <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 sm:h-10 sm:w-10">
        <X className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
}

/** The /flows/contract-creation page: the page scrolls; header and body over the background. */
export function ContractFormShell({ header, children }: { header?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <div className="flex w-full min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-64px)] flex-col lg:flex-row overflow-hidden">
        <div className="min-h-full w-full lg:w-auto overflow-y-auto" style={{ width: "100%" }}>
          <div className="flex-1 overflow-auto relative min-h-screen bg-background ">
            <Background absolute />
            <div className="relative z-10">
              {header}
              <div className="pt-20 sm:pt-28 pb-16 sm:pb-32">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The dashboard's drafting / reviewing phases: the dashboard frame with the frosted header. */
export function ContractFlowShell({ header, children }: { header?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col w-full bg-background lg:h-screen lg:min-h-0 lg:overflow-hidden">
      {header}
      <main className="flex-1 min-h-0 flex overflow-hidden relative">
        <Background />
        <div className="flex w-full min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-64px)] flex-col lg:flex-row overflow-hidden lg:h-full lg:min-h-0">
          <div className="min-h-full w-full lg:w-auto overflow-y-auto lg:h-full lg:min-h-0 lg:overflow-hidden" style={{ width: "100%" }}>
            <div className="flex-1 overflow-auto relative min-h-full lg:h-full lg:min-h-0 lg:overflow-hidden">
              <div className="relative z-10 min-h-full lg:h-full lg:min-h-0 lg:overflow-hidden">
                <div className="flex flex-col min-h-full pt-16">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/** A centred page title and its line (AgentHeader with pulse and input off). */
export function PageHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center space-y-3 sm:space-y-4 px-4 ">
      <div className="text-center space-y-1 sm:space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h1>
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <p className="text-sm sm:text-base"><span className="text-muted-foreground">{subtitle}</span></p>
        </div>
      </div>
      <div className="w-full max-w-xl space-y-2 sm:space-y-3 px-4 sm:px-0 -mt-2 sm:-mt-3" />
    </div>
  );
}

/* ---------------------------------------------------------------- 1 · review details */

const fieldLabel = "text-xs font-medium text-foreground/75 flex items-center gap-1.5";

function Field({ label, optional, info, children }: { label: string; optional?: boolean; info?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className={fieldLabel}>
        {label}
        {optional && <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4 font-normal">Optional</Badge>}
        {info && <button type="button" aria-label={`More info about ${label}`} className="text-muted-foreground/70 hover:text-foreground transition-colors"><Info className="h-3 w-3" /></button>}
      </Label>
      {children}
    </div>
  );
}

/** A country picker's trigger (the searchable combobox, closed). */
function ComboTrigger({ value, placeholder, compact }: { value?: string; placeholder?: string; compact?: boolean }) {
  return (
    <Button variant="outline" role="combobox" type="button"
      className={cn("py-1.5 group w-full justify-between text-sm font-normal h-10", compact ? "px-2" : "px-3")}>
      {value ? <span className={compact ? "truncate" : undefined}>{value}</span>
             : <span className="text-muted-foreground group-hover:text-background transition-colors">{placeholder}</span>}
      <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 opacity-50", compact ? "ml-1" : "ml-2")} />
    </Button>
  );
}

/** One section of the details form: a card-like accordion row. */
function FormSection({ title, defaultOpen, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <div>
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="rounded-xl border border-border/30 bg-card/20 overflow-hidden transition-all">
          <CollapsibleTrigger className="w-full flex items-center gap-3 px-4 py-3 text-left group transition-colors hover:bg-card/40 cursor-pointer">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground leading-tight">{title}</p>
            </div>
            <ChevronDown className={cn("h-4 w-4 text-muted-foreground/60 shrink-0 transition-transform duration-200", open && "rotate-180")} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="border-t border-border/20">
              <div className="p-4 pt-3 space-y-3">{children}</div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
}

/** "Review [name]'s Details": what Fronted knows about the candidate, to confirm before the
 *  contract is generated. Review Agreement moves on to the contract. */
export function ReviewDetailsForm({ candidate: c = MARCUS, onReview, engagementOpen }: { candidate?: Candidate; onReview?: () => void; engagementOpen?: boolean }) {
  const [currency, setCurrency] = React.useState<"EUR" | "USD">("EUR");
  return (
    <div className="px-4 sm:px-8 max-w-3xl mx-auto space-y-1.5">
      <PageHeading title={`Review ${c.firstName}'s Details`} subtitle="Confirm the details below before generating contract documents." />
      <FormSection title="Personal Information" defaultOpen>
        <div className="space-y-1.5">
          <Field label="First name"><Input className="h-10" placeholder="e.g. Marcus" defaultValue={c.firstName} /></Field>
          <Field label="Middle Name" optional><Input className="h-10" placeholder="e.g. Lee" defaultValue="" /></Field>
          <Field label="Last name"><Input className="h-10" placeholder="e.g. Chen" defaultValue={c.lastName} /></Field>
          <div className="flex items-start gap-2">
            <Checkbox id="contract-mononym" />
            <label htmlFor="contract-mononym" className="text-xs text-foreground/75 leading-snug cursor-pointer select-none">I only have one legal name</label>
          </div>
        </div>
        <Field label="Email"><Input type="email" className="h-10" placeholder="email@example.com" defaultValue={c.email} /></Field>
        <Field label="Nationality"><ComboTrigger value={`${c.flag} ${c.country}`} /></Field>
        <div className="grid grid-cols-[7.5rem_1fr] gap-3">
          <Field label="Country Code"><ComboTrigger value={`${c.flag} +65`} compact /></Field>
          <Field label="Mobile Number"><Input className="h-10" inputMode="tel" placeholder="912 345 6789" defaultValue="" /></Field>
        </div>
        <Field label="Country of Residence"><ComboTrigger placeholder="Choose country" /></Field>
        <Field label="Address Line 1"><Input className="h-10" placeholder="Street and house number" /></Field>
        <Field label="Address Line 2" optional><Input className="h-10" placeholder="Apartment, unit, floor" /></Field>
        <Field label="Locality"><Input className="h-10" placeholder="City, town or village" /></Field>
        <Field label="Region"><Input className="h-10" placeholder="State, province, prefecture or county" /></Field>
        <Field label="Postal Code"><Input className="h-10" placeholder="238823" /></Field>
        <Field label="Date of Birth">
          <div className="relative w-[190px] max-w-full">
            <Input className="h-10 w-full pr-9 cursor-text" inputMode="numeric" placeholder="DD / MM / YYYY" />
            <button type="button" aria-label="Open calendar" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground disabled:opacity-50">
              <Calendar className="h-4 w-4" />
            </button>
          </div>
        </Field>
        <Field label="ID Type">
          <Select>
            <SelectTrigger className="h-10"><SelectValue placeholder="Choose ID type" /></SelectTrigger>
            <SelectContent><SelectItem value="passport">Passport</SelectItem><SelectItem value="nric">NRIC</SelectItem></SelectContent>
          </Select>
        </Field>
        <Field label="ID Number"><Input className="h-10" placeholder="Number as printed on the document" /></Field>
        <Field label="ID document">
          <div className="space-y-1.5">
            <label className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-border/60 px-3 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted/30 hover:text-foreground focus-within:border-primary/50 focus-within:bg-muted/30 focus-within:text-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
              <span>Upload ID document</span>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
            </label>
            <p className="text-[11px] text-muted-foreground/70">PDF, JPG, or PNG up to 5MB</p>
          </div>
        </Field>
      </FormSection>
      <FormSection title="Working Engagement" defaultOpen={engagementOpen}>
        <Field label="Role"><Input className="h-10" placeholder="e.g., Senior Dev" defaultValue={c.role} /></Field>
        <Field label="Country"><ComboTrigger value={`${c.flag} ${c.country}`} /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Employment Type">
            <Select defaultValue="contractor">
              <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="employee">Employee</SelectItem><SelectItem value="contractor">Contractor</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="Start Date">
            <Button variant="outline" type="button" className="px-3 py-1.5 w-full h-10 justify-start text-left font-normal hover:bg-background hover:shadow-none hover:text-foreground hover:translate-y-0">{c.startLabel}</Button>
          </Field>
        </div>
        <Field label="Monthly fee" info>
          <div className="relative">
            <div className="absolute left-1.5 top-1/2 -translate-y-1/2 pointer-events-auto">
              <div className="inline-flex items-center gap-1">
                {(["EUR", "USD"] as const).map((cur) => (
                  <button key={cur} type="button" onClick={() => setCurrency(cur)}
                    className={cn("px-2 h-6 rounded-md text-[11px] font-medium border transition-colors",
                      currency === cur ? "bg-primary/[0.06] text-primary border-primary/40" : "bg-transparent text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/60")}>{cur}</button>
                ))}
              </div>
            </div>
            <Input className="h-10 pl-[96px]" placeholder="5,000" defaultValue={c.fee} />
          </div>
        </Field>
        <Field label="Work Location"><Input className="h-10" placeholder="e.g. Singapore" defaultValue={c.city} /></Field>
      </FormSection>
      <div className="flex flex-col-reverse sm:flex-row justify-center gap-3 pt-2">
        <Button size="lg" onClick={onReview}>Review Agreement</Button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 2 · the contract */

type Clause = { h: string; level?: "title" | "section"; body?: React.ReactNode };
const V = ({ children }: { children: React.ReactNode }) => <span className="bg-yellow-200 text-foreground px-0.5 font-semibold">{children}</span>;

/** The Contractor Agreement as the worker will see it; dynamic values highlighted. */
export function contractClauses(c: Candidate): Clause[] {
  return [
    { h: "Contractor Agreement", level: "title" },
    { h: "", body: <>This Contract is between Fronted AS, a Norwegian Company, and <V>{c.name}</V>, <V>{c.country}</V> (the "Contractor"). Any reference to the "Client" in the following is a reference to Fronted AS. Any reference to "End Client" in the following is a reference to the Client Company.</> },
    { h: "1. Work and payment", level: "section" },
    { h: "1.1 Project.", body: <>The Client is contracting the services of the Contractor to do the following: <V>{c.role}</V>.</> },
    { h: "1.2 Schedule.", body: <>The Contractor will begin performing their services on <V>{c.startDate}</V> and will continue until termination of this Contract. This Contract can be ended by either Client or Contractor at any time, pursuant to the terms of Section 6, Term and Termination.</> },
    { h: "1.2.1 Work hours.", body: <>Work hours are <V>8 hours per day</V>, with flexibility, but availability during CET business hours is required.</> },
    // Known issue (as the demo has it): the fee gets a second currency prefix.
    { h: "1.3 Payment.", body: <>The Client shall pay the Contractor a fixed fee of <V>EUR {c.salary}</V> per month, payable against invoice, for the Services.</> },
    { h: "1.4 Expenses.", body: "The Contractor shall be responsible for all expenses incurred in the performance of the Services, except for any expenses expressly pre-approved in writing by the Client, which shall be reimbursed against valid receipts." },
    { h: "1.5 Invoices.", body: "The Contractor will invoice Fronted AS. Fronted AS agrees to pay the amount owed at the end of each month of receiving the invoice. Under the condition the invoice is not contested by the End Client. Invoices must reflect actual work performed during the invoiced period. Submitting an invoice for a period when no services were rendered, or retaining payment for such period, constitutes unjust enrichment and a breach of this Contract, and the Client shall have the right to claim restitution." },
    { h: "2. Ownership and licenses", level: "section" },
    { h: "2.1 Client Owns All Work Product.", body: "As part of these services, the Contractor is creating a \"work product\" for the Client. The Contractor hereby gives the End Client this work product once the End Client pays for it in full to Client. This means the Contractor is giving the End Client all of its rights, titles, and interests in and to the work product (including intellectual property rights), and the End Client will be the sole owner of it." },
    { h: "3. Competitive engagements", body: "The Contractor won't work for a competitor of the End Client until this Contract ends. To avoid confusion, a competitor is any third party that develops, manufactures, promotes, sells, licenses, distributes, or provides products or services that are substantially similar to the End Client's products or services." },
    { h: "4. Non-solicitation", body: "Until this Contract ends, the Contractor won't encourage End Client employees or service providers to stop working for the End Client for any reason." },
    { h: "5. Representations", level: "section" },
    { h: "5.1 Overview.", body: "This section contains important promises between the parties." },
    { h: "6. Term and termination", body: <>This Contract is ongoing, until ended by the Client or the Contractor. Either party may end this Contract for any reason by sending an email or letter to the other party, informing the recipient that the sender is ending the Contract and that the Contract will end in <V>30 days</V>.</> },
    { h: "7. Independent contractor", body: "On behalf of the End Client, the Client is contracting the services of the Contractor as an independent contractor. The Contractor will use its own equipment, tools, and material to do the work. Neither the Client, nor the End Client, will control the details of how the services are performed on a day-to-day basis." },
    { h: "8. Confidential information", body: "This Contract imposes special restrictions on how the End Client and the Contractor must handle confidential information." },
    { h: "9. Limitation of liability", body: "Neither party is liable for breach-loss that the breaching party could not reasonably have foreseen when it entered into this Contract." },
    { h: "10. Indemnity", body: "Each party agrees to indemnify the other party against damages arising from a breach of this Contract." },
    { h: "Signatures", body: `THE PARTIES HERETO AGREE TO THE FOREGOING AS EVIDENCED BY THEIR SIGNATURES BELOW.\n\n___________________          ___________________\nMa Angelo Bartolome          ${c.name}\nCOO, Fronted AS              Contractor` },
  ];
}

/** One entry in a contract's edit history. */
export type EditEvent = { who: string; doc?: string; what?: string; when: string; kind?: "edit" | "reset" | "upload" };

/** The candidate's history before this session: 10 edits, the latest three shown. */
export const BASE_EDITS: EditEvent[] = [
  { who: "Sarah Johnson", doc: "Agreement", what: "Updated compensation clause", when: "1h ago" },
  { who: "David Park", doc: "NDA", what: "Revised confidentiality scope", when: "4h ago" },
  { who: "Emily Rodriguez", doc: "IP Addendum", what: "Added IP carve-out for side project", when: "1d ago" },
];
const BASE_EDIT_COUNT = 10;

function DetailRows({ rows, last }: { rows: [string, string][]; last?: boolean }) {
  return (
    <div className={cn("px-5 py-3 space-y-1", !last && "border-b border-border/20")}>
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-baseline justify-between gap-2 text-xs">
          <span className="text-muted-foreground flex-shrink-0">{k}</span>
          <span className="font-medium text-foreground truncate">{v}</span>
        </div>
      ))}
    </div>
  );
}

function SideSection({ title, rows, last }: { title: string; rows: [string, string][]; last?: boolean }) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="w-full px-5 py-3 border-b border-border/20 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors group">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/60 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent><DetailRows rows={rows} last={last} /></CollapsibleContent>
    </Collapsible>
  );
}

/** Edit history (ContractAuditLog): newest first; resets and uploads carry a badge. */
export function EditHistory({ events = BASE_EDITS, count = BASE_EDIT_COUNT }: { events?: EditEvent[]; count?: number }) {
  const [open, setOpen] = React.useState(false);
  const latest = events[0];
  return (
    <div className="mt-3">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="w-full flex flex-col gap-1.5 px-5 py-2.5 rounded-lg bg-card/50 backdrop-blur-sm hover:bg-muted/40 border border-border/40 transition-all duration-200 text-left group">
          <div className="w-full flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-medium text-foreground">Edit history</span>
              <Badge variant="secondary" className="h-4 px-1.5 text-[10px] font-medium bg-muted/60">{count}</Badge>
            </div>
            <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground flex-shrink-0 transition-transform duration-200", open && "rotate-180")} />
          </div>
          {!open && latest && (
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Clock className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{latest.who}{latest.doc ? ` · ${latest.doc}` : ""} · {latest.when}</span>
            </div>
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2 rounded-lg border border-border/30 bg-card/30 overflow-hidden">
            <div className="overflow-y-auto">
              <div className="divide-y divide-border/20">
                {events.slice(0, 3).map((e, i) => {
                  const marked = e.kind === "reset" || e.kind === "upload";
                  return (
                    <div key={i} className="px-3 py-2 flex items-start gap-2 hover:bg-muted/10 transition-colors">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className={cn("h-5 w-5 rounded-full flex items-center justify-center", marked ? "bg-primary/10" : "bg-muted/50")}>
                          {e.kind === "reset" ? <RotateCcw className="h-3 w-3 text-primary" />
                            : e.kind === "upload" ? <Upload className="h-3 w-3 text-primary" />
                            : <User className="h-3 w-3 text-muted-foreground" />}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs text-foreground font-medium truncate">{e.who}</p>
                          {marked && <Badge variant="secondary" className="h-4 px-1.5 text-[9px] bg-primary/10 text-primary border-0">{e.kind === "reset" ? "Reset to original" : "Uploaded contract"}</Badge>}
                        </div>
                        {(e.doc || e.what) && (
                          <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
                            {e.doc && <span className="font-medium text-foreground/70">{e.doc}</span>}
                            {e.doc && e.what && <span> · </span>}
                            {e.what}
                          </p>
                        )}
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">{e.when}</span>
                        </div>
                      </div>
                      {i === 0 && <Badge variant="outline" className="h-4 px-1.5 text-[9px] flex-shrink-0 font-normal">Latest</Badge>}
                    </div>
                  );
                })}
              </div>
            </div>
            {count > 3 && (
              <button className="w-full px-3 py-2 border-t border-border/20 bg-muted/10 hover:bg-muted/20 transition-colors text-center">
                <span className="text-[11px] text-primary font-medium">Show all {count} edits</span>
              </button>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

/* ---------------------------------------------------------------- dialogs */

/** "Reset contract to original?" — regenerate from the template, discarding manual edits. */
export function ResetContractDialog({ open, onOpenChange, onReset }: { open: boolean; onOpenChange: (o: boolean) => void; onReset: () => void }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <Part of={PANEL_PARTS.reset}>
          <button onClick={() => onOpenChange(false)} aria-label="Close"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-4 w-4" />
          </button>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset contract to original?</AlertDialogTitle>
            <AlertDialogDescription>This will regenerate the contract using the current worker data and discard all manual edits. This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onReset}>Reset Contract</AlertDialogAction>
          </AlertDialogFooter>
        </Part>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/** Why an upload was refused (contract-flow/ContractUploadDialog IMPORT_MESSAGES). */
export const IMPORT_MESSAGES = {
  format: "Upload a PDF, DOC or DOCX file.",
  size: "File must be 10 MB or smaller.",
  server: "Something went wrong while importing the contract. Try again.",
  other: "We couldn't import this contract. Check that the file isn't corrupted, password-protected, or image-only, then try again.",
} as const;
export type ImportProblem = keyof typeof IMPORT_MESSAGES;
export type PickedFile = { name: string; size: number };

const prettySize = (bytes: number) => {
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
};
/** The file checks the dialog runs before importing (contractImport.validateContractFile). */
export function checkFile(f: PickedFile): ImportProblem | null {
  if (!/\.(pdf|docx?)$/i.test(f.name)) return "format";
  if (f.size > 10 * 1024 * 1024) return "size";
  return null;
}

export type UploadState = { file?: PickedFile | null; error?: ImportProblem | null; importing?: boolean };

/** "Upload the finalised agreement": drop or browse a PDF / DOC / DOCX (10 MB), then Upload
 *  contract. Refused files and failed imports show inline, with Try again. `fail` makes the
 *  next import fail with that reason (for the error branch). */
export function UploadContractDialog({
  open, onOpenChange, workerName, countryLabel, documentLabel = "agreement", initial = {}, fail, onImported, onEvent, hold,
}: {
  open: boolean; onOpenChange: (o: boolean) => void; workerName: string; countryLabel?: string; documentLabel?: string; hold?: boolean;
  initial?: UploadState; fail?: ImportProblem; onImported?: (f: PickedFile) => void; onEvent?: (e: "pick" | "refused" | "import" | "failed") => void;
}) {
  const [file, setFile] = React.useState<PickedFile | null>(initial.file ?? null);
  const [error, setError] = React.useState<ImportProblem | null>(initial.error ?? null);
  const [importing, setImporting] = React.useState(!!initial.importing);
  const input = React.useRef<HTMLInputElement>(null);
  const first = React.useRef(true);
  // Closing clears the dialog (as the app does); the first open keeps any starting state.
  React.useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (!open) { setFile(null); setError(null); setImporting(false); }
  }, [open]);
  // A dialog that starts mid-upload finishes it.
  React.useEffect(() => { if (initial.importing && initial.file && !hold) finish(initial.file); }, []);
  const finish = (f: PickedFile) => window.setTimeout(() => {
    setImporting(false);
    if (fail) { setError(fail); onEvent?.("failed"); return; }
    onImported?.(f); onOpenChange(false);
  }, 1200);
  const pick = (f: PickedFile | null) => {
    if (!f) return;
    const bad = checkFile(f);
    if (bad) { setFile(null); setError(bad); onEvent?.("refused"); return; }
    setError(null); setFile(f); onEvent?.("pick");
  };
  const upload = () => {
    if (!file) return;
    setImporting(true); setError(null); onEvent?.("import");
    finish(file);
  };
  return (
    <Dialog open={open} onOpenChange={(next) => (importing ? null : onOpenChange(next))}>
      <DialogContent className="sm:max-w-[460px]">
        <Part of={PANEL_PARTS.upload}>
          <span hidden data-pattern-state={importing ? "uploading" : error ? (file ? "failed" : "refused") : file ? "chosen" : "empty"} />
          <DialogHeader>
            <DialogTitle>Upload the finalised {documentLabel}</DialogTitle>
            <DialogDescription>
              Becomes {workerName}'s current version and is saved to history. It applies to this worker only. The{countryLabel ? ` ${countryLabel}` : ""} template stays unchanged.
            </DialogDescription>
          </DialogHeader>
          {importing ? (
            <div className="flex flex-col items-center justify-center gap-3 py-10">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Uploading…</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div role="button" tabIndex={0} onClick={() => input.current?.click()}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") input.current?.click(); }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) pick({ name: f.name, size: f.size }); }}
                className={cn("flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-8 text-center transition-colors",
                  "border-border/70 hover:bg-muted/30", error && !file && "border-destructive/60")}>
                {file ? (
                  <>
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground">{file.name}</p>
                    <p className="text-[11px] text-muted-foreground">{prettySize(file.size)} · Choose a different file</p>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground">Drop your file here or browse</p>
                    <p className="text-[11px] text-muted-foreground">PDF, DOC or DOCX up to 10 MB</p>
                  </>
                )}
                <input ref={input} type="file" accept=".pdf,.doc,.docx" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) pick({ name: f.name, size: f.size }); e.target.value = ""; }} />
              </div>
              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/5 px-3 py-2">
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-destructive" />
                  <p className="text-[11px] leading-relaxed text-destructive">{IMPORT_MESSAGES[error]}</p>
                </div>
              )}
              <div className="flex items-center justify-end gap-2 pt-1">
                <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button size="sm" disabled={!file} onClick={upload}>{error && file ? "Try again" : "Upload contract"}</Button>
              </div>
            </div>
          )}
        </Part>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------------------------------------------------------- the workspace */

/** What the workspace shows: the contract, the editor, a skeleton while a reset or upload is
 *  applied, or nothing to show when no document was generated. */
export type WorkspaceMode = "view" | "editing" | "resetting" | "applying" | "no-documents";

export type WorkspaceState = {
  mode?: WorkspaceMode;
  readToEnd?: boolean;
  /** Editor content emptied (Save Changes disabled, "cannot be empty"). */
  emptyEditor?: boolean;
  dialog?: "reset" | "upload" | null;
  upload?: UploadState;
  /** Edits made in this session, newest first (on top of BASE_EDITS). */
  edits?: EditEvent[];
  /** Reset stays disabled until something changes after a reset. */
  changedSinceReset?: boolean;
  /** Toast to show on arrival (the screen right after an action). */
  toast?: { title: string; description?: string };
  /** Keep an in-between state (regenerating, applying, uploading) instead of letting it settle. */
  hold?: boolean;
};

export type WorkspaceEvent =
  | "read" | "confirm" | "back" | "edit" | "cancel-edit" | "save" | "empty"
  | "reset-open" | "reset" | "reset-done" | "upload-open" | "upload-pick" | "upload-refused"
  | "upload-import" | "upload-failed" | "upload-done";

/** The editor's starting HTML: the contract with values marked {{hl}} (as the demo has it). */
function contractHtml(c: Candidate) {
  const text = (n: React.ReactNode): string =>
    typeof n === "string" ? n : Array.isArray(n) ? n.map(text).join("")
      : React.isValidElement(n) ? ((n.type === V ? `{{hl}}${text((n.props as { children: React.ReactNode }).children)}{{/hl}}` : text((n.props as { children: React.ReactNode }).children))) : n == null ? "" : String(n);
  return contractClauses(c).map((k) => `${k.h ? `<h2>${k.h}</h2>` : ""}${k.body ? `<p>${text(k.body)}</p>` : ""}`).join("");
}

/** "Reviewing [name]'s Contract": the candidate and their details beside the contract preview,
 *  with Reset, Edit and Upload. Confirm & Continue unlocks once the contract has been scrolled
 *  to the end. `initial` sets up any state of the journey (editing, a dialog, a skeleton…);
 *  `onEvent` reports each step the admin takes. */
export function ContractDraftWorkspace({
  candidate: c = MARCUS, readToEnd = false, initial = {}, onConfirm, onBack, onRead, onEvent, uploadFails,
}: {
  candidate?: Candidate; readToEnd?: boolean; initial?: WorkspaceState;
  onConfirm?: () => void; onBack?: () => void; onRead?: () => void; onEvent?: (e: WorkspaceEvent) => void;
  /** Make uploads fail with this reason (the import error branch). */
  uploadFails?: ImportProblem;
}) {
  const doc = React.useRef<HTMLDivElement>(null);
  const [mode, setMode] = React.useState<WorkspaceMode>(initial.mode ?? "view");
  const [read, setRead] = React.useState(readToEnd || !!initial.readToEnd);
  const [dialog, setDialog] = React.useState(initial.dialog ?? null);
  const [edits, setEdits] = React.useState<EditEvent[]>(initial.edits ?? []);
  const [changed, setChanged] = React.useState(initial.changedSinceReset ?? true);
  const [html, setHtml] = React.useState(() => (initial.emptyEditor ? "" : contractHtml(c)));
  const emit = (e: WorkspaceEvent) => onEvent?.(e);
  const empty = html.replace(/<[^>]*>/g, "").trim().length === 0;
  const loading = mode === "resetting" || mode === "applying";

  React.useLayoutEffect(() => { if ((readToEnd || initial.readToEnd) && doc.current) doc.current.scrollTop = doc.current.scrollHeight; }, [readToEnd, initial.readToEnd, mode]);
  React.useEffect(() => { if (initial.toast) toast.success(initial.toast.title, initial.toast.description ? { description: initial.toast.description } : undefined); }, []);
  // A reset or an upload settles by itself, as in the app (4s to regenerate, 1.6s to apply).
  React.useEffect(() => {
    if (initial.hold && mode === initial.mode) return;
    if (mode === "resetting") {
      const t = window.setTimeout(() => {
        setMode("view"); setChanged(false); setHtml(contractHtml(c));
        setEdits((e) => [{ who: "You", when: "Just now", kind: "reset" }, ...e]);
        toast.success("Contract reset to original", { description: "The contract has been regenerated using the current worker data." });
        emit("reset-done");
      }, 4000);
      return () => window.clearTimeout(t);
    }
    if (mode === "applying") {
      const t = window.setTimeout(() => {
        setMode("view");
        toast.success("Contract replaced with your uploaded version", { description: "Saved as the current version in edit history." });
        emit("upload-done");
      }, 1600);
      return () => window.clearTimeout(t);
    }
  }, [mode]);

  const onScroll = () => {
    const d = doc.current;
    if (d && !read && d.scrollTop + d.clientHeight >= d.scrollHeight - 8) { setRead(true); onRead?.(); emit("read"); }
  };
  const save = () => {
    if (empty) { toast.error("Contract cannot be empty", { description: "Please add content before saving." }); return; }
    setMode("view"); setChanged(true);
    setEdits((e) => [{ who: "You", doc: "Agreement", when: "Just now" }, ...e]);
    toast.success("Contract changes saved");
    emit("save");
  };

  const personal: [string, string][] = [["Name", c.name], ["Country", `${c.flag} ${c.country}`], ["Email", c.email], ["Nationality", c.nationality], ["City", c.city], ["Address", c.address], ["ID", c.idNumber]];
  const contract: [string, string][] = [["Type", c.type], ["Role", c.role], ["Monthly fee", c.salary], ["Start Date", c.startDate]];
  const allEdits = [...edits, ...BASE_EDITS];
  const history = <EditHistory events={allEdits} count={BASE_EDIT_COUNT + edits.length} />;

  return (
    <div className="flex-1 flex flex-col items-center px-2 sm:px-4 md:px-8 py-10 sm:py-16" data-pattern-state={mode === "editing" && empty ? "editing-empty" : mode}>
      <div className="w-full max-w-7xl space-y-3 sm:space-y-8">
        <div className="space-y-2">
          <PageHeading title={`Reviewing ${c.firstName}'s Contract`} subtitle="Preview how this contract will appear to the worker before sending for signature." />
          <div className="lg:hidden">
            <Collapsible>
              <CollapsibleTrigger className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-border/30 bg-card/20 hover:bg-card/40 transition-colors text-left">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl">{c.flag}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{c.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{c.role} · {c.country}</p>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground/60 shrink-0 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 rounded-xl border border-border/30 bg-card/20 overflow-hidden">
                  <DetailRows rows={personal} />
                  <DetailRows rows={contract} last />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div className="h-full flex flex-col lg:flex-row gap-2 items-start">
            <div className="hidden lg:flex w-80 flex-shrink-0 flex-col h-[600px]">
              <Card className="border border-border/40 bg-card/50 backdrop-blur-sm flex-shrink-0 overflow-hidden">
                <div className="px-5 py-4 border-b border-border/30">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{c.flag}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm truncate">{c.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{c.role}</p>
                    </div>
                  </div>
                </div>
                <div className="overflow-y-auto max-h-[420px] pb-3">
                  <SideSection title="Personal Details" rows={personal} />
                  <SideSection title="Contract Details" rows={contract} last />
                </div>
              </Card>
              <div className="flex-1 min-h-0 overflow-hidden">{history}</div>
            </div>
            <div className="flex-1 flex flex-col h-[calc(100vh-200px)] sm:h-[calc(100vh-180px)] lg:h-[700px] min-h-[500px] w-full rounded-lg border border-border overflow-hidden">
              <div className="bg-muted/80 border-b border-border/50 p-2 flex-shrink-0 flex items-center justify-between gap-2">
                {mode === "editing" ? (
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${empty ? "bg-destructive" : "bg-warning animate-pulse"}`} />
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                      {empty
                        ? <>Editing <span className="font-medium text-foreground">Agreement</span><span className="text-destructive ml-1">- cannot be empty</span></>
                        : <>Edits to <span className="font-medium text-foreground">Agreement</span> apply only to {c.name}</>}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-foreground pl-1">
                    {mode === "resetting" ? "Regenerating contract from template..." : mode === "applying" ? "Loading your uploaded contract..." : "Review the contract details carefully before proceeding."}
                  </p>
                )}
                {mode === "editing" ? (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => { setMode("view"); setHtml(contractHtml(c)); emit("cancel-edit"); }}>Cancel</Button>
                    <Button size="sm" className="h-7 text-xs" onClick={save} disabled={empty}>Save Changes</Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => { setDialog("reset"); emit("reset-open"); }} disabled={loading || mode === "no-documents" || !changed}
                      className="flex items-center gap-1.5 h-7 text-xs text-muted-foreground hover:text-foreground disabled:opacity-50 px-1.5 sm:px-3">
                      <RotateCcw className={`h-3.5 w-3.5 ${mode === "resetting" ? "animate-spin" : ""}`} /><span className="hidden sm:inline">Reset</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => { setMode("editing"); emit("edit"); }} disabled={loading || mode === "no-documents"}
                      className="flex items-center gap-1.5 h-7 text-xs px-1.5 sm:px-3">
                      <Pencil className="h-3.5 w-3.5" /><span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => { setDialog("upload"); emit("upload-open"); }} disabled={loading}
                      className="flex items-center gap-1.5 h-7 text-xs px-1.5 sm:px-3">
                      <Upload className="h-3.5 w-3.5" /><span className="hidden sm:inline">Upload</span>
                    </Button>
                  </div>
                )}
              </div>
              {mode === "editing" ? (
                <div className="flex-1 min-h-0 bg-background flex flex-col overflow-hidden">
                  <div className="h-full flex flex-col">
                    <Part of={PANEL_PARTS.editor}>
                      <span hidden data-pattern-state={empty ? "empty" : "editing"} />
                      <ContractRichTextEditor content={html} onChange={(h) => { setHtml(h); if (!h.replace(/<[^>]*>/g, "").trim()) emit("empty"); }} className="border-0 rounded-none flex-1 min-h-0" />
                    </Part>
                  </div>
                </div>
              ) : (
                <div ref={doc} onScroll={onScroll} className="flex-1 min-h-0 overflow-y-auto bg-background">
                  {loading ? (
                    <div className="p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="flex justify-center"><Skeleton className="h-6 w-48" /></div>
                        <div className="space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-11/12" /><Skeleton className="h-4 w-10/12" /></div>
                        <Skeleton className="h-5 w-40 mt-6" />
                        <div className="space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-9/12" /></div>
                      </div>
                    </div>
                  ) : mode === "no-documents" ? (
                    <div className="flex items-center justify-center h-full p-6">
                      <div className="text-center text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-3 opacity-40" />
                        <p className="text-sm font-medium">No documents available</p>
                        <p className="text-xs mt-1">No documents have been generated for this worker yet.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 sm:p-6">
                      <div className="space-y-4 select-none">
                        {contractClauses(c).map((k, i) => (
                          <div key={i}>
                            {k.level === "title" ? <h3 className="text-base sm:text-lg font-medium mb-4 text-foreground">{k.h}</h3>
                              : k.h && <h3 className="text-sm font-medium mb-2 text-foreground">{k.h}</h3>}
                            {k.body && <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{k.body}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {mode !== "editing" && !loading && (
                <div className="flex-shrink-0 p-3 sm:p-4 flex items-center justify-between bg-background border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => { onBack?.(); emit("back"); }} className="sm:h-10">Back</Button>
                  </div>
                  <div className="flex items-center gap-2">
                    {!read && <span className="text-xs text-muted-foreground text-right hidden sm:inline">Scroll to end to confirm</span>}
                    <Button size="sm" disabled={!read || mode === "no-documents"} onClick={() => { onConfirm?.(); emit("confirm"); }} className="sm:h-10 whitespace-nowrap">Confirm &amp; Continue</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="lg:hidden">{history}</div>
        </div>
      </div>
      <ResetContractDialog open={dialog === "reset"} onOpenChange={(o) => setDialog(o ? "reset" : null)}
        onReset={() => { setDialog(null); setMode("resetting"); emit("reset"); }} />
      <UploadContractDialog open={dialog === "upload"} onOpenChange={(o) => setDialog(o ? "upload" : null)}
        workerName={c.name} countryLabel={c.country} initial={initial.upload} fail={uploadFails} hold={initial.hold}
        onEvent={(e) => emit(e === "pick" ? "upload-pick" : e === "refused" ? "upload-refused" : e === "import" ? "upload-import" : "upload-failed")}
        onImported={(f) => {
          setEdits((e) => [{ who: "You", doc: "Agreement", what: `Uploaded ${f.name}`, when: "Just now", kind: "upload" }, ...e]);
          setChanged(true); setMode("applying");
        }} />
    </div>
  );
}

/* ---------------------------------------------------------------- 3 · review and send */

/** "Review Contracts": every drafted contract, ready to send for e-signature. */
export function ContractReviewBoard({ candidates = [MARCUS], onSend, onPrevious }: { candidates?: Candidate[]; onSend?: () => void; onPrevious?: () => void }) {
  return (
    <div className="flex-1 px-4 py-6 sm:p-8">
      <div className="space-y-6">
        <PageHeading title="Review Contracts" subtitle="Ready to send contract bundles to your candidates for electronic signature." />
        <div className="grid gap-3 grid-cols-1 max-w-lg mx-auto">
          {candidates.map((c) => (
            <div key={c.name}>
              <Card className="p-4 relative overflow-hidden border border-border/40 bg-card">
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm text-foreground flex items-center gap-1.5 truncate">{c.name}<span className="text-base">{c.flag}</span></h4>
                      <p className="text-xs text-muted-foreground truncate">{c.role} · {c.country}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-medium text-foreground">{c.salary}</p>
                      <p className="text-[11px] text-muted-foreground">Start {c.startDate}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-3">
          <Button variant="outline" size="lg" onClick={onPrevious}>Previous</Button>
          <Button size="lg" onClick={onSend} className="bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-shadow">Send for Signature</Button>
        </div>
      </div>
    </div>
  );
}

/** The toast after sending: bottom-right on desktop, top on a phone. */
export function SentToast({ count = 1 }: { count?: number }) {
  return (
    <div role="region" aria-label="Notifications" tabIndex={-1}>
      <ol tabIndex={-1} className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
        <li role="status" className="group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md p-6 pr-8 shadow-lg transition-all border bg-background text-foreground">
          <div className="grid gap-1">
            <div className="text-sm font-semibold">Contracts sent for signature</div>
            <div className="text-sm opacity-90">{count} candidate(s) moved to Waiting for Signature</div>
          </div>
          <button type="button" className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2">
            <X className="h-4 w-4" />
          </button>
        </li>
      </ol>
    </div>
  );
}
