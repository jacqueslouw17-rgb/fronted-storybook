import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Briefcase, Building2, Calendar, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight,
  CircleAlert, Clock, Download, ExternalLink, Eye, FileSignature, FileText, Globe2, GripVertical, Info, Loader2, Lock, MoreHorizontal,
  Pencil, Plus, Receipt, RotateCcw, Search, Send, Settings, Shield, ShieldCheck, Trash2, TriangleAlert, Upload, User, Users, X, XCircle,
} from "lucide-react";
import { Icon, ICON_SIZE, HIT_TARGET_MIN, type IconSize, type IconTone } from "./icon";
import { Typography } from "../typography/typography";

/**
 * Components — Icon.
 * Lucide only, 2px stroke at every size, sizes on the 4px grid (12, 14, 16, 20, 24), coloured by
 * semantic tones. Decorative by default; give it a label when nothing next to it says what it means.
 */
const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs", "icon", "lucide", "atom"],
  parameters: { layout: "padded" },
  argTypes: { icon: { control: false } },
};
export default meta;
type Story = StoryObj<typeof Icon>;

/** The one to try: size, tone and label in Controls */
export const Playground: Story = { args: { icon: ArrowUpRight, size: "md", tone: "inherit" } };

/** Five sizes, each on the 4px grid; md (16) is the default beside body text */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-end" }}>
      {(Object.keys(ICON_SIZE) as IconSize[]).map((s) => (
        <div key={s} style={{ display: "grid", justifyItems: "center", gap: 8 }}>
          <Icon icon={Search} size={s} />
          <Typography variant="caption">{s} · {ICON_SIZE[s]}</Typography>
        </div>
      ))}
    </div>
  ),
};

const TONES: IconTone[] = ["inherit", "strong", "muted", "brand", "success", "warning", "danger", "disabled"];
/** Tones: semantic only. Brand is the teal ink; yellow is for buttons, never for icons */
export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
      {TONES.map((t) => (
        <div key={t} style={{ display: "grid", justifyItems: "center", gap: 8 }}>
          <Icon icon={CircleAlert} size="lg" tone={t} />
          <Typography variant="caption">{t}</Typography>
        </div>
      ))}
    </div>
  ),
};

/** Beside text: the icon takes the text's colour and sits on its line */
export const WithText: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Typography variant="body" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Icon icon={Clock} size="sm" tone="warning" />2 unpublished changes</Typography>
      <Typography variant="body" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Icon icon={Check} size="sm" tone="success" />Published v5 · new cases · from 11 Nov 2026</Typography>
      <Typography variant="label" color="heading" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>Rules they follow<Icon icon={ArrowUpRight} size="sm" tone="muted" /></Typography>
    </div>
  ),
};

/** Icon only: a label says what it does, and the target is at least 24px */
export const IconOnly: Story = {
  name: "Without text",
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      {[{ i: X, l: "Close" }, { i: MoreHorizontal, l: "More actions" }, { i: Pencil, l: "Edit" }].map(({ i, l }) => (
        <button key={l} type="button" aria-label={l} title={l}
          style={{ minWidth: HIT_TARGET_MIN + 8, minHeight: HIT_TARGET_MIN + 8, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "1px solid var(--ds-color-border)", background: "var(--ds-color-surface)", color: "var(--ds-color-text)", cursor: "pointer" }}>
          <Icon icon={i} size="md" />
        </button>
      ))}
    </div>
  ),
};

/** The icons the prototype and the flow canvas already use, so new work picks from the same set */
const SET = {
  Navigation: { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, ChevronDown, ExternalLink },
  Actions: { Plus, Pencil, Trash2, Search, Download, Upload, Send, RotateCcw, GripVertical, MoreHorizontal, X, Settings, Eye },
  Status: { Check, CheckCircle2, CircleAlert, TriangleAlert, XCircle, Info, Clock, Loader2, Lock, Shield, ShieldCheck },
  Things: { User, Users, Briefcase, Building2, Calendar, FileText, FileSignature, Receipt, Globe2 },
};
export const InUse: Story = {
  name: "In use",
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      {Object.entries(SET).map(([group, icons]) => (
        <section key={group}>
          <Typography variant="overline" color="muted" style={{ display: "block", marginBottom: 12 }}>{group}</Typography>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
            {Object.entries(icons).map(([name, glyph]) => (
              <div key={name} style={{ display: "grid", justifyItems: "center", gap: 8, padding: 12, borderRadius: 12, border: "1px solid var(--ds-color-border)", background: "var(--ds-color-surface)" }}>
                <Icon icon={glyph} size="lg" />
                <Typography variant="caption" style={{ fontFamily: "var(--ds-font-mono)" }}>{name}</Typography>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};
