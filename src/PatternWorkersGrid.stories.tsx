import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Workers Grid (verbatim from F6 Company admin, F6v41_WorkersGrid).
 * A read-only roster: a sunken container Card holding a centered, wrapping grid of
 * fixed-width worker cards. Each card shows name + flag + Active badge, role, a divided
 * meta block (fee / country / type) and a full-width View button. Markup verbatim from
 * source (primary text uses text-emphasis per the system's a11y swap).
 */
const meta: Meta = { title: "Patterns/Workers Grid", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

interface Worker {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  role: string;
  salary: string;
  employmentType: "contractor" | "employee";
}

const PAYROLL_WORKERS: Worker[] = [
  { id: "1", name: "Marcus Chen", country: "Singapore", countryFlag: "🇸🇬", role: "Senior Backend Engineer", salary: "SGD 12,000/mo", employmentType: "contractor" },
  { id: "2", name: "Sofia Rodriguez", country: "Spain", countryFlag: "🇪🇸", role: "Product Designer", salary: "EUR 6,500/mo", employmentType: "contractor" },
  { id: "3", name: "Maria Santos", country: "Philippines", countryFlag: "🇵🇭", role: "Full-Stack Developer", salary: "PHP 280,000/mo", employmentType: "employee" },
  { id: "4", name: "Alex Hansen", country: "Norway", countryFlag: "🇳🇴", role: "Engineering Manager", salary: "NOK 65,000/mo", employmentType: "employee" },
  { id: "5", name: "David Martinez", country: "Portugal", countryFlag: "🇵🇹", role: "Growth Marketer", salary: "EUR 4,200/mo", employmentType: "contractor" },
  { id: "6", name: "Emma Wilson", country: "Norway", countryFlag: "🇳🇴", role: "Data Analyst", salary: "NOK 72,000/mo", employmentType: "contractor" },
  { id: "7", name: "Jonas Schmidt", country: "Germany", countryFlag: "🇩🇪", role: "Compliance Officer", salary: "EUR 5,800/mo", employmentType: "employee" },
  { id: "8", name: "Aditi Sharma", country: "India", countryFlag: "🇮🇳", role: "Senior Consultant", salary: "INR 320,000/mo", employmentType: "contractor" },
];

/* ── Single worker card — verbatim from F6v41_WorkersGrid ── */
function WorkerCard({ contractor }: { contractor: Worker }) {
  return (
    <Card className="w-[280px] border border-border/40 bg-card group hover:border-border transition-colors">
      <CardContent className="p-2.5 space-y-0">
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[13px] text-foreground truncate">{contractor.name}</span>
              <span className="text-sm">{contractor.countryFlag}</span>
              <Badge
                variant="outline"
                className={cn(
                  "text-[9px] px-1.5 py-0 h-[14px] flex-shrink-0 pointer-events-none ml-auto",
                  "bg-accent-green-fill/10 text-accent-green-text border-accent-green-outline/20"
                )}
              >
                Active
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate">{contractor.role}</p>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-border/30 flex flex-col gap-1 text-[11px]">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{contractor.employmentType === "employee" ? "Monthly Salary" : "Monthly Fee"}</span>
            <span className="font-medium text-foreground tabular-nums">{contractor.salary}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Country</span>
            <span className="font-medium text-foreground">{contractor.country}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Type</span>
            <span className="font-medium text-foreground">{contractor.employmentType === "contractor" ? "Contractor (COR)" : "Employee (EOR)"}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-3">
          <Button variant="outline" size="sm" className="w-full text-xs h-7 gap-1 hover:bg-foreground hover:text-background">
            <Eye className="h-3 w-3" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* ── Full grid container — verbatim from F6v41_WorkersGrid ── */
function WorkersGrid() {
  return (
    <div className="space-y-4">
      <Card className="border border-border/40 shadow-none bg-card/20">
        <CardContent className="p-5">
          <div className="flex flex-wrap justify-center gap-3">
            {PAYROLL_WORKERS.map((contractor) => (
              <WorkerCard key={contractor.id} contractor={contractor} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const WorkersGrid_: Story = {
  name: "Workers Grid",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Workers Grid"
        lead={<>The read-only workers roster from the Company admin. A sunken container Card wraps a centered, flex-wrapping grid of fixed 280px worker cards. Each card carries name + flag + Active badge, role, a divided meta block (Monthly Fee/Salary · Country · Type) and a full-width View button that opens the read-only detail drawer. Markup verbatim from F6v41_WorkersGrid.</>}
        meta="Verbatim from F6 · Workers grid (company-admin-v4-1-clone)"
      />

      <h3 style={eyebrow}>Grid</h3>
      <div style={{ padding: "8px 0" }}><WorkersGrid /></div>
      <p style={{ ...note, marginTop: 10 }}>Container Card border-border/40 shadow-none bg-card/20 · CardContent p-5 · inner flex flex-wrap justify-center gap-3 · each card w-[280px] border-border/40 bg-card, hover:border-border.</p>

      <h3 style={eyebrow}>Worker card</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}><WorkerCard contractor={PAYROLL_WORKERS[0]} /></div>
      <p style={{ ...note, marginTop: 10 }}>Header row: name (font-semibold text-[13px]) + flag + ml-auto Active badge (bg-accent-green-fill/10 text-accent-green-text) · role text-xs muted · divided meta block mt-3 pt-2.5 border-t border-border/30 with fee/country/type rows text-[11px] · View button h-7 hover:bg-foreground hover:text-background.</p>

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={150} rows={[
        ["Container", "Sunken card holding the grid", "Card border-border/40 shadow-none bg-card/20 · CardContent p-5"],
        ["Grid", "Centered wrapping row of cards", "flex flex-wrap justify-center gap-3"],
        ["Card", "Fixed 280px worker cell, hover border", "w-[280px] border-border/40 bg-card · hover:border-border · CardContent p-2.5"],
        ["Header", "Name + flag + right-aligned Active badge; role below", "name text-[13px] font-semibold · badge ml-auto bg-accent-green-fill/10"],
        ["Meta block", "Fee/Salary · Country · Type key/value rows", "mt-3 pt-2.5 border-t border-border/30 · rows flex justify-between text-[11px]"],
        ["View action", "Full-width outline button opens detail drawer", "w-full h-7 gap-1 · hover:bg-foreground hover:text-background · Eye"],
      ]} />
    </div>
  ),
};
