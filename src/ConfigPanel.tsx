import * as React from "react";
import { Button } from "./Button";
import "./tokens.css";
import "./ConfigPanel.css";

/**
 * Panel — Fronted DS · M1
 * Generic right slide-over (Sheet) + overlay. Placeholder content so it
 * reads as a reusable template. Two states via `readOnly`:
 *   - readOnly = true  → fields render as label / value rows (display)
 *   - readOnly = false → fields render as labelled inputs + footer actions
 * Styled entirely from the website token layer (--ds-*).
 */

export interface PanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  readOnly?: boolean;
}

const Chevron = () => (
  <svg className="ds-cp__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

type FieldDef = { label: string; value: string; optional?: boolean };

const CATEGORY_1: FieldDef[] = [
  { label: "Label 1", value: "Value" },
  { label: "Label 2", value: "Value" },
  { label: "Label 3", value: "Value", optional: true },
  { label: "Label 4", value: "Value" },
];
const CATEGORY_2: FieldDef[] = [
  { label: "Label 5", value: "Value" },
  { label: "Label 6", value: "Value", optional: true },
  { label: "Label 7", value: "Value" },
];

function Section({
  title,
  fields,
  readOnly,
}: {
  title: string;
  fields: FieldDef[];
  readOnly: boolean;
}) {
  const [open, setOpen] = React.useState(true);
  return (
    <section className={"ds-cp__acc" + (open ? " is-open" : "")}>
      <button className="ds-cp__acc-trigger" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="ds-cp__acc-title">{title}</span>
        <span className="ds-cp__acc-spacer" />
        <Chevron />
      </button>
      <div className="ds-cp__acc-panel">
        {fields.map((f) =>
          readOnly ? (
            <div className="ds-cp__row" key={f.label}>
              <span className="ds-cp__row-label">{f.label}</span>
              <span className="ds-cp__row-value">{f.value}</span>
            </div>
          ) : (
            <div className="ds-cp__field" key={f.label}>
              <label>
                {f.label}
                {f.optional ? <span className="ds-cp__opt">Optional</span> : null}
              </label>
              <input className="ds-cp__control" defaultValue={f.value} placeholder="Placeholder" />
            </div>
          )
        )}
      </div>
    </section>
  );
}

export function ConfigPanel({ open, onOpenChange, readOnly = false }: PanelProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onOpenChange(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  return (
    <div
      className={"ds-cp" + (open ? " is-open" : "")}
      aria-hidden={!open}
      style={{ position: "absolute", inset: 0, zIndex: 40, pointerEvents: open ? "auto" : "none" }}
    >
      <div className="ds-cp__overlay" onClick={() => onOpenChange(false)} />
      <aside className="ds-cp__sheet" role="dialog" aria-modal="true" aria-label="Panel">
        <header className="ds-cp__head">
          <div className="ds-cp__head-text">
            <div className="ds-cp__title">Main header</div>
            <div className="ds-cp__sub">Supporting subtext line</div>
          </div>
          <button className="ds-cp__close" aria-label="Close" onClick={() => onOpenChange(false)}>
            ✕
          </button>
        </header>

        <div className="ds-cp__body">
          <Section title="Category 1" fields={CATEGORY_1} readOnly={readOnly} />
          <Section title="Category 2" fields={CATEGORY_2} readOnly={readOnly} />
        </div>

        {!readOnly && (
          <footer className="ds-cp__foot">
            <Button variant="secondary">Secondary</Button>
            <Button variant="primary">Primary</Button>
          </footer>
        )}
      </aside>
    </div>
  );
}

export default ConfigPanel;
