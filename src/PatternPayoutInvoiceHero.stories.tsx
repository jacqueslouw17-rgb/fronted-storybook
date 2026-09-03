import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FileText, Calendar, Download, ChevronRight } from "lucide-react";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Payout & Invoice Hero (verbatim from F4.1 Employee dashboard
 * F41v81_PayoutHeroCard and F4.2 Contractor dashboard F42v81_InvoiceHeroCard).
 * A two-tile hero card: a tinted "Last payout / Last invoice" tile (bg-primary/[0.06]
 * border-primary/20) with a download / view-details affordance, next to a plain
 * "Next payout / Next invoice" tile. Markup verbatim from source (primary text uses
 * text-emphasis per the system's a11y swap; bg-primary/* and border-primary/* fills kept).
 */
const meta: Meta = { title: "Patterns/Payout & Invoice Hero", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

/** Employee hero — verbatim from F41v81_PayoutHeroCard (currency PHP). */
function PayoutHeroCard({ currencyCode = "PHP" }: { currencyCode?: string }) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/20 overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            role="button"
            tabIndex={0}
            className="group bg-primary/[0.06] hover:bg-primary/[0.1] rounded-xl p-4 sm:p-5 border border-primary/20 cursor-pointer transition-colors focus-visible:outline-none focus-visible:bg-primary/[0.1]"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 text-emphasis/80">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Last payout</span>
              </div>
              <span className="flex items-center gap-1 text-sm text-emphasis/70 group-hover:text-emphasis transition-colors">
                Download
                <Download className="h-3.5 w-3.5" />
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
                Dec 15, 2025
              </h2>
              <p className="text-sm text-muted-foreground">
                Amount: <span className="font-medium text-foreground">{currencyCode} 42,166.67</span> net
              </p>
            </div>
          </div>

          <div className="bg-background rounded-xl p-4 sm:p-5 border border-border/30">
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Next payout</span>
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
                Jan 15, 2025
              </h2>
              <p className="text-sm text-muted-foreground">
                Please submit adjustments before Jan 10.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Contractor hero — verbatim from F42v81_InvoiceHeroCard (currency EUR). */
function InvoiceHeroCard({ currencyCode = "EUR" }: { currencyCode?: string }) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/20 overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Last Invoice Tile - with light purple tint */}
          <div
            role="button"
            tabIndex={0}
            className="group bg-primary/[0.06] hover:bg-primary/[0.1] rounded-xl p-4 sm:p-5 border border-primary/20 cursor-pointer transition-colors focus-visible:outline-none focus-visible:bg-primary/[0.1]"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 text-emphasis/80">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Last invoice</span>
              </div>
              <span className="flex items-center gap-1 text-sm text-emphasis/70 group-hover:text-emphasis transition-colors">
                View details
                <ChevronRight className="h-4 w-4" />
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
                Dec 15, 2025
              </h2>
              <p className="text-sm text-muted-foreground">
                Amount: <span className="font-medium text-foreground">{currencyCode} 5,250.00</span> net
              </p>
            </div>
          </div>

          {/* Next Invoice Tile */}
          <div className="bg-background rounded-xl p-4 sm:p-5 border border-border/30">
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Next invoice</span>
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
                Jan 15, 2025
              </h2>
              <p className="text-sm text-muted-foreground">
                Please submit adjustments before Jan 10.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const PayoutInvoiceHero: Story = {
  name: "Payout & Invoice Hero",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Payout & Invoice Hero"
        lead={<>The hero card that opens the employee and contractor dashboards — a tinted "Last payout / Last invoice" tile (bg-primary/[0.06] border-primary/20) with a download or view-details affordance, sitting beside a plain "Next payout / Next invoice" tile. Markup verbatim from F41v81_PayoutHeroCard and F42v81_InvoiceHeroCard.</>}
        meta="Verbatim from F4.1 · F4.2 · Payout & invoice hero (v8.1)"
      />

      <h3 style={eyebrow}>Payout hero (employee)</h3>
      <PayoutHeroCard />
      <p style={{ ...note, marginTop: 10 }}>F41v81_PayoutHeroCard · outer rounded-xl border-border/40 bg-card/20 · grid grid-cols-1 md:grid-cols-2 gap-4 · Last-payout tile bg-primary/[0.06] hover:bg-primary/[0.1] border-primary/20 with FileText + "Download" affordance (text-emphasis per a11y swap) · Next-payout tile bg-background border-border/30 with Calendar · big date text-2xl sm:text-3xl font-semibold.</p>

      <h3 style={eyebrow}>Invoice hero (contractor)</h3>
      <InvoiceHeroCard />
      <p style={{ ...note, marginTop: 10 }}>F42v81_InvoiceHeroCard · same shell as the payout hero · Last-invoice tile carries a "View details" affordance with ChevronRight (text-emphasis) · amount EUR 5,250.00 net · Next-invoice tile identical structure to Next payout.</p>

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={160} rows={[
        ["Shell", "Bordered card wrapping a 2-up tile grid", "rounded-xl border-border/40 bg-card/20 overflow-hidden · inner p-4 sm:p-6 · grid grid-cols-1 md:grid-cols-2 gap-4"],
        ["Last tile", "Tinted, interactive; FileText label + Download / View details", "group bg-primary/[0.06] hover:bg-primary/[0.1] border-primary/20 rounded-xl p-4 sm:p-5 · label text-emphasis/80 · action text-emphasis/70 group-hover:text-emphasis"],
        ["Next tile", "Plain; Calendar label + upcoming date + hint", "bg-background border-border/30 rounded-xl p-4 sm:p-5 · label text-muted-foreground"],
        ["Big value", "Date headline + amount / hint line", "h2 text-2xl sm:text-3xl font-semibold text-foreground tracking-tight · amount span font-medium text-foreground"],
      ]} />
    </div>
  ),
};
