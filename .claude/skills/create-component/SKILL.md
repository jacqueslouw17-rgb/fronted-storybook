---
name: create-component
description: Use whenever actually building a new component, a new variant on an existing one, or a new Storybook story in ecor-fe (for us: fronted-design-system and fronted-storybook) — once it's already decided that something needs to be created or extended (as opposed to just reused as-is). Covers the full build-and-ship pipeline end to end: correct placement, Tailwind/token compliance, the Storybook story and its variants, registering the component in the shared catalog, and wiring the finished component into the screen or flow that needed it. Trigger this whenever the user says "create a component for X", "add a variant to Y", "build a new [Table/Card/Badge/etc.]", or after component-sharing's decision step has concluded something new is warranted — don't stop at just writing the component file, this skill isn't done until it's cataloged and actually used somewhere.
---

# Creating a component in ecor-fe

> **Our setup:** read `ecor-fe` as our two repos, fronted-design-system (prototype and canvas) and fronted-storybook (the design system, Storybook on :6009). Every path this skill names maps to one of them in [`../component-sharing/references/our-setup.md`](../component-sharing/references/our-setup.md); check it before placing a file.

This skill is the build pipeline: placement → implementation → story/variants → catalog entry → wire it in. It picks up once you already know you're creating something (new component, or a variant/edit on an existing one) — it does not re-litigate whether you should reuse something instead.

**If you haven't already decided this is genuinely new work**, check that first — the sibling [`component-sharing`](../component-sharing/SKILL.md) skill's Steps 0–3 walk through sketching the pieces you need and matching them against [`../component-sharing/references/component-catalog.md`](../component-sharing/references/component-catalog.md) before concluding nothing reusable exists. Skipping that check is how this codebase ended up with 15+ near-duplicate confirm dialogs. Once that's settled — reuse is ruled out, and you're adding a genuinely new component or a real variant on an existing one — this skill covers the rest.

## Step 1 — Place it in the right layer

Where a component lives determines how it's found later, so get this right before writing code:

| Layer | Folder | Storybook title prefix | Examples |
|---|---|---|---|
| Foundations | `src/foundation/` | `Foundations/` | color, type, space, radius, size, icons |
| Atomic / Primitives | `src/components/ui/` | `Primitives/` | `typography`, `icon`, `button`, `badge` |
| Patterns | `src/components/patterns/` | `Patterns/` | `ConfirmDialog` |
| Shared / Composites | `src/components/shared/` | `Composites/` | `EmployeeCard`, `CandidateForm`, `EmptyState` |
| Feature-scoped | feature folders (e.g. `company-admin/`) | `Composites/<Feature>/` | `ApprovalRequestRow` |
| Flows / Pages | `src/components/flows/`, pages | `Composites/` (only if worth isolating) | tab/page-level, story optional |

Build **up** the stack — a Composite is made of Primitives and Patterns, never the reverse — and don't bury something reusable inside `flows/` just because that's where you happened to need it first. Atomic, no domain logic → `ui/`. Other shareable pieces (`EmployeeCard`, `CandidateForm`, named blocks/forms/cards) → `shared/`. Domain-specific but reusable across that domain's screens → the feature folder (`company-admin/`, etc.).

**Every new component gets its own folder.** Do not drop a new `.tsx` as a sibling of other components. Existing flat files (`ui/button.tsx`, `shared/EmptyState.tsx`) are legacy — new work uses the folder pattern below.

### Atomic components — `src/components/ui/<name>/`

Lowercase folder and files, matching the primitive name:

```
src/components/ui/
  typography/
    typography.tsx
    typography.stories.tsx
  icon/
    icon.tsx
    icon.stories.tsx
  button/
    button.tsx
    button.stories.tsx
```

### Shareable components — `src/components/shared/<ComponentName>/`

PascalCase folder and files, matching the component name:

```
src/components/shared/
  EmployeeCard/
    EmployeeCard.tsx
    EmployeeCard.stories.tsx
  CandidateForm/
    CandidateForm.tsx
    CandidateForm.stories.tsx
```

Same folder-per-component rule for Patterns (`src/components/patterns/ConfirmDialog/ConfirmDialog.tsx` + `.stories.tsx`).

## Step 2 — Build it aligned to the system

The whole point of a shared component is that it looks and behaves like it belongs — so:

- **Fronted Foundation for new UI.** Compose `--ds-*` from `src/foundation/tokens.css`. No `--p-*`, hex, `text-black`, or `bg-white`. Existing screens still use `src/styles/theme.css` HSL vars — do not retrofit unless asked. Follow [`../fronted-foundation/SKILL.md`](../fronted-foundation/SKILL.md).
- **Route all text through `Typography`** and **all glyphs through `Icon`** rather than ad-hoc `text-sm font-medium` or raw Lucide sizing.
- **Match [`DESIGN_PRINCIPLES.md`](../../../DESIGN_PRINCIPLES.md):** 4px grid, radius roles (`rounded-button`, `rounded-chip`, `rounded-control`, `rounded-lg` cards, `rounded-sheet`), Lucide 2px stroke, primary yellow with black text only.
- **Reuse the documented shared inputs/displays** from [`COMPONENT_STANDARDS.md`](../../../COMPONENT_STANDARDS.md) as building blocks — `StandardInput`, `PhoneInput`, `CurrencyInput`, `PersonMiniCard`, etc. — rather than re-implementing a text field, phone field, or person display inside your new component.
- **Accept data via props; don't fetch inside the component.** Fetching belongs in the page/flow that renders it, so the component itself stays easy to drop into Storybook with plain mock data.
- **Export a typed props interface.** Prefer a `variant`/`size` union (`variant: "default" | "destructive"`) over a spread of booleans (`isDestructive`, `isSmall`, `isCompact`, ...) — unions are what make Step 3's story variants clean to write, and what a future caller scans to see every state the component supports.

