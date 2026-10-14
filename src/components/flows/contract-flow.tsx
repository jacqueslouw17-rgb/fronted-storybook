import * as React from "react";
import { Calendar, ChevronDown, Clock, Info, Pencil, RotateCcw, Upload, User, X } from "lucide-react";
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
 *                                history, the contract preview gated on scroll-to-end
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

const EDITS = [
  { who: "Sarah Johnson", doc: "Agreement", what: "Updated compensation clause", when: "1h ago", latest: true },
  { who: "David Park", doc: "NDA", what: "Revised confidentiality scope", when: "4h ago" },
  { who: "Emily Rodriguez", doc: "IP Addendum", what: "Added IP carve-out for side project", when: "1d ago" },
];

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

function EditHistory() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="mt-3">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="w-full flex flex-col gap-1.5 px-5 py-2.5 rounded-lg bg-card/50 backdrop-blur-sm hover:bg-muted/40 border border-border/40 transition-all duration-200 text-left group">
          <div className="w-full flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-medium text-foreground">Edit history</span>
              <Badge variant="secondary" className="h-4 px-1.5 text-[10px] font-medium bg-muted/60">10</Badge>
            </div>
            <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground flex-shrink-0 transition-transform duration-200", open && "rotate-180")} />
          </div>
          {!open && (
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Clock className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">Sarah Johnson · Agreement · 1h ago</span>
            </div>
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2 rounded-lg border border-border/30 bg-card/30 overflow-hidden">
            <div className="overflow-y-auto">
              <div className="divide-y divide-border/20">
                {EDITS.map((e) => (
                  <div key={e.who} className="px-3 py-2 flex items-start gap-2 hover:bg-muted/10 transition-colors">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full flex items-center justify-center bg-muted/50"><User className="h-3 w-3 text-muted-foreground" /></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5"><p className="text-xs text-foreground font-medium truncate">{e.who}</p></div>
                      <p className="text-[10px] text-muted-foreground mt-0.5 truncate"><span className="font-medium text-foreground/70">{e.doc}</span><span> · </span>{e.what}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">{e.when}</span>
                      </div>
                    </div>
                    {e.latest && <Badge variant="outline" className="h-4 px-1.5 text-[9px] flex-shrink-0 font-normal">Latest</Badge>}
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full px-3 py-2 border-t border-border/20 bg-muted/10 hover:bg-muted/20 transition-colors text-center">
              <span className="text-[11px] text-primary font-medium">Show all 10 edits</span>
            </button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

/** "Reviewing [name]'s Contract": the candidate and their details beside the contract preview.
 *  Confirm & Continue unlocks once the contract has been scrolled to the end (`readToEnd`
 *  starts there). */
export function ContractDraftWorkspace({
  candidate: c = MARCUS, readToEnd = false, onConfirm, onBack, onRead,
}: { candidate?: Candidate; readToEnd?: boolean; onConfirm?: () => void; onBack?: () => void; onRead?: () => void }) {
  const doc = React.useRef<HTMLDivElement>(null);
  const [read, setRead] = React.useState(readToEnd);
  React.useLayoutEffect(() => { if (readToEnd && doc.current) doc.current.scrollTop = doc.current.scrollHeight; }, [readToEnd]);
  const onScroll = () => {
    const d = doc.current;
    if (d && !read && d.scrollTop + d.clientHeight >= d.scrollHeight - 8) { setRead(true); onRead?.(); }
  };
  const personal: [string, string][] = [["Name", c.name], ["Country", `${c.flag} ${c.country}`], ["Email", c.email], ["Nationality", c.nationality], ["City", c.city], ["Address", c.address], ["ID", c.idNumber]];
  const contract: [string, string][] = [["Type", c.type], ["Role", c.role], ["Monthly fee", c.salary], ["Start Date", c.startDate]];
  return (
    <div className="flex-1 flex flex-col items-center px-2 sm:px-4 md:px-8 py-10 sm:py-16">
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
              <div className="flex-1 min-h-0 overflow-hidden"><EditHistory /></div>
            </div>
            <div className="flex-1 flex flex-col h-[calc(100vh-200px)] sm:h-[calc(100vh-180px)] lg:h-[700px] min-h-[500px] w-full rounded-lg border border-border overflow-hidden">
              <div className="bg-muted/80 border-b border-border/50 p-2 flex-shrink-0 flex items-center justify-between gap-2">
                <p className="text-xs sm:text-sm text-foreground pl-1">Review the contract details carefully before proceeding.</p>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1.5 h-7 text-xs text-muted-foreground hover:text-foreground disabled:opacity-50 px-1.5 sm:px-3">
                    <RotateCcw className="h-3.5 w-3.5" /><span className="hidden sm:inline">Reset</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5 h-7 text-xs px-1.5 sm:px-3">
                    <Pencil className="h-3.5 w-3.5" /><span className="hidden sm:inline">Edit</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5 h-7 text-xs px-1.5 sm:px-3">
                    <Upload className="h-3.5 w-3.5" /><span className="hidden sm:inline">Upload</span>
                  </Button>
                </div>
              </div>
              <div ref={doc} onScroll={onScroll} className="flex-1 min-h-0 overflow-y-auto bg-background">
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
              </div>
              <div className="flex-shrink-0 p-3 sm:p-4 flex items-center justify-between bg-background border-t border-border/50">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={onBack} className="sm:h-10">Back</Button>
                </div>
                <div className="flex items-center gap-2">
                  {!read && <span className="text-xs text-muted-foreground text-right hidden sm:inline">Scroll to end to confirm</span>}
                  <Button size="sm" disabled={!read} onClick={onConfirm} className="sm:h-10 whitespace-nowrap">Confirm &amp; Continue</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:hidden"><EditHistory /></div>
        </div>
      </div>
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
