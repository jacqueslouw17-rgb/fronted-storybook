---
name: component-sharing
description: Use whenever building, extending, or refactoring UI in ecor-fe (for us: fronted-design-system and fronted-storybook) — new screens, form fields, cards, dialogs, table rows, empty/loading states, or anything the user describes as a "component" or "block" (e.g. Table, Button, Card, Tabs, EmployeePersonalInformationBlock). Also use when the user asks "does this already exist", "can I reuse X", "should this be its own component", or is about to write JSX that renders UI. Governs the decide-sketch-match-build workflow, where new components live, Storybook requirements, and Tailwind/token usage for ecor-fe specifically — always check this before creating a new component file or hand-rolling styles in this repo, even for something that looks small.
---

# Component sharing in ecor-fe

> **Our setup:** read `ecor-fe` as our two repos, fronted-design-system (prototype and canvas) and fronted-storybook (the design system, Storybook on :6009). Every path this skill names maps to one of them in [`references/our-setup.md`](references/our-setup.md); check it before placing a file.

Before writing a line of JSX for new or changed UI in `ecor-fe`, work through this in order: **decide the reuse tier → sketch the pieces you need as if they were components → match those sketches against what already exists → pick reuse, variant, composite, or new → build it aligned to the layer system → ship it with Storybook if it's shareable.** Skipping the matching step is the single most common way this codebase ends up with three near-identical dialogs — it already has 15+ hand-rolled confirm/approve dialogs that should have been one `ConfirmDialog` with different props.

The full rules live in three docs at the repo root — read the relevant one before you build, don't just skim this file and guess:

- [`../fronted-foundation/SKILL.md`](../fronted-foundation/SKILL.md) — Fronted Foundation tokens and atoms (color, type, space, radius, size, Icon). Apply before hand-rolling any visual style.
- [`STORYBOOK_GUIDELINES.md`](../../../STORYBOOK_GUIDELINES.md) — the decision tree, layer system, story conventions (this skill condenses it below)
- [`COMPONENT_STANDARDS.md`](../../../COMPONENT_STANDARDS.md) — which shared inputs/displays already exist and must be reused, plus semantic-token rules
- [`DESIGN_PRINCIPLES.md`](../../../DESIGN_PRINCIPLES.md) — Fronted Foundation visual rules (4px grid, `--ds-*` tokens, Inter, Lucide)

And the component catalog lives alongside this skill:

- [`references/component-catalog.md`](references/component-catalog.md) — every shareable Primitive/Pattern/Composite with its real props and Storybook tags, kept hand-maintained so you can match a new need against an existing component **by shape, not by name**. Read Step 1/2 below for how to use it.

## Step 0 — Is this a one-time thing or a shared component?

Ask this first, because it decides almost everything downstream (whether it needs a file of its own, where that file lives, and whether it needs a story).

- **One-time**: used in exactly one place, no new visual language, thin glue between existing pieces → keep it inline in the page/flow. No new component, no story.
- **Shared**: will appear in 2+ places, OR it's a named pattern the team will recognize and reuse (`EmptyState`, `ConfirmDialog`), OR it's a self-contained domain concept even if only used once today (things like `EmployeePersonalInformationBlock` — a named "block" of info almost always ends up reused on a second screen, so treat it as shared from the start rather than waiting for the second call site).

If you're not sure which it is, err toward reuse-aware: build it as a small typed component even if you only wire it up in one place today, so extracting it later doesn't mean a rewrite. But don't add a story for something you're still calling "shared" speculatively — stories are for things that are *actually* shared or *about to be*, and if the user has explicitly told you a piece is one-off, take that at face value rather than overriding it because the concept sounds reusable in the abstract.

## Step 1 — Sketch what you need, as components with props

Before searching for anything, break the request into the individual pieces of UI it actually needs, and give each one a rough shape: a name, a one-line purpose, and the props/data it would realistically take. This is a design step, not a search — you're figuring out what you'd build if nothing existed yet, so you have something concrete to compare against real components in Step 2.

For example, "a manager list screen" isn't one thing to search for — it decomposes into something like: a row/card showing a manager (`name`, `avatar`, `role`, `status`, `onClick`), an empty state for zero managers, a loading state for the list, pagination controls, maybe a search/filter input. Sketch each of those before you look for matches — searching for the literal phrase "manager list" tells you much less than knowing you need "a person-with-status row" tells you.

## Step 2 — Match your sketches against the catalog

Open [`references/component-catalog.md`](references/component-catalog.md) and compare each sketch from Step 1 against it — **match by purpose and prop shape, not by name.** A component called nothing like your feature can still be exactly the right one: a "manager row" and `PersonMiniCard` don't share a name, but `PersonMiniCard`'s props (`name`, `role`, `avatar`, `status`, `onClick`) are close to what a manager row sketch would need, so that's a real match worth reading the actual file for. The catalog's tags on each entry are there to help this: line up the tags you'd give your own sketch (`person`, `list-item`, `status`) against the tags on catalog entries.

