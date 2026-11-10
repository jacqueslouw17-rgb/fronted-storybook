import * as React from "react";
import type { LucideIcon } from "lucide-react";

/** The only way to draw a glyph in new UI: Lucide at its standard 2px stroke, sizes on the 4px grid,
 *  coloured by semantic tokens. Decorative unless it has a label. */
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
export type IconTone = "inherit" | "muted" | "strong" | "brand" | "danger" | "success" | "warning" | "disabled";

export const ICON_SIZE: Record<IconSize, number> = { xs: 12, sm: 14, md: 16, lg: 20, xl: 24 };
/** An icon-only control needs at least this much to click or tap */
export const HIT_TARGET_MIN = 24;

const TONE: Record<IconTone, string> = {
  inherit: "currentColor",
  muted: "var(--ds-color-text-muted)",
  strong: "var(--ds-color-text-strong)",
  brand: "var(--ds-accent-teal)",
  danger: "var(--ds-feedback-danger-fg)",
  success: "var(--ds-feedback-success-fg)",
  warning: "var(--ds-feedback-warning-fg)",
  disabled: "var(--ds-color-text-disabled)",
};

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "ref"> {
  icon: LucideIcon;
  size?: IconSize;
  tone?: IconTone;
  /** What it means, when nothing next to it says so; without it the icon is hidden from screen readers */
  label?: string;
}

export function Icon({ icon: Glyph, size = "md", tone = "inherit", label, style, ...rest }: IconProps) {
  const px = ICON_SIZE[size];
  return (
    <Glyph
      width={px}
      height={px}
      strokeWidth={2}
      color={TONE[tone]}
      style={{ flexShrink: 0, ...style }}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      {...rest}
    />
  );
}
