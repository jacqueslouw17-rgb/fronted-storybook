/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}", "./.storybook/**/*.{ts,tsx}"],
  // preflight ON — matches the app's base layer (html line-height 1.5, margin
  // resets, box-sizing, borders) so components render identically to the flows.
  theme: {
    extend: {
      // Type scale — mirrors the demo (Stripe-inspired, tight). This is the
      // foundation fix: `text-sm` = 13px, `text-xs` = 11px, matching the flows.
      fontSize: {
        xs: ["11px", { lineHeight: "1.375", letterSpacing: "0" }],
        sm: ["13px", { lineHeight: "1.5", letterSpacing: "0" }],
        base: ["15px", { lineHeight: "1.5", letterSpacing: "0" }],
        lg: ["17px", { lineHeight: "1.5", letterSpacing: "0" }],
        xl: ["20px", { lineHeight: "1.375", letterSpacing: "-0.02em" }],
        "2xl": ["24px", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "3xl": ["30px", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "4xl": ["36px", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
      },
      colors: {
        // hsl(var(--x)) form so opacity utilities (bg-foreground/8, bg-primary/10)
        // work exactly as they do in the demo. Vars are HSL triplets per theme.
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        // Emphasis / link / active TEXT + icons — dark grey in Fronted (yellow fails
        // as text), blue in interim. Yellow --primary stays fill/outline only.
        emphasis: "hsl(var(--primary-emphasis))",
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        success: { DEFAULT: "hsl(var(--success))", foreground: "hsl(var(--success-foreground))" },
        warning: { DEFAULT: "hsl(var(--warning))", foreground: "hsl(var(--warning-foreground))" },
        // Soft Accent System — status / role badge colours (fill / outline / text).
        // DEFAULT = the outline green/etc so bare utilities (bg-accent-green/[0.04],
        // border-accent-green/25 — used by F6 approval rows) resolve to a tinted green.
        "accent-green": { DEFAULT: "hsl(var(--accent-green-outline))", outline: "hsl(var(--accent-green-outline))", fill: "hsl(var(--accent-green-fill))", text: "hsl(var(--accent-green-text))" },
        "accent-yellow": { DEFAULT: "hsl(var(--accent-yellow-outline))", outline: "hsl(var(--accent-yellow-outline))", fill: "hsl(var(--accent-yellow-fill))", text: "hsl(var(--accent-yellow-text))" },
        "accent-amber": { DEFAULT: "hsl(var(--accent-amber-outline))", outline: "hsl(var(--accent-amber-outline))", fill: "hsl(var(--accent-amber-fill))", text: "hsl(var(--accent-amber-text))" },
        "accent-blue": { DEFAULT: "hsl(var(--accent-blue-outline))", outline: "hsl(var(--accent-blue-outline))", fill: "hsl(var(--accent-blue-fill))", text: "hsl(var(--accent-blue-text))" },
        "accent-purple": { DEFAULT: "hsl(var(--accent-purple-outline))", outline: "hsl(var(--accent-purple-outline))", fill: "hsl(var(--accent-purple-fill))", text: "hsl(var(--accent-purple-text))" },
      },
      borderRadius: {
        // Demo's 4pt-aligned radius scale — `rounded-md` = 8px (controls),
        // `rounded-full` = pill (badges).
        none: "0",
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        full: "9999px",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
      },
      // NOTE: custom shadows (subtle/card/elevated/overlay) are defined as plain
      // utilities in globals.css, NOT here. Tailwind's boxShadow theme key wraps the
      // value in the ring-shadow composition (two leading `0 0 #0000` layers), which
      // the live app does not — defining them plainly makes the computed box-shadow
      // string byte-identical to the flows (parity diff = 0).
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
