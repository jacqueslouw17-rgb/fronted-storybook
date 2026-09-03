import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Settings (verbatim from the LIVE F1 Fronted admin client settings).
 * Reached from the company switcher's gear. In the interim prototype it has exactly two
 * surfaces: a Settings landing (Company + Managers cards), the Company details form (with a
 * documents list), and the Managers assignment list (mark workers as managers). No
 * Administrators / Team Members / Roles & Permissions / Country Templates exist in the live
 * interim build — those are not included. Markup captured verbatim from the live DOM.
 */
const meta: Meta = { title: "Patterns/Settings", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const H1 = ({ children }: { children: React.ReactNode }) => <h1 className="text-2xl font-bold text-foreground">{children}</h1>;
function Field({ label, value, placeholder }: { label: string; value?: string; placeholder?: string }) {
  return <div className="space-y-1.5"><Label className="text-xs font-medium text-foreground/75">{label}</Label><Input readOnly defaultValue={value} placeholder={placeholder} className="h-9" /></div>;
}
function LandingCard({ title, desc }: { title: string; desc: string }) {
  return (
    <button className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border border-border/30 bg-card/20 transition-all text-left group hover:bg-card/40 hover:border-border/50">
      <div className="min-w-0"><p className="text-sm font-medium text-foreground">{title}</p><p className="text-xs text-muted-foreground mt-0.5">{desc}</p></div>
      <ChevronRight className="h-4 w-4 text-muted-foreground/60 shrink-0" />
    </button>
  );
}
function DocRow({ name, file }: { name: string; file: string }) {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border border-border/40 bg-card/30">
      <div className="min-w-0"><p className="text-sm font-medium text-foreground truncate">{name}</p><p className="text-[11px] text-muted-foreground truncate">{file}</p></div>
      <div className="flex items-center gap-3 shrink-0"><button className="text-[11px] font-medium text-foreground/80 hover:text-foreground hover:underline">View</button><button className="text-[11px] font-medium text-muted-foreground hover:text-destructive">Remove</button></div>
    </div>
  );
}
function ManagerRow({ initials, name, flag, role, on }: { initials: string; name: string; flag: string; role: string; on?: boolean }) {
  return (
    <div className="flex flex-col rounded-lg border border-border/30 bg-card px-3 py-3 sm:px-4 hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[11px] font-medium text-muted-foreground shrink-0">{initials}</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 min-w-0"><span className="text-sm font-medium text-foreground truncate">{name}</span><span className="text-xs shrink-0">{flag}</span></div>
          <div className="flex items-center gap-1.5 min-w-0"><span className="text-xs text-muted-foreground truncate">{role}</span></div>
        </div>
        <div className="flex items-center gap-2 shrink-0"><span className="hidden sm:inline text-xs text-muted-foreground">Manager</span><Switch defaultChecked={on} /></div>
      </div>
    </div>
  );
}

