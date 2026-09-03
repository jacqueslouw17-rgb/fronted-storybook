import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { ChevronDown, RotateCcw, Pencil } from "lucide-react";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Contract Preview / E-Sign (verbatim responsive from F1v6_ContractDraftWorkspace).
 * Mobile-first: on mobile the layout stacks (flex-col) and the sidebar collapses to a
 * summary above the doc; on lg+ it becomes a two-column workspace (flex-row) with the
 * w-80 sidebar (candidate + section nav + edit history) beside the full-width document.
 * Dynamic values are yellow highlights; the footer is gated on scroll-to-end.
 */
const meta: Meta = { title: "Patterns/Contract Preview", parameters: { layout: "fullscreen" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", padding: 16 };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)", marginTop: 12, padding: "0 16px" };

const V = ({ children }: { children: React.ReactNode }) => <mark className="bg-yellow-100 text-foreground rounded-sm px-0.5">{children}</mark>;

const WorkerCard = () => (
  <div className="rounded-xl border border-border/40 bg-card p-4">
    <div className="flex items-center gap-2"><span>🇸🇬</span><span className="text-sm font-semibold">Marcus Chen</span></div>
    <p className="text-xs text-muted-foreground mt-0.5">Senior Backend Engineer</p>
  </div>
);
const SectionNav = () => (
  <div className="rounded-xl border border-border/40 bg-card overflow-hidden divide-y divide-border/30">
    {["Personal details", "Contract details", "Terms & entitlements"].map((s) => (
      <button key={s} className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">{s}</span>
        <ChevronDown className="h-3 w-3 text-muted-foreground/60" />
      </button>
    ))}
  </div>
);

export const ContractPreview: Story = {
  name: "Contract Preview",
  render: () => (
    <div>
      <div style={wrap}>
        <h2 className="ds-h2" style={{ marginBottom: 2 }}>Reviewing Marcus's Contract</h2>
        <p className="ds-body" style={{ color: "var(--ds-color-text-muted)", marginBottom: 16 }}>Preview how this contract will appear to the worker before sending for signature.</p>

        <div className="flex flex-col lg:flex-row gap-3 items-start mx-auto" style={{ maxWidth: 1040 }}>
          {/* mobile: collapsed sidebar summary above the doc */}
          <div className="lg:hidden w-full">
            <button className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-border/30 bg-card/20 hover:bg-card/40 transition-colors text-left">
              <span className="flex items-center gap-2"><span>🇸🇬</span><span className="text-sm font-semibold">Marcus Chen</span><span className="text-xs text-muted-foreground">· sections & history</span></span>
              <ChevronDown className="h-4 w-4 text-muted-foreground/60 shrink-0" />
            </button>
          </div>

          {/* desktop sidebar — hidden on mobile */}
          <div className="hidden lg:flex w-80 flex-shrink-0 flex-col gap-3">
            <WorkerCard />
            <SectionNav />
            <div className="rounded-xl border border-border/40 bg-card px-4 py-3">
              <div className="flex items-center justify-between"><span className="text-xs font-medium">Edit history <span className="text-muted-foreground">10</span></span><ChevronDown className="h-3 w-3 text-muted-foreground/60" /></div>
              <p className="text-[11px] text-muted-foreground mt-1">Sarah Johnson · Agreement · 1h ago</p>
            </div>
          </div>

          {/* document — full width, responsive */}
          <div className="flex-1 w-full rounded-xl border border-border/40 bg-card overflow-hidden">
            <div className="flex items-center justify-between gap-2 px-4 sm:px-5 py-3 border-b border-border/40">
              <span className="text-xs sm:text-sm text-muted-foreground truncate">Review the contract details carefully before proceeding.</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5 text-muted-foreground px-1.5 sm:px-3"><RotateCcw className="h-3 w-3" /><span className="hidden sm:inline">Reset</span></Button>
                <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 px-1.5 sm:px-3"><Pencil className="h-3 w-3" /><span className="hidden sm:inline">Edit</span></Button>
              </div>
            </div>
            <div className="p-4 sm:p-6 text-xs sm:text-sm leading-relaxed space-y-3">
              <h3 className="text-base sm:text-lg font-medium">Contractor Agreement</h3>
              <p>This Contract is between Fronted AS, a Norwegian Company, and <V>Marcus Chen</V>, <V>Singapore</V> (the "Contractor").</p>
              <p className="font-medium">1. Work and payment</p>
              <p><span className="font-medium">1.1 Project.</span> The Client is contracting the services of the Contractor to do the following: <V>Senior Backend Engineer</V>.</p>
              <p><span className="font-medium">1.2 Schedule.</span> The Contractor will begin performing their services on <V>2026-09-01</V> and will continue until termination of this Contract.</p>
              <p><span className="font-medium">1.3 Payment.</span> The Client shall pay the Contractor a fixed fee of <V>SGD 12,000/mo</V> per month, payable against invoice.</p>
            </div>
            <div className="flex items-center justify-between gap-2 p-3 sm:p-4 border-t border-border/40">
              <Button variant="outline" size="sm" className="h-8 text-xs">Back</Button>
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="text-xs text-muted-foreground hidden sm:inline">Scroll to end to confirm</span>
                <Button size="sm" disabled className="h-8 text-xs bg-gradient-primary disabled:opacity-50 whitespace-nowrap">Confirm &amp; Continue</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p style={note}>flex-col lg:flex-row · sidebar hidden lg:flex w-80 (mobile → collapsed summary) · doc flex-1 w-full · header text-xs sm:text-sm · Reset/Edit label hidden sm:inline · body p-4 sm:p-6 · heading text-base sm:text-lg · footer p-3 sm:p-4 · variables = yellow mark</p>
    </div>
  ),
};
