import * as React from "react";
import "./tokens.css";
import "./Button.css";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";
type Shape = "pill" | "rounded";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = brand yellow · secondary = ghost (transparent → dark) */
  variant?: Variant;
  /** sm 32 · md 40 (default) · lg 52 */
  size?: Size;
  /** pill (fully rounded, default) · rounded (lg, 12px corners) */
  shape?: Shape;
}

/**
 * Button — Fronted DS.
 * `primary` is the brand yellow pill from fronted.com.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", shape = "pill", className = "", children, ...props }, ref) => {
    const cls = ["ds-btn", `ds-btn--${variant}`, `ds-btn--${size}`, `ds-btn--${shape}`, className].filter(Boolean).join(" ");
    return (
      <button ref={ref} className={cls} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