## Step 3 — Create the story, and design real variants

Every component from Step 1's Primitives/Patterns/Composites layers needs a story — it's how design and other engineers review the component without running the app. Skip this only for genuinely one-off, inline UI that never made it into those folders in the first place.

**File and title:**
- Story lives **inside the component folder**, next to the component file (see Step 1). Atomic: `src/components/ui/typography/typography.stories.tsx`. Shared: `src/components/shared/EmployeeCard/EmployeeCard.stories.tsx`.
- `title` matches the layer prefix from Step 1's table exactly, e.g. `"Primitives/Typography"`, `"Composites/EmployeeCard"`.
- `tags: ["autodocs", ...]` plus a few semantic tags describing what the component *is* — `person`, `card`, `list-item`, `status`, whatever purpose/shape words apply. These tags are what make the catalog in Step 4 useful for matching later, so word them the way you'd describe the component's purpose, not its implementation.

**Designing variants — the part worth slowing down for:** a variant isn't "another example," it's a real state the component can actually be in. Before writing stories, list out every state a caller of this component will hit in practice: the happy path, obviously, but also — does it load data (loading/skeleton state)? Can the data be empty (empty state)? Can it fail or be disabled (error/disabled state)? Does a `variant`/`size` prop change its look meaningfully enough to be worth seeing side by side? Each of those becomes a named story. Two traps to avoid: inventing a story for a state the component can't actually reach (padding out coverage for its own sake), and under-covering by only shipping `Default` when the component clearly has a loading or error path a caller will hit. Name stories after what the user *sees* (`ApproveLoading`, `RejectedWithReason`), never after a ticket number.

**Mechanics:**
- Set `control: false` in `argTypes` on callbacks, icons, and render props — those aren't meant to be fiddled with in the Controls panel.
- Mock data lives at the top of the story file (or a colocated `*.fixtures.ts` for larger sets) — never a real API hook.
- Dialogs, drawers, and anything with open/close or toggle state need a `render` function with local `useState`, not just static `args` — see `ConfirmDialog.stories.tsx` for the pattern.
- If the component needs context (a tooltip provider, query client, etc.), add it as a story **decorator** rather than baking provider logic into the component itself.

## Step 4 — Register it in the catalog (and the registry, if applicable)

Two bookkeeping updates, both in the same change as the component itself — not a follow-up you'll get to later:

1. **Add or update the entry in [`../component-sharing/references/component-catalog.md`](../component-sharing/references/component-catalog.md).** This is the file the `component-sharing` skill matches future feature requests against, and it only works if it reflects reality. Match the existing entry format — path, Storybook title, tags, one-line purpose, and the real props list — so the next person (or the next Claude session) scanning it can compare shape, not just name. Put it under the right layer heading (Primitives / Patterns / Composites) in that file.
2. **If the component lives in `src/components/shared/`**, also add it to `src/data/componentsRegistry.ts` and link it to the relevant pattern(s), per [`COMPONENT_STANDARDS.md`](../../../COMPONENT_STANDARDS.md) — this is the repo's own convention, independent of the skill's catalog, and other engineers check it before building their own version of the same thing.

Both of these are cheap right now and expensive later: an uncataloged component is invisible to the next feature request that could have reused it, which defeats the entire point of building it as shared in the first place.

## Step 5 — Actually use it where it was needed

A component built and cataloged but never wired into the screen that prompted it isn't finished — go back to wherever the original request came from and put the new (or newly-extended) component to work there:

- Import it into the calling screen/flow and pass real props sourced from that screen's actual data, not mock data.
- If this component consolidates something that used to be hand-rolled inline (or duplicated another component you found in Step 0's search), **remove the old inline markup or the duplicate** rather than leaving both around — half the value of consolidating is deleting the thing that was drifting.
- If you extended an existing component with a new prop/variant instead of building something new, make sure the call site that needed the new behavior is actually passing the new prop — it's easy to add a `variant` to a component and a story for it, and forget to flip the one screen that needed it over to use it.
- Sanity check both light and dark theme in the actual screen, not just in Storybook's isolated preview — a component can look right in isolation and still clash with its real surroundings.

## Before you call it done

- [ ] Confirmed via `component-sharing` (or otherwise) that this genuinely needed building/extending, not reusing as-is
- [ ] Lives in the correct layer folder with the matching Storybook title prefix (Step 1) — atomic in `ui/<name>/`, shareable in `shared/<ComponentName>/`, each with colocated `.tsx` + `.stories.tsx`
- [ ] Tailwind + Fronted Foundation `--ds-*` tokens; `Typography` + `Icon` atoms; matches `DESIGN_PRINCIPLES.md`; typed props with `variant`/`size` unions over booleans (Step 2)
- [ ] Story created inside the component folder, with tags beyond `autodocs`, covering the states it can actually reach — not padded, not under-covered (Step 3)
- [ ] Catalog entry added/updated in `component-sharing/references/component-catalog.md` (Step 4)
- [ ] Registered in `componentsRegistry.ts` if it's in `shared/` (Step 4)
- [ ] Actually imported and used at the real call site, with old duplicate/inline code removed if this replaced something (Step 5)
- [ ] Light and dark theme checked in the real screen, not just Storybook
