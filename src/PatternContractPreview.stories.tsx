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

const V = ({ children }: { children: React.ReactNode }) => <span className="bg-yellow-200 text-foreground px-0.5 font-semibold">{children}</span>;

/* Candidate card — header + collapsible section triggers, verbatim from F1v6_ContractDraftWorkspace left column */
const SECTIONS = ["Personal Details", "Contract Details", "Terms & Entitlements"];
const CandidateCard = () => (
  <div className="rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
    <div className="px-5 py-4 border-b border-border/30">
      <div className="flex items-center gap-3">
        <span className="text-3xl">🇸🇬</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm truncate">Marcus Chen</h3>
          <p className="text-xs text-muted-foreground truncate">Senior Backend Engineer</p>
        </div>
      </div>
    </div>
    <div className="pb-3">
      {SECTIONS.map((s, i) => (
        <button
          key={s}
          className={`w-full px-5 py-3 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors group${i < SECTIONS.length - 1 ? " border-b border-border/20" : ""}`}
        >
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{s}</p>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/60 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </button>
      ))}
    </div>
  </div>
);

export const ContractPreview: Story = {
  name: "Contract Preview",
  render: () => (
    <div>
      <div style={wrap}>
        <h2 className="ds-h2" style={{ marginBottom: 2 }}>Reviewing Marcus's Contract</h2>
        <p className="ds-body" style={{ color: "var(--ds-color-text-muted)", marginBottom: 16 }}>Preview how this contract will appear to the worker before sending for signature.</p>

        <div className="flex flex-col lg:flex-row gap-2 items-start mx-auto" style={{ maxWidth: 1040 }}>
          {/* mobile: collapsed sidebar summary above the doc */}
          <div className="lg:hidden w-full">
            <button className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-border/30 bg-card/20 hover:bg-card/40 transition-colors text-left">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl">🇸🇬</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">Marcus Chen</p>
                  <p className="text-xs text-muted-foreground truncate">Senior Backend Engineer · Singapore</p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground/60 shrink-0 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
            </button>
          </div>

          {/* desktop sidebar — hidden on mobile */}
          <div className="hidden lg:flex w-80 flex-shrink-0 flex-col gap-3">
            <CandidateCard />
            <div className="rounded-xl border border-border/40 bg-card px-4 py-3">
              <div className="flex items-center justify-between"><span className="text-xs font-medium">Edit history <span className="text-muted-foreground">10</span></span><ChevronDown className="h-3 w-3 text-muted-foreground/60" /></div>
              <p className="text-[11px] text-muted-foreground mt-1">Sarah Johnson · Agreement · 1h ago</p>
            </div>
          </div>

          {/* document — full width, responsive */}
          <div className="flex-1 w-full flex flex-col rounded-lg border border-border overflow-hidden">
            {/* Document toolbar */}
            <div className="bg-muted/80 border-b border-border/50 p-2 flex-shrink-0 flex items-center justify-between gap-2">
              <p className="text-xs sm:text-sm text-foreground pl-1">Review the contract details carefully before proceeding.</p>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button variant="ghost" size="sm" className="flex items-center gap-1.5 h-7 text-xs text-muted-foreground hover:text-foreground disabled:opacity-50 px-1.5 sm:px-3"><RotateCcw className="h-3.5 w-3.5" /><span className="hidden sm:inline">Reset</span></Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1.5 h-7 text-xs px-1.5 sm:px-3"><Pencil className="h-3.5 w-3.5" /><span className="hidden sm:inline">Edit</span></Button>
              </div>
            </div>
            {/* Contract content */}
            <div className="flex-1 min-h-0 overflow-y-auto bg-background">
              <div className="p-4 sm:p-6">
                <div className="space-y-4 select-none">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium mb-4 text-foreground">Contractor Agreement</h3>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">This Contract is between Fronted AS, a Norwegian Company, and <V>Marcus Chen</V>, <V>Singapore</V> (the "Contractor"). Any reference to the "Client" in the following is a reference to Fronted AS. Any reference to "End Client" in the following is a reference to the Client Company.</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-foreground">1. Work and payment</h3>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-foreground">1.1 Project.</h3>
                    <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">The Client is contracting the services of the Contractor to do the following: <V>Senior Backend Engineer</V>.</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-foreground">1.2 Schedule.</h3>
                    <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">The Contractor will begin performing their services on <V>2026-09-01</V> and will continue until termination of this Contract. This Contract can be ended by either Client or Contractor at any time, pursuant to the terms of Section 6, Term and Termination.</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-foreground">1.2.1 Work hours.</h3>
                    <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">Work hours are <V>8 hours per day</V>, with flexibility, but availability during CET business hours is required.</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-foreground">1.3 Payment.</h3>
                    <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">The Client shall pay the Contractor a fixed fee of <V>SGD 12,000</V> per month, payable against invoice, for the Services.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom bar */}
            <div className="flex-shrink-0 p-3 sm:p-4 flex items-center justify-between bg-background border-t border-border/50">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="sm:size-default sm:h-10">Back</Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground text-right hidden sm:inline">Scroll to end to confirm</span>
                <Button size="sm" disabled className="sm:size-default sm:h-10 whitespace-nowrap">Confirm &amp; Continue</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p style={note}>flex-col lg:flex-row · sidebar hidden lg:flex w-80 (mobile → collapsed summary) · doc flex-1 w-full · header text-xs sm:text-sm · Reset/Edit label hidden sm:inline · body p-4 sm:p-6 · heading text-base sm:text-lg · footer p-3 sm:p-4 · variables = yellow mark</p>
    </div>
  ),
};