The catalog is hand-maintained, not auto-generated (see "Keeping this current" at the bottom of the catalog file), so it can lag reality — treat it as the first place to look, not the only one. If nothing in it looks close, before concluding something is genuinely new: skim the real `src/components/shared/`, `patterns/`, and `ui/` folders, and check `COMPONENT_STANDARDS.md`, since a recently-added component may not be catalogued yet.

Treat "close but not identical" as a strong signal to extend, not duplicate — see Step 3.

## Step 3 — Reuse, variant, composite, or new?

This mirrors the decision tree in `STORYBOOK_GUIDELINES.md`; walk it in order and stop at the first "yes":

1. **Can an existing component do this with different props?** → Just pass different props/data. No code change to the component. Add a story variant only if the new state is worth documenting for other callers.
2. **Does it need a genuinely new visual or interaction state, but the underlying component is the same thing?** → Add a typed, reusable prop to the existing component (not a one-off boolean like `isApproveLoading`) and a named story for that state. This is an *edit*, not a new file.
   - Anti-pattern to actively avoid: forking `ConfirmDialog` into `ApproveConfirmDialog` / `RejectConfirmDialog` / `BulkApproveConfirmDialog`. Those are three stories on one component, not three components.
3. **Is it a composition of 2+ existing primitives/patterns with no new visual language, reused in 2+ places or representing a distinct UX pattern?** → Build a new composite component from existing pieces (see placement table below) + story.
4. **None of the above, and it's genuinely a one-off** → keep it inline per Step 0. No new file.

If the closest existing match lives inside a **locked flow** (`F1`/`F3`/`F4`/`F5` — check `src/config/flowRegistry.ts`), don't refactor the flow itself to adopt the shared version. Extract the reusable piece into `shared/`/`patterns/` as its own component with its own story, and only swap it into the locked flow if that's a pure prop-for-prop drop-in with zero structural or behavioral change — otherwise leave the locked flow as-is and use the new shared piece going forward for new call sites.

## Step 4 — Where new (or extended) components live

Build **up** the stack — don't skip a layer, and don't put a Pattern-level concept inside `flows/`:

| Layer | Folder | Storybook title prefix | Examples |
|---|---|---|---|
| Foundations | `src/foundation/` | `Foundations/` | color, type, space, radius, size, icons |
| Atomic / Primitives | `src/components/ui/` | `Primitives/` | `typography`, `icon`, `button`, `badge` |
| Patterns | `src/components/patterns/` | `Patterns/` | `ConfirmDialog` |
| Shared / Composites | `src/components/shared/` | `Composites/` | `EmployeeCard`, `CandidateForm`, `EmptyState` |
| Feature-scoped | feature folders (e.g. `company-admin/`) | `Composites/<Feature>/` | `ApprovalRequestRow` |
| Flows / Pages | `src/components/flows/`, pages | `Composites/` (only if worth isolating) | tab/page-level, story optional |

**Every new component gets its own folder.** Do not add a new file as a sibling of other components. Existing flat files are legacy — new work uses the patterns below.

### Atomic components — `src/components/ui/<name>/`

Lowercase folder and files:

```
src/components/ui/
  typography/
    typography.tsx
    typography.stories.tsx
  icon/
    icon.tsx
    icon.stories.tsx
```

### Shareable components — `src/components/shared/<ComponentName>/`

PascalCase folder and files. Use this for anything shareable that isn't an atomic primitive — cards, forms, named blocks (`EmployeeCard`, `CandidateForm`, `EmployeePersonalInformationBlock`, `EmptyState`):

```
src/components/shared/
  EmployeeCard/
    EmployeeCard.tsx
    EmployeeCard.stories.tsx
  CandidateForm/
    CandidateForm.tsx
    CandidateForm.stories.tsx
```

A component like `EmployeeCard` — generic enough to show on multiple worker/candidate screens, no domain-specific business logic baked in — is a **Composite**: `src/components/shared/EmployeeCard/EmployeeCard.tsx` + `EmployeeCard.stories.tsx` in the same folder, built out of `Primitives` (`Typography`, `Avatar`) and possibly a `Patterns` piece, not out of raw markup. Same folder-per-component rule for Patterns (`src/components/patterns/ConfirmDialog/ConfirmDialog.tsx` + `.stories.tsx`).

## Step 5 — Build it aligned, not hand-rolled

