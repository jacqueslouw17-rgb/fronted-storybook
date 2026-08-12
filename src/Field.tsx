import * as React from "react";
import { Button } from "./Button";
import "./tokens.css";
import "./Field.css";

/**
 * Field — Fronted DS · Components.
 * A labelled input with states: default, focus, read-only, error, disabled.
 * `FieldConfigurator` is the "+ Add field" flow: pick a type, label, value/
 * options, required — then it renders as a real Field. Token-driven (--ds-*).
 */

export type FieldType =
  | "text" | "number" | "amount" | "date" | "daterange"
  | "time" | "select" | "boolean" | "file" | "country" | "email" | "phone";

export const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "amount", label: "Amount" },
  { value: "date", label: "Date" },
  { value: "daterange", label: "Date range" },
  { value: "time", label: "Time" },
  { value: "select", label: "Dropdown" },
  { value: "boolean", label: "Yes / No" },
  { value: "file", label: "File" },
  { value: "country", label: "Country" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
];

export interface FieldProps {
  label: string;
  value?: string;
  placeholder?: string;
  type?: FieldType;
  optional?: boolean;
  helper?: string;
  error?: string;
  readOnly?: boolean;
  disabled?: boolean;
  options?: string[];
  /** demo-only: show the focus ring without real focus (for stories) */
  forceFocus?: boolean;
}

const nativeType = (t?: FieldType) =>
  t === "number" || t === "amount" ? "number"
  : t === "date" ? "date"
  : t === "time" ? "time"
  : t === "email" ? "email"
  : t === "phone" ? "tel"
  : "text";

export function Field({
  label, value, placeholder = "Placeholder", type = "text",
  optional, helper, error, readOnly, disabled, options, forceFocus,
}: FieldProps) {
  const invalid = !!error;
  const ctl = (extra = "") =>
    "ds-field__control" + (invalid ? " is-error" : "") + (forceFocus ? " is-focus" : "") + extra;
  return (
    <div className={"ds-field" + (disabled ? " is-disabled" : "")}>
      <label className="ds-field__label">
        {label}
        {optional ? <span className="ds-field__opt">Optional</span> : null}
      </label>

      {readOnly ? (
        <div className="ds-field__value">{value || "—"}</div>
      ) : type === "select" ? (
        <div className={ctl(" ds-field__control--select")}>
          <span className={value ? "" : "ds-field__ph"}>{value || (options && options[0]) || placeholder}</span>
          <svg viewBox="0 0 24 24" className="ds-field__chev" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>
        </div>
      ) : (
        <input
          className={ctl()}
          type={nativeType(type)}
          defaultValue={value}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid || undefined}
        />
      )}

      {error ? <p className="ds-field__error">{error}</p>
        : helper ? <p className="ds-field__helper">{helper}</p> : null}
    </div>
  );
}

export interface FieldDraft {
  type: FieldType;
  label: string;
  value?: string;
  required: boolean;
  options: string[];
  helper?: string;
}

export function FieldConfigurator({ onAdd }: { onAdd?: (f: FieldDraft) => void }) {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState<FieldType>("text");
  const [label, setLabel] = React.useState("");
  const [value, setValue] = React.useState("");
  const [required, setRequired] = React.useState(false);
  const [helper, setHelper] = React.useState("");
  const [options, setOptions] = React.useState<string[]>(["", ""]);

  const reset = () => { setType("text"); setLabel(""); setValue(""); setRequired(false); setHelper(""); setOptions(["", ""]); };
  const cancel = () => { reset(); setOpen(false); };
  const add = () => {
    onAdd?.({ type, label: label || "Untitled field", value, required, options: options.filter(Boolean), helper });
    cancel();
  };

  if (!open) {
    return (
      <button className="ds-field-add" onClick={() => setOpen(true)}>
        <span className="ds-field-add__plus">+</span> Add field
      </button>
    );
  }

  return (
    <div className="ds-field-config" role="group" aria-label="Configure new field">
      <div className="ds-field-config__title">New field</div>

      <label className="ds-field__label">Type</label>
      <select className="ds-field__control ds-field__native-select" value={type} onChange={(e) => setType(e.target.value as FieldType)}>
        {FIELD_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
      </select>

      <label className="ds-field__label">Label</label>
      <input className="ds-field__control" value={label} placeholder="e.g. Leave type" onChange={(e) => setLabel(e.target.value)} />

      {type === "select" ? (
        <>
          <label className="ds-field__label">Options <span className="ds-field__hint">(dropdown only)</span></label>
          {options.map((o, i) => (
            <div className="ds-field-opt" key={i}>
              <input className="ds-field__control" value={o} placeholder={"Option " + (i + 1)} onChange={(e) => {
                const next = [...options]; next[i] = e.target.value; setOptions(next);
              }} />
              <button className="ds-field-opt__del" aria-label="Remove option" onClick={() => setOptions(options.filter((_, j) => j !== i))}>&#10005;</button>
            </div>
          ))}
          <button className="ds-field-config__link" onClick={() => setOptions([...options, ""])}>+ Add option</button>
        </>
      ) : (
        <>
          <label className="ds-field__label">Default value <span className="ds-field__hint">(optional)</span></label>
          <input className="ds-field__control" value={value} placeholder="Placeholder" onChange={(e) => setValue(e.target.value)} />
        </>
      )}

      <label className="ds-field__label">Helper text <span className="ds-field__hint">(optional)</span></label>
      <input className="ds-field__control" value={helper} placeholder="Shown under the field" onChange={(e) => setHelper(e.target.value)} />

      <div className="ds-field-config__req">
        <span>Required</span>
        <button role="switch" aria-checked={required} className={"ds-toggle" + (required ? " is-on" : "")} onClick={() => setRequired(!required)}>
          <span className="ds-toggle__knob" />
        </button>
      </div>

      <div className="ds-field-config__foot">
        <Button variant="secondary" size="sm" shape="rounded" onClick={cancel}>Cancel</Button>
        <Button variant="primary" size="sm" shape="rounded" onClick={add}>Add field</Button>
      </div>
    </div>
  );
}

export default Field;
