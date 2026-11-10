# Our setup: where "ecor-fe" points

These skills were written for `ecor-fe`. For us, read every `ecor-fe` path as one of our two repos:

- **fronted-design-system** (this repo): the prototype app and the flow canvas. Screens, flows, and the composites they share.
- **fronted-storybook** (`~/Desktop/fronted-storybook`, GitHub `jacqueslouw17-rgb/fronted-storybook`, Storybook on `:6009`): the design system itself. Tokens, primitives, patterns, and their stories.

A component that belongs to the system is built and storied in **fronted-storybook**; the prototype then uses it. A piece only one flow needs stays in the prototype.

| The skill says (ecor-fe) | Here |
|---|---|
| `src/foundation/tokens.css` (`--p-*`, `--ds-*`) | `fronted-storybook/src/tokens.css` (+ `tokens.json`). Default theme = Fronted; `[data-theme="interim"]` = the interim look. In the prototype the Fronted brand is `src/brand/fronted-brand.css`, scoped to `[data-brand="fronted"]` |
| `src/foundation/typography.css` (`.ds-*`) | `fronted-storybook/src/typography.css` |
| `data-theme="fronted"` / `"interim"` | fronted-storybook: default (Fronted) / `data-theme="interim"`. Prototype: `data-brand="fronted"`, otherwise the interim theme in `src/index.css` |
| Primitives `src/components/ui/<name>/` · `Primitives/<Name>` | `fronted-storybook/src/components/ui/<name>.tsx` (shadcn-based) · story `src/<Name>.stories.tsx` titled `Components/<Name>` |
| Patterns `src/components/patterns/` · `Patterns/<Name>` | fronted-storybook story `src/Pattern<Name>.stories.tsx` titled `Patterns/<Name>`; shared flow pieces in `src/components/flows/` |
| Composites `src/components/shared/` · `Composites/<Name>` | Prototype: `src/components/flows/shared/` (e.g. `F63_InvoiceApprovals`); register in `src/data/componentsRegistry.ts` |
| Flows / pages | Prototype: `src/pages/flows/`, `src/components/flows/<flow>/`. Storybook: `Flows/<Name>` |
| `Typography` and `Icon` atoms | Not built yet in either repo. Until they exist: text via the `.ds-*` classes (Storybook) or the existing text styles (prototype); icons via `lucide-react`, 2px stroke, sizes on the 4px grid |
| `DESIGN_PRINCIPLES.md`, `COMPONENT_STANDARDS.md` | At the root of this repo |
| `STORYBOOK_GUIDELINES.md` | Not present. Use fronted-storybook's `Governance`, `Introduction` and `Inventory` stories and its README |
| Locked flows (`src/config/flowRegistry.ts`) | Same file in this repo |
| `references/component-catalog.md` | Describes ecor-fe's components. Also match against fronted-storybook's `Inventory` story and its `Components/*` and `Patterns/*` lists, and add an entry here for anything we build |
| Flow canvas | After a component change that shows on a captured screen, recapture the affected canvas screens (`flow-canvas/tools/capture-demo.mjs`) and republish |
