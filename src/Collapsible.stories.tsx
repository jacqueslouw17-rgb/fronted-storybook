import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";
import { Guidance } from "./guidance";

/**
 * Components — Collapsible (Radix, verbatim ui/collapsible).
 * The expand/collapse section from drawers and forms. Trigger is a full-width row
 * (justify-between, hover:bg-muted/30) with a chevron that rotates when open.
 */
const meta: Meta = { title: "Components/Collapsible", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 940, padding: 4 };
const th: React.CSSProperties = { textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", background: "var(--ds-color-surface-sunken)", borderBottom: "1px solid var(--ds-color-border)" };
const td: React.CSSProperties = { padding: "16px", borderBottom: "1px solid var(--ds-color-border)", verticalAlign: "top" };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)" };

function Section({ title, open, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <Collapsible defaultOpen={open} className="w-full max-w-[380px] rounded-lg border border-border/40 bg-card overflow-hidden">
      <CollapsibleTrigger className="w-full px-5 py-3 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors group">
        <span className="text-sm font-medium">{title}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent><div className="px-3 py-2 text-xs text-muted-foreground space-y-1 mt-1 border-t border-border/20">{children}</div></CollapsibleContent>
    </Collapsible>
  );
}

export const CollapsibleStory: Story = {
  name: "Collapsible",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Collapsible"
        lead={<>
        Expand/collapse section used in drawers and forms. Click the row to toggle; the chevron rotates.
        </>}
      />

      <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: "var(--ds-radius-card)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><th style={{ ...th, width: 130 }}>State</th><th style={th}>Example</th><th style={{ ...th, width: 250 }}>Notes</th></tr></thead>
          <tbody>
            <tr style={{ background: "var(--ds-color-surface)" }}>
              <td style={{ ...td, fontSize: 13, fontWeight: 600 }}>Open</td>
              <td style={td}><Section title="Compensation details" open><div>Base salary · NOK 65,000 / mo</div><div>Payment · Bank transfer, monthly</div></Section></td>
              <td style={{ ...td, ...note }}>chevron rotate-180 · content revealed</td>
            </tr>
            <tr style={{ background: "var(--ds-color-bg)" }}>
              <td style={{ ...td, fontSize: 13, fontWeight: 600 }}>Closed</td>
              <td style={td}><Section title="Compliance documents"><div>Contract · signed</div></Section></td>
              <td style={{ ...td, ...note }}>chevron default · content hidden</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p style={{ ...note, marginTop: 12 }}>Trigger: w-full px-5 py-3 justify-between hover:bg-muted/30 · chevron rotate-180 on open · content px-3 py-2 text-xs.</p>

      <h3 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "30px 0 12px", fontWeight: 600 }}>Sequential form sections (F2 &amp; F3 onboarding — SectionAccordion)</h3>
      <div className="w-full max-w-[460px] space-y-2">
        <SeqSection title="Personal Details" state="open">
          <div className="space-y-3">
            <div className="space-y-1.5"><span className="text-xs font-medium text-foreground/75 block">Full name</span><div className="h-10 rounded-md border border-input bg-muted/50 px-3 flex items-center text-sm text-foreground">Maria Santos</div></div>
            <button className="w-full h-9 rounded-md bg-gradient-primary text-primary-foreground text-sm font-medium">Continue</button>
          </div>
        </SeqSection>
        <SeqSection title="Pre-employment Requirements" state="available" />
        <SeqSection title="Bank Details" state="locked" />
      </div>
      <p style={{ ...note, marginTop: 12 }}>container rounded-xl border-border/30 bg-card/20 · locked = opacity-60 cursor-not-allowed + “Complete the previous section first” · open reveals the form + gradient Continue · chevron rotate-180 on open · one section open at a time</p>
      <Guidance k="collapsible" />
    </div>
  ),
};

/** F2/F3 SectionAccordion — verbatim shared/SectionAccordion (open / available / locked). */
function SeqSection({ title, state, children }: { title: string; state: "open" | "available" | "locked"; children?: React.ReactNode }) {
  const locked = state === "locked";
  return (
    <div className={cn("rounded-xl border border-border/30 bg-card/20 overflow-hidden transition-all", locked && "opacity-60")}>
      <div className={cn("w-full px-5 py-4 flex items-center justify-between", locked ? "cursor-not-allowed" : "hover:bg-card/40 cursor-pointer")}>
        <div>
          <p className="text-sm font-medium text-foreground">{title}</p>
          {locked && <p className="text-[11px] text-muted-foreground mt-0.5">Complete the previous section first</p>}
        </div>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground/60 shrink-0 transition-transform", state === "open" && "rotate-180")} />
      </div>
      {state === "open" && children && <div className="border-t border-border/20 px-5 py-4">{children}</div>}
    </div>
  );
}
