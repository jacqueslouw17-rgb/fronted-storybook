---
name: fronted-foundation
description: Applies Fronted Foundation design tokens and atoms in ecor-fe (for us: fronted-design-system and fronted-storybook) — colors, typography, spacing, radius, size, and Lucide icons. Use when building or restyling UI, adding Storybook foundations, choosing tokens, using Typography or Icon, or when the user mentions design system, foundations, tokens, Inter, or fronted-storybook. Do not retrofit existing feature screens unless the user explicitly asks.
---

# Fronted Foundation

> **Our setup:** read `ecor-fe` as our two repos, fronted-design-system (prototype and canvas) and fronted-storybook (the design system, Storybook on :6009). Every path this skill names maps to one of them in [`../component-sharing/references/our-setup.md`](../component-sharing/references/our-setup.md); check it before placing a file.

Visual source of truth for `ecor-fe`, extracted from `fronted-storybook`. Read [`DESIGN_PRINCIPLES.md`](../../../DESIGN_PRINCIPLES.md) before inventing a color, type size, radius, or icon treatment.

## Do not retrofit features

Foundation first. Leave existing flows, pages, and shadcn primitives on `src/styles/theme.css` (First Launch / HSL vars) unless the user explicitly asks to migrate a screen.

## Token layers

| Layer | Prefix | File | Who uses it |
|---|---|---|---|
| Primitive | `--p-*` | `src/foundation/tokens.css` | Token files only |
| Semantic | `--ds-*` | `src/foundation/tokens.css` | Components, stories |
| Type roles | `.ds-*` | `src/foundation/typography.css` | `Typography` atom only |
| Live app theme | `--primary` HSL | `src/styles/theme.css` | Existing screens |

**Never** put `--p-*`, hex, `text-black`, or `bg-white` in component CSS. Compose `--ds-*`.

Themes: `data-theme="fronted"` (Fronted Brand, yellow pill + Inter) and `data-theme="interim"` (First Launch). Storybook toolbar **Brand** switches them.

## Atoms (required for new text and icons)

```tsx
import { Typography } from "@/components/ui/typography";
import { Icon } from "@/components/ui/icon";
import { Pencil } from "lucide-react";

<Typography variant="h3">Section title</Typography>
<Typography variant="body" color="muted">Supporting copy</Typography>
<Icon icon={Pencil} size="sm" tone="muted" label="Edit" />
```

- **Typography** variants: `display` `h1`–`h6` `body` `body-lg` `body-sm` `label` `caption` `caption-strong` `caption-meta` `overline` `metric` `metric-lg`
- **Icon** sizes: `xs` 12 · `sm` 14 · `md` 16 · `lg` 20 · `xl` 24. Tones: `muted` `strong` `brand` `danger` `disabled` `inherit`
- Lucide only, 2px stroke. Icon-only controls need a name + ≥24px hit area (`HIT_TARGET_MIN`)

## Scale cheatsheet

- **Type:** Inter for headings/metrics; Inter for product/UI. Base 16. Line-heights ×4px.
- **Space:** 4px grid (`--p-space-*`). Tailwind `p-1` = 4px, `gap-4` = 16px. No magic pixels.
- **Radius roles:** `rounded-button` / `rounded-chip` (pill) · `rounded-control` (8) · `rounded-lg` cards (12) · `rounded-sheet` (16)
- **Control height:** 40px default (`--ds-size-control`)
- **Primary yellow** takes black text only — never white

## Storybook

New foundation work goes under `Foundations/*`. Atoms: `Primitives/Typography`, `Primitives/Icon`. Stories live next to the file.

## Where things live

```
src/foundation/          tokens, type CSS, sizes, foundation stories
src/components/ui/typography/
src/components/ui/icon/
```
