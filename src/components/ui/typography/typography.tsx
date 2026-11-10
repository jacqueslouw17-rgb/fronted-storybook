import * as React from "react";
import { cn } from "@/lib/utils";
import "../../../typography.css";

/** Every piece of text in new UI goes through Typography: one role per job, from the type scale
 *  in typography.css (Clash Display headings, Inter body), coloured by semantic tokens only. */
export type TypographyVariant =
  | "display" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  | "body-lg" | "body" | "body-sm" | "label" | "caption" | "overline";

export type TypographyColor = "default" | "heading" | "strong" | "muted" | "disabled" | "danger" | "success" | "warning" | "inherit";

export interface TypographyProps extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  variant?: TypographyVariant;
  color?: TypographyColor;
  /** The element to render; defaults to the role's natural one (h1–h6, p, span) */
  as?: React.ElementType;
  /** Figures in columns line up (amounts, counts, dates) */
  tabular?: boolean;
}

const ELEMENT: Record<TypographyVariant, React.ElementType> = {
  display: "h1", h1: "h1", h2: "h2", h3: "h3", h4: "h4", h5: "h5", h6: "h6",
  "body-lg": "p", body: "p", "body-sm": "p", label: "span", caption: "span", overline: "span",
};

const COLOR: Record<TypographyColor, string | undefined> = {
  default: "var(--ds-color-text)",
  heading: "var(--ds-color-heading)",
  strong: "var(--ds-color-text-strong)",
  muted: "var(--ds-color-text-muted)",
  disabled: "var(--ds-color-text-disabled)",
  danger: "var(--ds-feedback-danger-fg)",
  success: "var(--ds-feedback-success-fg)",
  warning: "var(--ds-feedback-warning-fg)",
  inherit: "inherit",
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant = "body", color, as, tabular, className, style, ...rest }, ref) => {
    const Tag = as ?? ELEMENT[variant];
    return (
      <Tag
        ref={ref}
        className={cn(`ds-${variant}`, className)}
        style={{ margin: 0, ...(color ? { color: COLOR[color] } : null), ...(tabular ? { fontVariantNumeric: "tabular-nums" } : null), ...style }}
        {...rest}
      />
    );
  },
);
Typography.displayName = "Typography";