- **Fronted Foundation tokens only for new UI.** Compose `--ds-*` (see `src/foundation/tokens.css`). Never `--p-*`, hex, `text-black`, or `bg-white`. Existing screens may still use `theme.css` HSL classes (`text-foreground`, `bg-background`) — do not retrofit those unless asked.
- **Use `Typography` for text** and **`Icon` for glyphs** instead of ad-hoc `text-sm font-medium` or raw `lucide-react` sizing.
- **Match `DESIGN_PRINCIPLES.md`:** 4px grid, radius roles (`rounded-button` / `rounded-chip` / `rounded-control` / `rounded-lg` cards / `rounded-sheet`), Lucide 2px stroke, primary yellow with black text only.
- **Reuse the documented shared inputs/displays** from `COMPONENT_STANDARDS.md` instead of building a new text field, phone field, currency field, date-of-birth picker, nationality select, person card, checklist item, or progress bar — those already exist and are the required components for those jobs.
- **Accept data via props; keep fetching in pages/flows**, not in the leaf component itself.
- **Export a typed props interface**, and prefer a `variant`/`size` union over boolean sprawl (`variant: "default" | "destructive"`, not `isDestructive` + `isSmall` + ...).

## Step 6 — Storybook is mandatory for anything shareable

If you built (or meaningfully extended) something in Primitives, Patterns, or Composites, it needs a story — this isn't optional polish, it's how design and other engineers review UI without running the app or wiring auth. One-time/inline UI from Step 0 does not need one.

- File sits **inside the component folder**, next to the component: atomic `src/components/ui/typography/typography.stories.tsx`; shared `src/components/shared/EmployeeCard/EmployeeCard.stories.tsx`.
- `title` follows the layer table in Step 4 exactly (`"Primitives/Typography"`, `"Composites/EmployeeCard"`, `"Patterns/ConfirmDialog"`, ...). Group by what it *is*, never by ticket.
- Always set `tags: ["autodocs"]` **plus a few semantic tags** describing what the component is/for — e.g. `tags: ["autodocs", "person", "card", "list-item"]`. These aren't cosmetic: they're what makes Step 2's catalog matching work for the *next* person, so add tags the same way you'd tag your own Step 1 sketch — purpose and shape, not implementation detail. And set `control: false` on callbacks/icons/render props in `argTypes`.
- Cover, at minimum, the states that actually apply: **default**, **loading/skeleton**, **empty**, **error/disabled**. Don't invent states the component can't actually reach.
- Mock data lives at the top of the story file (or a colocated `*.fixtures.ts` for larger sets) — never a real API hook in a story.
- Dialogs/drawers/toggles need a `render` with local `useState`, not just `args` — see `ConfirmDialog.stories.tsx` for the pattern (`Default`, `Destructive`, and `RejectWithReason` in particular show the `render`-with-state approach).
- If the component needs context (tooltip provider, query client, ...), add a story **decorator** — don't bake provider logic into the component itself.

Good references already in the repo to copy the *shape* of (not the content) — see the "Examples to copy from" table at the end of `STORYBOOK_GUIDELINES.md` for the current list, e.g. `ApprovalRequestRow.stories.tsx` for a row with multiple statuses, `ConfirmDialog.stories.tsx` for a dialog with variants, `EmptyState.stories.tsx` for placeholder UI, `typography.stories.tsx` for a primitive catalog.

## Step 7 — Update the catalog, and register if it's in `shared/`

Two bookkeeping steps once the component exists:

1. **Add or update its entry in [`references/component-catalog.md`](references/component-catalog.md)** — path, Storybook tags, purpose, current props. This is what keeps Step 2 useful for the next feature request instead of silently going stale; treat it as part of finishing the component, not an optional follow-up.
2. **If it landed in `src/components/shared/`**, also add an entry to `src/data/componentsRegistry.ts` and link it to the relevant pattern(s) — `COMPONENT_STANDARDS.md` is the source of truth other engineers check before building their own version of the same thing, so an unregistered shared component is invisible to the next person who needs it.

## Before you call it done

- [ ] Sketched the pieces needed as components-with-props before searching (Step 1)
- [ ] Matched sketches against `references/component-catalog.md` by purpose/props, not just by name (Step 2) — didn't duplicate something that already exists
- [ ] Landed on the right tier: reuse / variant / composite / new / inline (Step 3) — not a fork of an existing component
- [ ] Lives in the right layer folder with the right story title prefix (Step 4) — atomic in `ui/<name>/`, shareable in `shared/<ComponentName>/`, each with colocated `.tsx` + `.stories.tsx`
- [ ] Tailwind + semantic tokens only, no hardcoded colors or inline CSS (Step 5)
- [ ] Reused the documented shared inputs/displays instead of rebuilding them (Step 5, `COMPONENT_STANDARDS.md`)
- [ ] Story added/updated if this is shareable, with semantic tags beyond `autodocs`, covering the states that actually apply (Step 6)
- [ ] Light and dark theme both look right in Storybook
- [ ] `references/component-catalog.md` updated with the new/changed entry (Step 7)
- [ ] Registered in `componentsRegistry.ts` if it's in `shared/` (Step 7)
- [ ] Didn't restructure a locked flow (`F1`/`F3`/`F4`/`F5`) to adopt it (Step 3)