export const Settings: Story = {
  name: "Settings",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Settings"
        lead={<>The Fronted admin client settings, reached from the company switcher's gear. In the interim prototype it is exactly two surfaces — a landing with <strong>Company</strong> and <strong>Managers</strong>, the Company details form (with a documents list), and the Managers assignment list. Captured verbatim from demofronted.live. <em>Administrators, Team Members, Roles &amp; Permissions and Country Templates are not in the interim build, so they are not shown here.</em></>}
        meta="Verbatim from live F1 · Client settings (fronted-admin-dashboard-v6-1-clone)"
      />

      <h3 style={eyebrow}>Settings landing</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <div className="w-[520px] max-w-full">
          <div className="mb-4"><H1>Acme Corp Settings</H1><p className="text-sm text-muted-foreground mt-1">Manage your company information, workspace and more.</p></div>
          <div className="space-y-2">
            <LandingCard title="Company" desc="Update your company details and access your documents" />
            <LandingCard title="Managers" desc="Set which workers are managers and assign them to workers" />
          </div>
        </div>
      </div>
      <p style={{ ...note, marginTop: 4 }}>Landing card = w-full flex justify-between px-4 py-3.5 rounded-xl border-border/30 bg-card/20 hover:bg-card/40 · title text-sm font-medium · desc text-xs text-muted-foreground · trailing ChevronRight. Only Company + Managers exist.</p>

      <h3 style={eyebrow}>Company details</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <div className="w-[520px] max-w-full">
          <div className="mb-4"><H1>Change Acme Corp details</H1><p className="text-sm text-muted-foreground mt-1">Update your company details below.</p></div>
          <div className="bg-card/40 border border-border/40 rounded-lg p-4 space-y-4">
            <Field label="Company Name" value="Acme Corp" />
            <div className="space-y-1.5"><Label className="text-xs font-medium text-foreground/75">Country</Label><button className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm"><span>🇸🇪 Sweden</span><ChevronRight className="h-4 w-4 opacity-50 rotate-90" /></button></div>
            <Field label="Address (Optional)" placeholder="" />
            <Field label="Phone (Optional)" placeholder="" />
            <div className="space-y-2">
              <Label className="text-xs font-medium text-foreground/75">Documents</Label>
              <DocRow name="Master Service Agreement" file="Test document 1.pdf" />
              <label className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-border/60 px-3 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted/30 hover:text-foreground">Add another document</label>
              <p className="text-[11px] text-muted-foreground/70">PDF, JPG, or PNG up to 5MB</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4"><Button variant="outline" className="flex-1">Back</Button><Button className="flex-1">Save Changes</Button></div>
        </div>
      </div>
      <p style={{ ...note, marginTop: 4 }}>Card bg-card/40 border-border/40 rounded-lg p-4 space-y-4 · Field = Label text-xs font-medium text-foreground/75 + Input h-9 · Documents = doc rows (View / Remove) + dashed “Add another document” + 5MB hint · footer Back / Save Changes.</p>

      <h3 style={eyebrow}>Managers</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <div className="w-[520px] max-w-full">
          <div className="mb-4"><H1>Managers</H1><p className="text-sm text-muted-foreground mt-1">Set which workers are managers, and assign each worker to one or more managers.</p></div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-muted-foreground mr-1">4 workers</span>
            <span className="inline-flex items-center rounded-full px-3 h-7 text-xs font-medium bg-primary/[0.08] text-emphasis border border-primary/30">All 4</span>
            <span className="inline-flex items-center rounded-full px-3 h-7 text-xs font-medium text-muted-foreground border border-border/40">Managers 0</span>
          </div>
          <div className="p-3 sm:p-4 space-y-1.5 rounded-xl border border-border/40 bg-card/20">
            <ManagerRow initials="MS" name="Maria Santos" flag="🇵🇭" role="Full-Stack Developer" />
            <ManagerRow initials="LO" name="Liam O'Brien" flag="🇮🇪" role="DevOps Engineer" />
            <ManagerRow initials="DH" name="Diego Hernández" flag="🇲🇽" role="Backend Engineer" />
            <ManagerRow initials="RC" name="Rafael Costa" flag="🇵🇹" role="Mobile Developer" />
          </div>
        </div>
      </div>
      <p style={{ ...note, marginTop: 4 }}>Filter pills rounded-full (active bg-primary/[0.08] text-emphasis border-primary/30) · row rounded-lg border-border/30 bg-card px-3 py-3 · avatar h-8 w-8 rounded-full bg-muted · name/flag/role · “Manager” label + Switch.</p>

      <h3 style={eyebrow}>What's in the interim Settings</h3>
      <DocTable head={["Surface", "In interim prototype?", "Detail"]} w0={200} rows={[
        ["Company", "Yes", "Name · Country · Address · Phone + Documents (View / Remove / Add)"],
        ["Managers", "Yes", "Worker list with All / Managers filter + Manager toggle per worker"],
        ["End-client Administrators", "No — not built", "resend-invite / reset-password panel was specced, not in the live flow"],
        ["Team Members + Roles & Permissions", "No — not built", "not present in the interim client settings"],
        ["Country Templates (section + drawer)", "No — not built", "country defaults appear only inside contract creation, not as a settings section"],
      ]} />
    </div>
  ),
};
