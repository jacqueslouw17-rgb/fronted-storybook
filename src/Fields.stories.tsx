import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Field, FieldConfigurator, type FieldDraft } from "./Field";
import "./tokens.css";
import "./typography.css";

/**
 * Components — Fields.
 * Input field states + the Configure ("+ Add field") flow.
 * Consumes the SEMANTIC token layer only (--ds-*), like Button.
 */
const meta: Meta = { title: "Components/Fields", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 760 };

export const Fields: Story = {
  name: "Fields",
  render: () => (
    <div style={wrap}>
      <h2 className="ds-h2" style={{ marginBottom: "var(--p-space-1)" }}>Fields</h2>
      <p className="ds-body" style={{ marginBottom: "var(--p-space-6)" }}>
        Input field states — same token layer as Button. Focus is shown forced for the grid;
        real inputs get the ring on <code>:focus-visible</code>.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--p-space-6)" }}>
        <Field label="Default" value="Value" />
        <Field label="Focus" value="Value" forceFocus />
        <Field label="Read only" value="Value" readOnly />
        <Field label="Error" value="Value" error="This field is required" />
        <Field label="Disabled" value="Value" disabled />
        <Field label="Email" type="email" placeholder="name@company.com" helper="Used only for payslips." optional />
      </div>
    </div>
  ),
};

export const Configure: Story = {
  render: () => {
    const Demo = () => {
      const [fields, setFields] = React.useState<FieldDraft[]>([]);
      return (
        <div style={{ ...wrap, maxWidth: 460 }}>
          <h2 className="ds-h2" style={{ marginBottom: "var(--p-space-1)" }}>Configure a field</h2>
          <p className="ds-body" style={{ marginBottom: "var(--p-space-5)" }}>
            Click <strong>Add field</strong>, choose a type and fill it in — it renders above the button.
          </p>
          {fields.map((f, i) => (
            <Field key={i} label={f.label} type={f.type} optional={!f.required}
              value={f.value} options={f.options} helper={f.helper}
              placeholder={f.options[0] || "Value"} />
          ))}
          <FieldConfigurator onAdd={(f) => setFields((x) => [...x, f])} />
        </div>
      );
    };
    return <Demo />;
  },
};
