# Component catalog

A hand-maintained index of `ecor-fe`'s shareable components — Primitives, Patterns, and Composites — with their real props, so a new feature request can be matched against what already exists **by shape, not by name**. A component named nothing like your feature can still be the right one to reuse if its props line up with what you need.

This file is not auto-generated. It goes stale the moment someone adds or changes a shareable component without updating it — see "Keeping this current" at the bottom. Treat it as the first place to look, not the only place: if nothing here looks close, still skim `src/components/shared/`, `patterns/`, and `ui/` directly and check `COMPONENT_STANDARDS.md` before concluding something doesn't exist.

**Folder convention for new work** (existing catalog entries may still be flat files until migrated):

- **Atomic / primitives** → `src/components/ui/<name>/<name>.tsx` + `<name>.stories.tsx` (lowercase), e.g. `ui/typography/typography.tsx`, `ui/icon/icon.tsx`
- **Foundations** → `src/foundation/` (tokens, type CSS, ramps). Not components.
- Shareable composites → `src/components/shared/<ComponentName>/<ComponentName>.tsx` + `<ComponentName>.stories.tsx` (PascalCase), e.g. `shared/EmployeeCard/EmployeeCard.tsx`

Each entry lists: where it lives, the **tags** on its Storybook story (match these against the tags you'd assign your own sketched-out component in Step 1), what it's for, and its actual props — so you can compare shape, not just guess from the name.

---

## Primitives (`src/components/ui/<name>/`)

### Typography

- **Path:** `src/components/ui/typography/` · **Storybook:** `Primitives/Typography` · **Tags:** `text`, `heading`, `body`, `label`, `caption`
- **Purpose:** every piece of text in new UI goes through this — never hand-roll `text-sm font-medium`. Roles from Fronted Foundation (Inter headings, Inter body).
- **Props:** `variant: "display"|"h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"body"|"body-lg"|"body-sm"|"label"|"caption"|"caption-strong"|"caption-meta"|"overline"|"metric"|"metric-lg"`, `color?: "default"|"muted"|"heading"|"primary"|"secondary"|"accent"|"destructive"|"success"|"warning"|"info"|"inherit"`, `as?: ElementType`.
- **In fronted-storybook:** `src/components/ui/typography/typography.tsx` · `Components/Typography` (IDs `typography-roles-1018`, `typography-playground-1445`, `typography-colours-5211`, `typography-tabular-figures-2676`). Clash Display headings, Inter body, from `typography.css`. Props: `variant?: "display"|"h1"…"h6"|"body-lg"|"body"|"body-sm"|"label"|"caption"|"overline"`, `color?: "default"|"heading"|"strong"|"muted"|"disabled"|"danger"|"success"|"warning"|"inherit"`, `as?`, `tabular?`.

### Icon

- **Path:** `src/components/ui/icon/` · **Storybook:** `Primitives/Icon` · **Tags:** `icon`, `lucide`, `atom`
- **Purpose:** the only way to render a glyph in new UI. Lucide, 2px stroke, sizes on the 4px grid. Check here before dropping raw `lucide-react` icons with ad-hoc `h-4 w-4`.
- **Props:** `icon: LucideIcon`, `size?: "xs"|"sm"|"md"|"lg"|"xl"` (12/14/16/20/24), `tone?: "muted"|"strong"|"brand"|"danger"|"disabled"|"inherit"`, `label?: string` (required when not decorative), `decorative?: boolean`.
- **In fronted-storybook:** `src/components/ui/icon/icon.tsx` · `Components/Icon` (IDs `icon-playground-8176`, `icon-sizes-8853`, `icon-tones-2492`, `icon-with-text-6237`, `icon-without-text-7892`, `icon-in-use-9504`). 2px stroke at every size; decorative unless `label` is set. Props: `icon`, `size?` as above, `tone?: "inherit"|"muted"|"strong"|"brand"|"success"|"warning"|"danger"|"disabled"` (brand = teal ink), `label?`. Exports `ICON_SIZE`, `HIT_TARGET_MIN` (24). "In use" lists the Lucide icons the prototype and canvas already use.

### Country

- **Path:** `src/components/ui/country/` · **Storybook:** `Primitives/Country` · **Tags:** `flag`, `country`, `atom`
- **Purpose:** country flag, localized name, and/or ISO code from an ISO 3166-1 alpha-2 code. Self-contained (no `country-options` / payroll utils). Default is flag only. `withName` adds the localized name. `show="code"` hides the name and shows the ISO. Invalid/empty code renders nothing. Sizes match Icon.
- **Props:** `code?: string`, `name?` (override localized name), `show?: "flag"|"name"|"code" | array of those` (default `"flag"`), `withName?`, `size?: "xs"|"sm"|"md"|"lg"|"xl"`, `label?`, `decorative?`, `nameTypography?: { variant?, color?, className? }`, `codeTypography?: { variant?, color?, className? }`.
- **Existing story variants:** `Flag`, `WithName`, `NameStyle`, `NameOnly`, `CodeOnly`, `FlagAndCode`, `FlagNameAndCode`, `Sizes`, `CommonCodes`, `MissingCode`.

### Button

- **Tags:** `button`, `action`, `cta`
- **Purpose:** all clickable actions, primary through ghost.
- **Props:** standard `<button>` attrs + `variant: "default"|"destructive"|"outline"|"secondary"|"ghost"|"link"`, `size: "default"|"sm"|"lg"|"icon"`, `asChild?: boolean` (render as a different element via Radix Slot).

### Badge

- **Path:** `src/components/ui/badge/` · **Import:** `@ui/badge/badge` · **Storybook:** `Primitives/Badge` · **Tags:** `badge`, `status`, `tag`, `pill`, `atom`
- **Deprecated:** `src/components/ui/badge.tsx` (`@/components/ui/badge`) — do not use for new UI.
- **Purpose:** status / label chip. Do not build a new colored pill — extend `variant`. Canonical colour is Soft Accent (fill/20 + outline/30). Static — no hover. Worker-card chip uses `size="chip"`.
- **Props:** standard `<div>` attrs + `variant: "default"|"secondary"|"destructive"|"outline"|"accent"|"primary"|"green"|"yellow"|"purple"|"info"|"danger"|"neutral"`, `size?: "default"|"sm"|"micro"|"chip"|"count"`.
- **Existing story variants:** `Default`, `Base variants`, `Sizes`, `Status colours`, `Role & markers`, `With icon / dot`, `WorkerStatus`.

### Input

- **Path:** `src/components/ui/input/` · **Import:** `@ui/input/input` · **Storybook:** `Primitives/Input` · **Tags:** `input`, `form-field`, `text`
- **Deprecated:** `src/components/ui/input.tsx` (`@/components/ui/input`) remains intact for existing consumers.
- **Purpose:** folder-based input primitive for native input types and autocomplete, semantic surfaces/sizes, prefix/suffix content, Lucide adornments, loading, clearing, and secure password visibility. Feature forms needing domain behavior should still prefer the relevant shared field component.
- **Props:** native `<input>` attrs (including `type`, `autoComplete`, `inputMode`, `disabled`, `readOnly`, `aria-invalid`) plus `variant?: "outline"|"filled"|"ghost"`, `size?: "sm"|"md"|"lg"`, `prefix?`, `suffix?`, `leadingIcon?`, `trailingIcon?`, `loading?`, `clearable?`, `onClear?`, `secure?`, `containerClassName?`.
- **Existing story variants:** `Default`, `VisualVariants`, `Sizes`, `States`, `FieldTypes`, `Affixes`, `NativeTypes`, `Autocomplete`, `SecureAndActions`.

### Label

- **Path:** `src/components/ui/label/` · **Import:** `@ui/label/label` · **Storybook:** `Primitives/Label` · **Tags:** `label`, `form-field`, `text`
- **Deprecated:** `src/components/ui/label.tsx` (`@/components/ui/label`) remains intact for existing consumers.
- **Purpose:** folder-based Radix label primitive with semantic default, field, control-row, and section roles plus icon and required/optional indicators.
- **Props:** Radix Label Root props plus `variant?: "default"|"field"|"control"|"section"`, `icon?`, `required?`, `optional?`, `optionalText?`, `className`, and `htmlFor`.
- **Existing story variants:** `Default`, `SemanticVariants`, `Indicators`, `Variants`.

### Form

- **Path:** `src/components/ui/form/` · **Import:** `@ui/form/form` or `@ui/form/index` · **Storybook:** `Primitives/Form` · **Tags:** `form`, `form-field`, `validation`, `accessibility`, `layout`
- **Deprecated:** `src/components/ui/form.tsx` (`@/components/ui/form`) remains intact for existing consumers.
- **Purpose:** folder-based React Hook Form composition with generated accessible relationships, vertical/horizontal/inline field layouts, message tones, semantic field groups, legends, action rows, and error summaries.
- **API:** `Form`/`Form.Root`, `Form.Field`, `Form.Item`, `Form.Label`, `Form.Control`, `Form.Description`, `Form.Message`, `Form.Group`, `Form.Legend`, `Form.Actions`, `Form.ErrorSummary`; named aliases for every utility; `useFormField()` for custom field-aware primitives.
- **Existing story variants:** `Default`, `WithDescription`, `ValidationError`, `Disabled`, `LayoutVariants`, `MessageTones`, `CompleteForm`.

### Card

- **Tags:** `card`, `container`, `surface`
- **Purpose:** the base surface for any card/panel-shaped content.
- **Props:** `variant?: "default"|"gradient"|"accent"`, `hover?: boolean`, plus standard `<div>` attrs. Compose with `CardHeader`/`CardContent`/`CardFooter`.

### Table

- **Tags:** `table`, `list`, `rows`, `grid`
- **Purpose:** the base primitive for any tabular data. Compose rows/cells yourself — this is unopinionated markup (`Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`), not a full data-table component.

### Skeleton

- **Tags:** `loading`, `skeleton`, `placeholder`
- **Purpose:** loading placeholder shapes. See `ApprovalsListSkeleton` below for a worked example of composing several into a list-loading state.

### PayrollContentSkeleton (`src/components/shared/PayrollContentSkeleton/`)

- **Storybook:** `Composites/Payroll/ContentSkeleton` · **Tags:** `payroll`, `loading`, `skeleton`, `list`
- **Purpose:** shared payroll loading state with payroll metrics and worker-list placeholders. Use the optional copy props for access checks or period refreshes instead of creating another payroll skeleton.
- **Props:** `title?: string`, `subtitle?: string`.

### AdminDashboardSkeleton (`src/components/shared/AdminDashboardSkeleton/`)

- **Storybook:** `Composites/Admin Dashboard/Skeleton` · **Tags:** `kanban`, `loading`, `skeleton`
- **Purpose:** screen-shaped loading state for the worker Kanban board. Use it for dashboard initialization, retry, access, and candidate loading states so the page has one consistent main loader.
- **Props:** `title?: string`, `subtitle?: string`.

### Avatar

- **Tags:** `avatar`, `person`, `photo`, `initials`
- **Purpose:** photo with initials fallback — `Avatar`/`AvatarImage`/`AvatarFallback`. Used inside `PersonMiniCard` and worth reusing directly for any "show a person" need that doesn't match `PersonMiniCard`'s exact shape.

### Dialog / AlertDialog

- **Tags:** `dialog`, `modal`, `overlay`
- **Purpose:** raw Radix dialog primitives. Don't build directly on these for a confirmation flow — see `ConfirmDialog` in Patterns first. For a right-side sheet, use **Drawer** (`@shared/Drawer`), not a new Sheet wrapper.

---

## Patterns (`src/components/patterns/`)

### ConfirmDialog

- **Storybook:** `Patterns/ConfirmDialog` · **Tags:** `dialog`, `confirm`, `approve`, `reject`, `destructive-action`
- **Purpose:** confirmation prompt before any critical action — approve, reject, delete, bulk actions. This repo has drifted into 15+ hand-rolled duplicates of this exact pattern (`F1v4_ApproveConfirmationModal`, `F41v5_WithdrawDialog`, etc.) — always check here first before building any "are you sure?" dialog.
- **Props:** `open`, `onOpenChange`, `title`, `description?`, `children?` (slot for extra content, e.g. a reason textarea), `confirmLabel?`, `cancelLabel?`, `onConfirm`, `onCancel?`, `variant?: "default"|"destructive"`, `loading?`, `disabled?`, `icon?: LucideIcon`, `className?`.
- **Existing story variants:** `Default`, `Destructive`, `ApproveRequest`, `ApproveAllRequests`, `RejectWithReason` (dialog + `Textarea` in `children`, confirm disabled until non-empty), `ApproveLoading`. A new "confirm with X" need is almost always a new story here, not a new component.

### Control Room (fronted-storybook)

- **Path:** `fronted-storybook/src/components/flows/control-room.tsx` · **Storybook:** `Patterns/Control Room` (IDs `control-room-default-7630`, `control-room-kpi-tiles-1902`, `control-room-pipeline-cards-4613`, `control-room-to-do-8044`) · **Tags:** `dashboard`, `pipeline`, `kpi`, `filter`, `list`
- **Purpose:** Fronted ops' worker pipeline across clients (Control Center experiment, `/flows/control-center` in the prototype). KPI tiles that filter the pipeline, one or several at once; the pipeline's own stages; calm cards with one tag only for ops' step; To do beside it. Built from Typography and Icon.
- **Exports:** `KpiTile` (`label`, `value`, `sub`, `icon`, `tone?: "default"|"warning"|"success"`, `selected?`, `onToggle?`), `PipelineCard` (`worker`, `onOpen?`), `StageColumn` (`stage`, `workers`, `width?`), `TodoList` (`groups: {title, items: {name, detail, days?}[]}[]`), plus `STAGES`, `WORKERS`, `overdue`, `needsOps`.

---

## Composites / Shared (`src/components/shared/<ComponentName>/`)

### StandardInput

- **Tags:** `input`, `text`, `email`, `password`, `number`, `textarea`, `form-field`
- **Purpose:** every plain text/email/password/number/textarea field.
- **Props:** `id`, `label`, `value`, `onChange`, `type?: "text"|"email"|"password"|"number"|"textarea"`, `required?`, `error?`, `helpText?`, `placeholder?`, `disabled?`, `locked?`, `lockMessage?`, `completed?`, `rows?`, `autoComplete?`.

### PhoneInput

- **Tags:** `phone`, `input`, `form-field`, `country-code`
- **Purpose:** every phone number field, with country code selector.
- **Props:** `value`, `onChange`, `countryCode?`, `onCountryCodeChange?`, `label?`, `required?`, `error?`, `helpText?`, `disabled?`.

### CurrencyInput

- **Tags:** `currency`, `money`, `salary`, `input`, `form-field`
- **Purpose:** every salary/payment/currency amount field.
- **Props:** `value`, `onChange`, `currency?`, `onCurrencyChange?`, `label?`, `required?`, `error?`, `helpText?`, `disabled?`, `showCurrencySelect?`.

### DateOfBirthPicker

- **Tags:** `date`, `birthdate`, `calendar`, `form-field`
- **Purpose:** date-of-birth fields specifically (range-restricted 1900–today).
- **Props:** `value?: Date`, `onChange`, `label?`, `required?`, `placeholder?`, `autoFilled?`.

### NationalitySelect

- **Tags:** `nationality`, `country`, `select`, `form-field`
- **Purpose:** nationality/country selection with flags, searchable.
- **Props:** `value`, `onValueChange`, `label?`, `required?`, `placeholder?`, `autoFilled?`, `id?`, `triggerClassName?`.

### MonthlyPayScheduleInput

- **Tags:** `payroll`, `pay-schedule`, `input`, `form-field`
- **Purpose:** day-of-month payroll scheduling field, with month-end edge case warnings.
- **Props:** `value`, `onChange`, `label?`, `required?`, `error?`, `helpText?`, `disabled?`.

### PersonMiniCard

- **Storybook:** none yet · **Tags:** `person`, `card`, `list-item`, `pipeline`, `contact`
- **Purpose:** show a person in a list/pipeline/selection context — name, role, avatar, country, status, optional checkbox. Use this for avatar-based list rows. For pipeline column cards with fee/country/type rows and View / Draft Contract actions, use **WorkerCard**.
- **Props:** `name`, `role?`, `email?`, `avatar?`, `countryCode?`, `countryFlag?`, `status?`, `statusVariant?: "default"|"secondary"|"destructive"|"outline"|"accent"|"primary"`, `onSelect?`, `isSelected?`, `showCheckbox?`, `onClick?`, `className?`.

### WorkerCard

- **Path:** `src/components/shared/WorkerCard/` · **Storybook:** `Composites/WorkerCard` · **Tags:** `person`, `card`, `pipeline`, `worker`, `actions`
- **Purpose:** pipeline worker card — name, flag, optional status `Badge`, role, labeled detail rows, optional checkbox, and shared `Button` actions. Omit `showCheckbox` to hide selection. Pass `badge` for the Active/Awaiting chip (`ml-auto`). Pass only `secondaryAction` or only `primaryAction` for a single full-width button; pass both for the two-button row.
- **Props:** `name`, `role?`, `countryCode?` (ISO alpha-2, rendered via `Country`), `badge?: { label, variant? }` (`Badge` atom, size chip), `details?: {label, value}[]`, `showCheckbox?`, `checked?`, `onCheckedChange?`, `secondaryAction?: {label, onClick, icon?, disabled?}`, `primaryAction?: {label, onClick, icon?, disabled?}`, `onClick?`, `className?`.
- **Existing story variants:** `Two buttons + checkbox`, `Two buttons`, `Single button`, `Status badge`, `Single button + checkbox`, `Selected`, `Employee`.

### DetailRow

- **Path:** `src/components/shared/DetailRow/` · **Import:** `@shared/DetailRow` · **Storybook:** `Composites/DetailRow` · **Tags:** `row`, `label-value`, `atom`
- **Purpose:** read-only label/value row (Fronted Storybook Table & List · ReadOnlyRow). Optional hover info tooltip. Empty `value` renders `"—"`. Independent of Accordion — compose as children, do not pass `items: DetailRowProps[]` into Accordion.
- **Props:** `label`, `value?: ReactNode`, `info?` (tooltip), `emptyLabel?` (default `"—"`), `className?`.
- **Existing story variants:** `Default`, `WithInfo`, `Empty`, `Stack`.

### Accordion / AccordionSection

- **Path:** `src/components/shared/AccordionSection/` · **Import:** `@shared/AccordionSection` · **Storybook:** `Composites/AccordionSection` · **Tags:** `accordion`, `collapsible`, `section`
- **Purpose:** collapsible card sections. Body is children-only (forms, rows, any UI). `Accordion type="single"` is one-open-at-a-time. `disabled` + `disabledHint` lock a section. `headerAction` sits beside the title, outside the toggle.
- **Accordion props:** `type?: "single"|"multiple"` (default `multiple`), `value?`, `defaultValue?`, `onValueChange?`, `collapsible?` (default true), `children`, `className?`.
- **AccordionSection props:** `value?` (id inside Accordion), `title: ReactNode`, `open?` / `onOpenChange?` / `defaultOpen?` (standalone only), `disabled?`, `disabledHint?`, `badge?`, `headerAction?`, `children?`.
- **Existing story variants:** `Closed`, `Open`, `WithForm`, `Disabled`, `HeaderAction`, `OneAtATime`, `Multiple`.

### Drawer

- **Path:** `src/components/shared/Drawer/` · **Import:** `@shared/Drawer` · **Storybook:** `Composites/Drawer` · **Tags:** `sheet`, `drawer`, `panel`
- **Purpose:** right-side sheet (Fronted Storybook Components / Sheet). Generic host for forms, accordions, or any body. Sticky header, scrolling body, optional Cancel + Save footer. Default width wide / 520px. Do not retrofit existing feature drawers unless asked. Compose a flag into `title` with `Country` if needed.
- **Props:** `title: ReactNode`, `description?: ReactNode`, `descriptionHidden?`, `header?` / `headerAction?`, `children?`, `footer?`, `secondaryAction?` / `primaryAction?: { label, onClick, disabled? }`, `size?: "compact"|"standard"|"wide"|"xl"|"2xl"`, `side?: "right"|"left"`, `open?` / `onOpenChange?` / `defaultOpen?`, `trigger?`, `inline?` (Storybook canvas, no portal), `modal?` (default true).
- **Existing story variants:** `Form (Sheet story)`, `Worker detail`, `Title as React node`, `Compact`, `Overlay (Sheet)`.

### StandardChecklistItem

- **Tags:** `checklist`, `checkbox`, `status`, `compliance`, `onboarding`
- **Purpose:** every checklist row in compliance/onboarding flows.
- **Props:** `id`, `title`, `description?`, `checked`, `onCheckedChange`, `status?: "pending"|"completed"|"overdue"|"in-progress"`, `disabled?`, `className?`.

### StandardProgress

- **Tags:** `progress`, `steps`, `stepper`
- **Purpose:** step progress bar for flows.
- **Props:** `currentStep`, `totalSteps`, `variant?: "default"|"secondary"|"accent"`, `showLabel?`, `className?`.

### EmptyState

- **Storybook:** `Composites/EmptyState` · **Tags:** `empty`, `placeholder`, `no-data`, `zero-state`
- **Purpose:** every "nothing here yet" state. Already has a story titled **"No managers yet"** — check existing stories here before writing new empty-state copy, someone may have already designed the one you need.
- **Props:** `icon?: LucideIcon`, `title`, `description?`, `action?: {label, onClick}`, `children?`, `className?`, `size?: "sm"|"md"`.

### TextAreaWithMax

- **Storybook:** `Composites/TextAreaWithMax` (check exact title in file) · **Tags:** `textarea`, `character-count`, `form-field`
- **Purpose:** multi-line text input with a max-length counter.
- **Props:** `id?`, `label?`, `value`, `onChange`, `maxLength?`, `placeholder?`, `required?`, `error?`, `className?`, `fieldClassName?`, `singleLine?`, `rows?`.

### SearchableSelect

- **Tags:** `select`, `dropdown`, `searchable`, `combobox`
- **Purpose:** any dropdown that needs search-as-you-type, prefix icons, or keyword matching (options take `value`/`label`/`searchText?`/`keywords?`/`prefix?`).

### Pagination

- **Path:** `src/components/shared/Pagination/` · **Storybook:** `Composites/Pagination` · **Tags:** `pagination`, `list`, `page-controls`, `table`
- **Purpose:** list/table pagination footer from Fronted Storybook (range label + Previous / page numbers / Next). Use this for new paginated lists. `ListPagination` is the older 0-indexed control still used in existing screens.
- **Props:** `page` (1-indexed), `pageCount`, `onPageChange`, `totalCount?`, `pageSize?`, `itemLabel?`, `summary?`, `disabled?`, `className?`.

### ListPagination

- **Path:** `src/components/shared/ListPagination.tsx` · **Tags:** `pagination`, `list`, `page-controls`
- **Purpose:** older page-number controls (`pageNo` is 0-indexed). Prefer `Pagination` for new work.
- **Props:** `pageNo`, `pageCount`, `onPageChange`, `disabled?`, `className?`.

### UndoDecisionButton

- **Path:** `src/components/shared/UndoDecisionButton/` · **Storybook:** `Composites/UndoDecisionButton` · **Tags:** `undo`, `confirm`, `dialog`, `action`
- **Purpose:** Inline Undo action that opens the standard confirmation prompt before reopening an approved or rejected decision.
- **Props:** `onUndo`, `targetLabel`, `disabled?`, `loading?`, `className?`, `iconClassName?`, `ariaLabel?`.

### ApprovalsListSkeleton (`src/components/company-admin/`)

- **Storybook:** `Composites/Approvals/ListSkeleton` · **Tags:** `skeleton`, `loading`, `list`
- **Purpose:** loading state for a list-of-rows layout. Feature-scoped folder, but the pattern (a handful of `Skeleton` rows + optional header) is the one to copy for any new list's loading state, not reinvent.
- **Props:** `rows?: number` (default 5), `showHeader?: boolean`.

### ApprovalRequestRow (`src/components/company-admin/`)

- **Storybook:** `Composites/Approvals/RequestRow` (check exact title) · **Tags:** `row`, `approval`, `list-item`, `company-admin`
- **Purpose:** feature-scoped (Company Admin approvals) — a worked example of a composite row with selection, status, and action buttons. Not generically reusable outside that domain, but the shape (data prop in, selection/loading/action callbacks out) is the pattern to copy for a similar domain-specific row elsewhere.
- **Props:** `request`, `selected?`, `onSelectChange?`, `canApprove?`, `isUpdating?`, `onApprove?`, `onReject?`, `showSelection?`.

### PayrollTestingPanel (`src/components/flows/admin-profile/PayrollTestingPanel/`)

- **Storybook:** `Composites/Admin Profile/PayrollTestingPanel` · **Tags:** `payroll`, `qa`, `destructive-action`
- **Purpose:** an admin-profile QA panel for simulating payroll dates and previewing or permanently purging scoped test payroll data. It is intentionally feature-scoped and delegates API mutations to its parent.
- **Props:** `companies`, `isLoadingCompanies?`, `onSimulateDay`, `onPreviewPurge`, `onPurge`, `isSimulating?`, `isPreviewingPurge?`, `isPurging?`.

---

## How to use this for matching (Step 1/2 in SKILL.md)

1. For the feature you're building, sketch each visual piece as if it were its own component: give it a name, a one-line purpose, and the props/data it would realistically need.
2. Scan this catalog for an entry with the **same purpose**, then compare props — an overlapping prop set (even with different names) is a real match; a completely different prop shape under a similar-sounding name usually isn't.
3. Prefer matching on tags and purpose over matching on your own sketched component's name — the whole point is that "manager list row" and `PersonMiniCard` don't share a name but do share a shape.
4. If nothing here is close, this catalog might just be behind — glance at the real folders and `COMPONENT_STANDARDS.md` before concluding it's genuinely new.

## Keeping this current

This file only stays useful if it's updated in the same change that adds or meaningfully edits a shareable component. Whenever `component-sharing`'s Step 5/6 has you create or extend something in `ui/`, `patterns/`, or `shared/` (or a feature's `Composites/<Feature>` folder), add or update its entry here too — path, Storybook tags, purpose, and current props. Skipping this is how the catalog silently goes stale and stops being trustworthy.

### ChoiceGroup

- **Path:** `src/components/shared/ChoiceGroup/ChoiceGroup.tsx` · **Storybook:** `Composites/Input Groups/ChoiceGroup` · **Tags:** `radio`, `selection`, `form-field`
- **Purpose:** accessible controlled single selection as descriptive cards or compact segments.
- **Props:** Radix RadioGroup props plus `options: readonly ChoiceOption[]`, `variant?: "cards" | "segmented"`. Options provide `value`, `label`, optional `description`, `badge`, and `disabled`.
