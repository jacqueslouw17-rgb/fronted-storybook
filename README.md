# Fronted DS — M1 · Config Panel (Storybook pattern)

First pattern for the Fronted design system: the **Config Panel** — a right
slide-over (`Sheet`, side=right) with a dimmed overlay, opened from the
**primary button**. Rendered for **desktop, tablet and mobile**.

## What's here

```
fronted-storybook/
├─ config-panel-preview.html        ← no-build preview (open in any browser)
└─ src/
   ├─ tokens.css                    ← design tokens: PRIMITIVES + SEMANTIC
   ├─ tokens.json                   ← same tokens, W3C format (Figma/Tailwind/Style Dictionary)
   ├─ typography.css                ← type-scale classes (.ds-h1 … .ds-body)
   ├─ Button.tsx / Button.css       ← primary (brand pill) · secondary · gradient
   ├─ ConfigPanel.tsx / .css        ← the Sheet + overlay + accordion + footer
   ├─ ConfigPanel.stories.tsx       ← single story; sizes via viewport toolbar
   └─ Foundations.stories.tsx       ← Colors · Typography · Spacing & Radii · Buttons
```

## Design tokens

Two tiers (in `tokens.css`, mirrored in `tokens.json`):

- **Primitives** (`--p-*`) — the raw brand values pulled from **fronted.com**
  (Webflow): yellow `#FEECA6`, blue `#2563EB`, purple `#7C3BED`, green
  `#34D399`, teal ink `#063033`, neutral ramp, Clash Display + Inter, 4px
  spacing scale, radii (incl. `pill`), shadows, motion, breakpoints.
- **Semantic** (`--ds-*`) — role aliases components reference:
  `--ds-color-heading/text/border`, `--ds-action-primary-bg` (brand yellow
  pill), `--ds-action-gradient-bg` (product app blue→purple), `--ds-font-heading`
  (Clash Display) / `--ds-font-body` (Inter), etc.

**Always reference the semantic layer in components.** Add new patterns by
composing `--ds-*`; only touch `--p-*` when the brand itself changes.

Brand fonts load via `.storybook/preview-head.html` (Clash Display from
Fontshare, Inter from Google Fonts). Open **Foundations** in the sidebar to
browse every token visually.

### Brand vs product note
The marketing site (Webflow) and the product app diverge: marketing primary =
**yellow pill**. The design system commits fully to the **website** palette —
yellow primary, teal ink, neutrals, green/pink accents. The product app's
blue→purple gradient has been **retired** from the tokens.

**M1 · Panel** is a generic template (placeholder content): Main header,
subtext, Category 1 / Category 2, generic Label N fields. Two stories —
**Editable** (labelled inputs + footer) and **Read only** (label / value rows).
Switch Desktop / Tablet / Mobile from the viewport toolbar.

## See it now (no build)

Open `config-panel-preview.html` in a browser. Use the **Desktop / Tablet /
Mobile** toggle in the top bar, then click **Configure** to open the panel.
This file mirrors the Storybook story exactly and is the source for any
screenshots we pull back into FigJam.

## Add to the design-system repo

The repo (`jacqueslouw17-rgb/fronted-design-system`) is private, so this was
built standalone. To wire it in:

1. Copy `src/tokens.css`, `Button.*`, `ConfigPanel.*`, and
   `ConfigPanel.stories.tsx` into your components dir (e.g. `src/patterns/`).
2. Ensure `tokens.css` is imported once globally (or via `.storybook/preview`).
3. The story uses the **viewport addon** from `@storybook/addon-essentials`.
   Desktop/Tablet/Mobile viewports are defined inline in the story.
4. `npm run storybook` → **Patterns / M1 · Config Panel**.

The components are dependency-free so they run in any React Storybook. To bind
to the product's primitives, swap the root for your shadcn `<Sheet>` and the
sections for `<Accordion>` — the classNames already carry the token values.

## Tokens (source of truth)

Website palette from **fronted.com** (Webflow):

| token | value |
|---|---|
| primary (CTA) | yellow pill `#FEECA6`, radius `pill` |
| heading ink | teal `#063033` |
| body / muted / border | `#333333` / `#6B7280` / `#E2E2E2` |
| accents | green `#34D399`, pink `#F9CBCA`, yellow tint `#FFF2D7` |
| fonts | Clash Display (headings) · Inter (body) |
| backdrop | teal scrim `rgba(6,48,51,.55)` |
| radius (input/btn) | `8px` · pill for primary |
| sheet width | `576px` (full-width < 640px) |

## Responsive behaviour

- **≥ 640px** — fixed `576px` right slide-over.
- **< 640px** — full-width slide-over.

## Pattern states

- **Editable** — labelled inputs + Secondary / Primary footer (default).
- **Read only** — fields render as label / value rows, no footer (`readOnly` prop).
