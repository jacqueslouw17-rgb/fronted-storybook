import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ArrowLeft, CheckCircle2, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Agreement Viewer (verbatim from F1 Fronted admin, F1v6_AgreementViewerSheet).
 * A wide (680px) read-only right-side sheet showing a worker's signed agreement: header with
 * back button + green "Signed" badge, a document-style container of agreement sections, a
 * two-column signature block, and a "Read-only · Signed document" footer. Markup verbatim from
 * source (primary text uses text-emphasis per the system's a11y swap).
 */
const meta: Meta = { title: "Patterns/Agreement Viewer", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

type Section = { heading: string; text: string };
// Real contractor-agreement sections from source (getContractorAgreement).
const SECTIONS: Section[] = [
  { heading: "Contractor Agreement", text: "" },
  { heading: "", text: `This Contract is between Fronted AS, a Norwegian Company, and Marcus Chen, Singapore (the "Contractor"). Any reference to the "Client" in the following is a reference to Fronted AS. Any reference to "End Client" in the following is a reference to the Client Company.` },
  { heading: "1. WORK AND PAYMENT", text: "" },
  { heading: "1.1 Project.", text: "The Client is contracting the services of the Contractor to do the following: Senior Backend Engineer." },
  { heading: "1.2 Schedule.", text: "The Contractor will begin performing their services on Feb 1, 2026 and will continue until termination of this Contract. This Contract can be ended by either Client or Contractor at any time, pursuant to the terms of Section 6, Term and Termination." },
  { heading: "1.3 Payment.", text: "The Client shall pay the Contractor a fixed fee of SGD 12,000 per month, payable against invoice, for the Services." },
  { heading: "1.4 Expenses.", text: "The Contractor shall be responsible for all expenses incurred in the performance of the Services, except for any expenses expressly pre-approved in writing by the Client, which shall be reimbursed against valid receipts." },
  { heading: "1.5 Invoices.", text: "The Contractor will invoice Fronted AS. Fronted AS agrees to pay the amount owed at the end of each month of receiving the invoice. Under the condition the invoice is not contested by the End Client." },
  { heading: "2. OWNERSHIP AND LICENSES", text: "" },
  { heading: "2.1 Client Owns All Work Product.", text: "As part of these services, the Contractor is creating a \"work product\" for the Client. The Contractor hereby gives the End Client this work product once the End Client pays for it in full to Client. This means the Contractor is giving the End Client all of its rights, titles, and interests in and to the work product (including intellectual property rights), and the End Client will be the sole owner of it." },
  { heading: "6. TERM AND TERMINATION", text: "This Contract is ongoing, until ended by the Client or the Contractor. Either party may end this Contract for any reason by sending an email or letter to the other party, informing the recipient that the sender is ending the Contract and that the Contract will end in 30 days." },
];

function AgreementViewer() {
  return (
    <div className="w-[680px] max-w-full rounded-lg border border-border bg-background overflow-hidden shadow-overlay flex flex-col">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-border/40 shrink-0 bg-background">
        <div className="flex items-center gap-3">
          <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><ArrowLeft className="h-4 w-4 text-muted-foreground" /></button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-foreground">Contractor Agreement</span>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-accent-green-fill/10 text-accent-green-text border-accent-green-outline/20 gap-0.5"><CheckCircle2 className="h-2.5 w-2.5" />Signed</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">Marcus Chen · 🇸🇬 Singapore</p>
          </div>
        </div>
      </div>

      {/* Agreement content */}
      <div className="flex-1 overflow-y-auto" style={{ maxHeight: 560 }}>
        <div className="px-8 py-6">
          <div className="bg-background border border-border/60 rounded-xl shadow-sm">
            <div className="px-8 py-8 space-y-4">
              {SECTIONS.map((s, idx) => (
                <div key={idx}>
                  {s.heading && <h3 className={cn("font-semibold text-foreground mb-1.5", idx === 0 ? "text-lg text-center mb-4" : "text-sm")}>{s.heading}</h3>}
                  {s.text && <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{s.text}</p>}
                </div>
              ))}

              {/* Signatures */}
              <div className="mt-8 pt-6 border-t border-border/40">
                <h3 className="text-sm font-semibold text-foreground mb-1">Signatures</h3>
                <p className="text-sm text-muted-foreground mb-6">THE PARTIES HERETO AGREE TO THE FOREGOING AS EVIDENCED BY THEIR SIGNATURES BELOW.</p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <div className="h-16 flex items-end"><span style={{ fontFamily: "'Caveat', cursive" }} className="text-2xl text-foreground italic">Ma Angelo Bartolome</span></div>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium text-foreground">Ma Angelo Bartolome</p>
                      <p className="text-xs text-muted-foreground">COO, Fronted AS</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1">Signed Jan 28, 2026 · 14:32 UTC</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 flex items-end"><span style={{ fontFamily: "'Caveat', cursive" }} className="text-2xl text-foreground italic">Marcus Chen</span></div>
                    <Separator />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Marcus Chen</p>
                      <p className="text-xs text-muted-foreground">Contractor</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1">Signed Jan 29, 2026 · 09:15 UTC</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border/40 bg-background shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Shield className="h-3.5 w-3.5 text-emphasis" /><span>Read-only · Signed document</span></div>
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">Close</Button>
        </div>
      </div>
    </div>
  );
}

export const AgreementViewerPattern: Story = {
  name: "Agreement Viewer",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Agreement Viewer"
        lead={<>The read-only signed-agreement sheet from the Fronted admin — a wide (680px) right-side panel with a back button, a green “Signed” badge, a document-style container of agreement sections, a two-column signature block (handwritten-style signatures + timestamps), and a “Read-only · Signed document” footer. Markup verbatim from F1v6_AgreementViewerSheet.</>}
        meta="Verbatim from F1 · Agreement viewer (fronted-admin-v6-1-clone)"
      />

      <h3 style={eyebrow}>Preview</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}><AgreementViewer /></div>
      <p style={{ ...note, marginTop: 10 }}>Sheet w-[680px] p-0 · header px-5 pt-4 pb-3 border-b + back button + Signed badge · document container bg-background border-border/60 rounded-xl shadow-sm px-8 py-8 · sections whitespace-pre-line (first heading centered text-lg) · signatures grid-cols-2 gap-8 with Caveat script + Separator + timestamps · footer Shield + Read-only + Close.</p>

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={150} rows={[
        ["Header", "back button + title + green Signed badge + worker · country", "px-5 pt-4 pb-3 border-b · badge bg-accent-green-fill/10 text-accent-green-text"],
        ["Document", "bordered paper container of agreement sections", "bg-background border-border/60 rounded-xl shadow-sm · px-8 py-8 space-y-4"],
        ["Section", "heading + pre-wrapped clause text (title centered)", "h3 text-sm font-semibold · p text-sm text-muted-foreground whitespace-pre-line"],
        ["Signatures", "two-column signatory block with script name + timestamp", "grid grid-cols-2 gap-8 · Caveat italic + Separator + Signed …"],
        ["Footer", "Read-only · Signed document + Close", "border-t bg-background · Shield text-emphasis + outline Close"],
      ]} />
    </div>
  ),
};
