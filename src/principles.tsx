import * as React from "react";

/**
 * Design Strategy — principle registry (single source of truth).
 *
 * One data file, several views:
 *  • the card grid + coverage matrix on Design Strategy › Overview
 *  • the tabbed anatomy + per-pattern contextual breakdown on each principle page
 *  • the "Principles applied" chip strip on a component / pattern story
 *
 * A principle carries a general anatomy (Why → When → Trade-offs → Measures →
 * Default rules). Where it's applied, the SAME anatomy is retold for that pattern,
 * so the strategy stays concrete.
 */

export type PrincipleStatus = "active" | "coming-soon";
export type StageKey = "intent" | "why" | "when" | "tradeoffs" | "measures" | "rules";

/** Stage metadata — colour-coded (brand ramps only), used by tabs, panels and the legend. */
export const STAGES: { key: StageKey; label: string; bg: string; bd: string }[] = [
  { key: "intent", label: "Intent", bg: "var(--p-teal-50)", bd: "var(--p-teal-200)" },
  { key: "why", label: "Why", bg: "var(--p-green-50)", bd: "var(--p-green-200)" },
  { key: "when", label: "When it matters", bg: "var(--p-neutral-100)", bd: "var(--p-neutral-300)" },
  { key: "tradeoffs", label: "Trade-offs", bg: "var(--p-yellow-100)", bd: "var(--p-yellow-300)" },
  { key: "measures", label: "Measures", bg: "var(--p-rose-50)", bd: "var(--p-rose-200)" },
  { key: "rules", label: "Default rules", bg: "var(--p-neutral-50)", bd: "var(--p-neutral-300)" },
];

/** A concrete application of the principle to a component or pattern. */
export interface Application {
  target: string;      // story display name
  isPattern?: boolean; // patterns carry the full contextual anatomy
  summary: string;     // one-liner (chip tooltip + card)
  why?: string;
  when?: string[];
  tradeoffs?: string[];
  measures?: string[];
  rules?: string[];
}

export interface Principle {
  id: string;
  storyId: string;
  n: number;
  name: string;
  intent: string;
  status: PrincipleStatus;
  /** The established source this is grounded in (law / heuristic / UPOD). */
  grounding?: string;
  /** Why ours is strongest — the competitor edge (EOR differentiation). */
  edge?: string;
  why?: string;
  when?: string[];
  tradeoffs?: string[];
  measures?: string[];
  rules?: string[];
  applications?: Application[];
}

/** Columns for the coverage matrix (kept in sync with the component/pattern stories). */
export const TARGETS = ["Buttons", "Fields", "M1 · Panel"] as const;

export const PRINCIPLES: Principle[] = [
  {
    id: "p1",
    storyId: "design-strategy-principles--p-1",
    n: 1,
    name: "Edit in Context",
    intent: "Keep users oriented while they make changes.",
    status: "active",
    grounding: "Universal Principles of Design — proximity + cognitive-load reduction.",
    edge: "Incumbents route small changes to separate pages or modals; we keep the edit where the data lives, so admins never lose their place mid-payroll.",
    why: "Reduce cognitive load by keeping work and edits in the same mental frame.",
    when: [
      "High-frequency, small-scope edits",
      "Reviewing while editing (need immediate feedback)",
      "Tasks with many small adjustments (avoid “edit fatigue”)",
    ],
    tradeoffs: [
      "Higher state complexity (focus, dirty, saved, error handling)",
      "Requires strong clarity of “what changed” and “how to revert”",
      "Risk of accidental edits if affordances are unclear",
    ],
    measures: [
      "Time-to-change (start edit → change saved)",
      "Error rate (validation failures / incorrect edits)",
      "Abandon rate (edit started but not completed)",
      "Undo/cancel rate (how often people back out)",
      "Repeat edits (same field edited again within X mins)",
      "Edit started → saved without rollback",
    ],
    rules: [
      "Prefer in-place changes when scope is small and local",
      "Make edit mode unmistakable (clear boundary + actions)",
      "Always provide a safe exit (cancel/undo)",
      "Validate near the change (before committing)",
      "Add confirmation only when consequences are high",
    ],
    applications: [
      {
        target: "M1 · Panel",
        isPattern: true,
        summary: "Fields are configured in place inside the slide-over — you edit where the data lives.",
        why: "The panel keeps the record in view while you edit its fields, so you adjust in the same frame you’re reviewing and never lose your place.",
        when: [
          "Configuring a worker / company record’s fields",
          "Adding or removing fields during setup",
          "Tweaking a single value while reviewing the record",
        ],
        tradeoffs: [
          "The panel must track per-field state (focus, dirty, saved, error) without a full page reload",
          "“What changed” has to stay obvious right up to Save",
          "Weak hover affordances make edit / remove easy to mis-tap",
        ],
        measures: [
          "Time from open panel → change saved",
          "Field-level validation failures before Save",
          "Panels opened but closed without saving (abandon)",
          "Cancel vs Save ratio",
        ],
        rules: [
          "Edit inline in the panel — never route to a separate page",
          "Reveal edit / remove on hover, with clear minimal icons",
          "Cancel and Save are always present as the safe exit",
          "Validate each field before Save, not after",
        ],
      },
    ],
  },
  {
    id: "p2",
    storyId: "design-strategy-principles--p-2",
    n: 2,
    name: "Single Focus",
    intent: "Offer one clear next action at a time.",
    status: "active",
    grounding: "Hick's Law — every extra choice slows the decision.",
    edge: "Rippling and Papaya are beaten in reviews for overwhelming users (\"info doesn't fit on screen\"); we present one clear next step instead of everything at once.",
    why: "Every extra option slows the decision (Hick’s Law). A single primary action gets people moving faster and with more confidence.",
    when: [
      "Empty states with one obvious next step",
      "First-run / first-time setup",
      "Any moment that has a single primary action",
    ],
    tradeoffs: [
      "Can hide secondary actions some users occasionally want",
      "Needs a clear primary-vs-secondary hierarchy",
      "Over-applied, it can feel restrictive",
    ],
    measures: [
      "Time-to-first-action from an empty state",
      "First-attempt completion rate",
      "Drop-off before the first action is taken",
    ],
    rules: [
      "Lead an empty state with one primary action",
      "Make that action a large, obvious target (Fitts’s Law)",
      "One primary action per view — demote the rest",
      "Reveal secondary options only once they’re relevant",
    ],
    applications: [
      {
        target: "M1 · Panel",
        isPattern: true,
        summary: "The empty panel leads with one “Add your first field” action.",
        why: "Before any fields exist, the panel offers a single action instead of a blank form — fewer choices, a faster start.",
        when: [
          "The panel before any fields are configured",
          "Adding the very first field",
          "Any point with one obvious next step",
        ],
        tradeoffs: [
          "The one CTA must read as the primary action, not decoration",
          "Bulk / advanced add needs a home once fields exist",
        ],
        measures: [
          "Time from opening an empty panel → first field added",
          "Empty panels closed without adding a field",
        ],
        rules: [
          "Empty panel = one primary “Add your first field”",
          "Make it a large, obvious target (Fitts’s Law)",
          "Hide secondary actions until there’s something to act on",
        ],
      },
    ],
  },
  {
    id: "p3",
    storyId: "design-strategy-principles--p-3",
    n: 3,
    name: "Focus Mode",
    intent: "When acting on one thing, isolate it and let the rest recede.",
    status: "active",
    grounding: "Von Restorff (isolation) effect + Gestalt figure/ground.",
    edge: "Where dense EOR admin tools leave a wall of equal-weight fields, we make the active item unmistakable so you always know what you're changing.",
    why: "The isolated element draws attention (Von Restorff effect) and reads as the figure against a receded ground — so the user knows exactly what they’re changing.",
    when: [
      "Adding or editing a single item within a larger surface",
      "In-place edits where context should stay visible",
      "Lists where one row becomes the active one",
    ],
    tradeoffs: [
      "Must keep enough context to stay oriented",
      "Over-dimming can feel abrupt",
      "Needs one clear way back out",
    ],
    measures: [
      "Time to complete the focused edit",
      "Edits committed to the wrong item",
      "Cancels / abandons during focus mode",
    ],
    rules: [
      "Entering add/edit gives the active element a distinct focus state",
      "Visually recede (dim / quiet) the surrounding elements",
      "Don’t force focus or pre-empt the user’s first choice (e.g. a type dropdown)",
      "Always offer a clear exit back to the full view",
    ],
    applications: [
      {
        target: "M1 · Panel",
        isPattern: true,
        summary: "Adding or editing a field puts it in a focus state; the other fields recede.",
        why: "The active field becomes the figure and the rest drops to ground (figure/ground), so it’s unmistakable which field you’re changing.",
        when: [
          "Adding a new field from the empty state",
          "Editing one field among several",
          "Any in-place edit inside the panel",
        ],
        tradeoffs: [
          "Must keep the panel’s other fields legible enough for context",
          "The focus ring shouldn’t overwhelm the small panel",
          "Cancel must always return to the full list",
        ],
        measures: [
          "Time to complete the focused add / edit",
          "Edits saved to the wrong field",
          "Cancels during focus mode",
        ],
        rules: [
          "The field being added / edited gets its own focus ring",
          "Surrounding fields dim while one is focused",
          "Don’t auto-focus — the first control is a type dropdown, so let the user choose",
          "The panel header signals “Focus — adding / editing a field”",
        ],
      },
    ],
  },
  {
    id: "p4",
    storyId: "design-strategy-principles--p-4",
    n: 4,
    name: "One Primary Action",
    intent: "Give each view a single, unmistakable primary action.",
    status: "active",
    grounding: "Visual hierarchy; Von Restorff; the Aesthetic-Usability effect.",
    edge: "We show one dominant action and hide the ones that can't do anything yet — the opposite of the button-soup admin screens users complain about.",
    why: "Competing calls-to-action split attention and slow the decision. One dominant action makes the next step obvious; everything else is demoted or removed.",
    when: [
      "Empty / first-run states",
      "Dialogs, panels and forms",
      "Any screen with one clear main goal",
    ],
    tradeoffs: [
      "Secondary actions still need a home",
      "What counts as “primary” can be debated",
      "Hiding actions can surprise power users",
    ],
    measures: [
      "Primary-action click-through",
      "Time-to-primary-action",
      "Mis-clicks on secondary controls",
    ],
    rules: [
      "Exactly one visually dominant primary action per view",
      "Demote or remove secondary / duplicate actions",
      "Don’t show actions that can’t do anything yet (e.g. Save with nothing to save)",
      "Make the primary action the largest, highest-contrast target",
    ],
    applications: [
      {
        target: "M1 · Panel",
        isPattern: true,
        summary: "The empty panel shows only “Add your first field” — Save / Cancel appear once there’s something to save.",
        why: "With no fields yet, Save and Cancel can’t do anything, so they’re removed. A single primary action keeps the empty state unambiguous.",
        when: [
          "The empty panel, before any field exists",
          "Before there’s a change worth saving",
        ],
        tradeoffs: [
          "The footer must return at the right moment",
          "Users shouldn’t wonder where Save went",
        ],
        measures: [
          "First-field completion from the empty state",
          "Confusion about the missing Save",
        ],
        rules: [
          "Empty panel = one primary “Add your first field”",
          "No Save / Cancel until at least one field exists",
          "Reintroduce the footer once there’s something to save",
        ],
      },
    ],
  },
  {
    id: "p5",
    storyId: "design-strategy-principles--p-5",
    n: 5,
    name: "Absorb the Complexity",
    intent: "The system carries the complexity — not the user.",
    status: "active",
    grounding: "Tesler's Law (Conservation of Complexity) — complexity can't be removed, only shifted.",
    edge: "Every incumbent exports payroll and compliance complexity to the admin; we absorb it with smart defaults, computed fields and a compliance engine. This is our spine.",
    why: "Payroll and cross-border compliance are irreducibly complex. If we don't carry that load, the user does — and that's exactly where competitors overwhelm and lose trust.",
    when: [
      "Country-specific rules and statutory calculations",
      "Gross-to-net, contributions, FX",
      "Anywhere a value can be computed rather than asked",
    ],
    tradeoffs: [
      "More logic and data for us to own and keep correct",
      "Users may still want to see or override what we computed",
      "The “magic” must stay explainable, never a black box",
    ],
    measures: [
      "Fields auto-filled vs manually entered",
      "Admin time per payroll run",
      "“How do I calculate…” support tickets",
      "Errors caused by manual entry",
    ],
    rules: [
      "Compute, don't ask, wherever we can",
      "Ship sensible country defaults; let users override, not configure from zero",
      "Never surface a rule the user has to memorise",
      "Keep computed values explainable — show the workings on demand",
    ],
    applications: [
      {
        target: "M1 · Panel",
        isPattern: true,
        summary: "Estimated Net and line items are computed; the admin reviews, not calculates.",
        why: "The panel shows a finished payroll picture — earnings, deductions, overtime already worked out — so the admin verifies rather than does the maths.",
        rules: [
          "Show computed totals, not empty calculators",
          "Adjustments carry their own computed amount",
          "Let the admin expand to see how a number was reached",
        ],
      },
    ],
  },
  {
    id: "p6",
    storyId: "design-strategy-principles--p-6",
    n: 6,
    name: "Total Cost, Always Clear",
    intent: "Show the full cost before every commit — no surprises.",
    status: "active",
    grounding: "Signal-to-noise ratio (Universal Principles of Design); Von Restorff for the total; transparency.",
    edge: "Directly attacks Rippling's quote-gating and the universal hidden-fee complaint — we show gross → employer cost → statutory → FX + fee → total, up front.",
    why: "Money decisions need full information at the moment of commit. Hidden or deferred cost is the number-one trust-killer in this category.",
    when: [
      "Before running payroll or a payout",
      "Adding a worker (true employment cost)",
      "Any FX conversion",
      "Any fee the user will bear",
    ],
    tradeoffs: [
      "Breakdowns get dense — they need strong hierarchy",
      "More data to source reliably (rates, statutory, FX)",
      "Transparency exposes unflattering fees — but hiding them is worse",
    ],
    measures: [
      "Cost breakdown viewed before commit (%)",
      "Tickets about unexpected charges",
      "Drop-off at the cost / confirm step",
      "Trust / NPS on pricing clarity",
    ],
    rules: [
      "Show the itemised total before any commit",
      "Make the final total the visual figure; detail recedes",
      "State FX rate + fee + received amount explicitly",
      "Never gate a price behind a quote or a sales call",
    ],
    applications: [
      {
        target: "M1 · Panel",
        isPattern: true,
        summary: "Estimated Net sits at the top as the figure; earnings / deductions / overtime itemise beneath it.",
        why: "The net figure reads as the headline; the breakdown is right there to justify it — nothing is hidden behind a later step.",
        rules: [
          "Net / total is the largest number on the panel",
          "Every line item is visible and labelled",
          "Attachments and sources are one tap away",
        ],
      },
    ],
  },
  {
    id: "p7",
    storyId: "design-strategy-principles--p-7",
    n: 7,
    name: "Status You Can Trust",
    intent: "Always answer: where is this, what's next, who's blocking.",
    status: "active",
    grounding: "Nielsen heuristic #1 — visibility of system status.",
    edge: "The single most common gap across Deel, Oyster, Papaya and Rippling — users can't tell what's happening with their money. We make status first-class.",
    why: "In payroll, ambiguity is anxiety. Every worker, contract, adjustment and run must carry an unambiguous, honest status and a trail of how it got there.",
    when: [
      "Payroll run and payout states",
      "Contract signature status",
      "Adjustment approval states",
      "Anything asynchronous or multi-party",
    ],
    tradeoffs: [
      "Requires reliable state plumbing behind the UI",
      "Honest status can surface delays we'd rather hide",
      "More states to design and keep consistent",
    ],
    measures: [
      "“What's the status of…” support tickets",
      "Time to locate a record's status",
      "Actions taken on stale / blocked items",
    ],
    rules: [
      "Every record shows a single, unambiguous status pill",
      "Pair status with a timestamped trail (who / when / what)",
      "Name the blocker and the next step, not just the state",
      "Use one consistent status vocabulary across the product",
    ],
    applications: [
      {
        target: "M1 · Panel",
        isPattern: true,
        summary: "PENDING badges mark each unresolved adjustment; approving / rejecting resolves them.",
        why: "You can see at a glance which lines still need a decision and act on them — the panel is a status surface, not just a form.",
        rules: [
          "Each adjustment shows its own status",
          "The count of pending items is visible",
          "Resolving an item updates its status immediately",
        ],
      },
    ],
  },
  {
    id: "p8",
    storyId: "design-strategy-principles--p-8",
    n: 8,
    name: "Prevent Money Mistakes",
    intent: "Make the highest-stakes moment safe.",
    status: "active",
    grounding: "Nielsen — error prevention; Universal Principles of Design — forgiveness.",
    edge: "Clunky reruns and corrections are named Papaya / Rippling failures; we validate before money moves and make fixes easy.",
    why: "A payroll error is real money and real trust, gone. Prevention beats cure — validate up front, preview the outcome, and confirm only the irreversible.",
    when: [
      "Before submitting or paying",
      "Off-cycle runs and corrections",
      "Destructive or irreversible actions",
      "Bulk actions across many workers",
    ],
    tradeoffs: [
      "Confirmations add friction — reserve them for real consequence",
      "Validation must be right, or it blocks valid work",
      "Undo / preview needs supporting state",
    ],
    measures: [
      "Validation failures caught before submit",
      "Post-payout corrections / reversals",
      "Mis-approvals",
      "Confirmation-dialog abandon rate",
    ],
    rules: [
      "Validate near the change, before commit",
      "Preview the exact outcome before paying",
      "Confirm only when consequences are high or irreversible",
      "Make corrections and off-cycle reruns first-class, not afterthoughts",
    ],
    applications: [
      {
        target: "M1 · Panel",
        isPattern: true,
        summary: "Approve-all / Reject-all act on reviewed items; edits validate on the field before Save.",
        why: "Decisions are explicit and batched, and a field can't be saved invalid — so mistakes are caught before money moves.",
        rules: [
          "Batch approve / reject after review, never silently",
          "Validate each field before Save",
          "Confirm destructive actions (removing a field / adjustment)",
        ],
      },
    ],
  },
  {
    id: "p9",
    storyId: "design-strategy-principles--p-9",
    n: 9,
    name: "Compliance in Context",
    intent: "Surface the rule at the moment of action — not in a help centre.",
    status: "active",
    grounding: "Recognition over recall (Nielsen); progressive disclosure (Universal Principles of Design).",
    edge: "Pebl's inline AI compliance is the thing buyers love; we bake the country rule into the form itself.",
    why: "No admin can memorise every country's rules. Show the relevant statutory field, threshold or note exactly where and when it's needed.",
    when: [
      "Country-specific onboarding fields",
      "Statutory adjustments and thresholds",
      "Anywhere local rules change the form",
    ],
    tradeoffs: [
      "Requires accurate, maintained country data",
      "Too many inline notes become noise",
      "Rules change — content must stay current",
    ],
    measures: [
      "Compliance-related errors / rejections",
      "Help-centre searches for country rules",
      "Time to complete country-specific forms",
    ],
    rules: [
      "Show the rule where the field is, not in a separate doc",
      "Reveal country detail only once the country is set (progressive)",
      "Explain the “why” for unusual fields (e.g. TIN / PhilHealth ID)",
      "Keep rule content versioned and current",
    ],
  },
  {
    id: "p10",
    storyId: "design-strategy-principles--p-10",
    n: 10,
    name: "Worker-Grade Mobile",
    intent: "Every worker surface is thumb-first.",
    status: "active",
    grounding: "Fitts's Law; responsive design.",
    edge: "Deel and Rippling mobile explicitly lag; only RemotePass takes worker mobile seriously — we match that intent natively, and our components are already responsive.",
    why: "Workers live on phones. A payslip, a request, a document must be effortless one-handed — where the incumbents treat mobile as an afterthought.",
    when: [
      "All worker-facing flows (pay, adjustments, onboarding, documents)",
      "Approvals on the go",
      "Anywhere used away from a desk",
    ],
    tradeoffs: [
      "Every layout must earn its space at 375px",
      "Dense admin tables need real reflow work",
      "Touch targets compete with information density",
    ],
    measures: [
      "Mobile task-completion rate",
      "Tap accuracy / mis-taps",
      "Mobile vs desktop drop-off",
      "Time-to-first-action on mobile",
    ],
    rules: [
      "Design worker flows mobile-first — stack, don't shrink",
      "Primary actions are large, thumb-reachable targets (≥ 44px)",
      "Drawers become full-height sheets on mobile",
      "Tables reflow to stacked rows; boards to column carousels",
    ],
    applications: [
      {
        target: "M1 · Panel",
        isPattern: true,
        summary: "The slide-over becomes a full-height sheet on mobile; actions stay thumb-reachable.",
        why: "On a phone the panel takes the full screen so the worker can act one-handed, with the primary action in easy reach.",
        rules: [
          "Full-height sheet under ~768px",
          "Footer actions stay pinned and tappable",
          "Fields stack to a single column",
        ],
      },
    ],
  },
  {
    id: "p11",
    storyId: "design-strategy-principles--p-11",
    n: 11,
    name: "Make the Money Moment Feel Good",
    intent: "Payday and “you're all set” should feel effortless — and a little celebratory.",
    status: "active",
    grounding: "Peak-End Rule; the Aesthetic-Usability effect.",
    edge: "A clean, trustworthy surface materially raises perceived reliability of money-handling; incumbents make payday feel like an audit.",
    why: "People remember the peaks and the end of an experience. Payday and onboarding-complete are our peaks — invest disproportionate polish there.",
    when: [
      "Payout confirmed / paid states",
      "Onboarding complete",
      "Successful approval or submission",
    ],
    tradeoffs: [
      "Delight must not undercut the seriousness of money",
      "Celebration feels hollow if the rest is rough",
      "Restraint — a moment, not a parade",
    ],
    measures: [
      "Satisfaction / NPS after payday",
      "Repeat engagement after first payout",
      "Onboarding-completion sentiment",
    ],
    rules: [
      "Design the paid / complete states as first-class, not afterthoughts",
      "Confirm the outcome clearly and warmly",
      "Keep it tasteful — trust first, delight second",
    ],
  },
  {
    id: "p12",
    storyId: "design-strategy-principles--p-12",
    n: 12,
    name: "One Product, Two Clean Tracks",
    intent: "Employee (EOR) and contractor (COR) share one shell but stay visibly distinct.",
    status: "active",
    grounding: "Consistency (Universal Principles of Design); Jakob's Law.",
    edge: "Avoids the “everything everywhere” overload of Rippling / Papaya while keeping the unified view Papaya is praised for.",
    why: "EOR and COR are legally different — different flows, fields, compliance and payment. One dashboard, but never a blurred experience.",
    when: [
      "Onboarding an employee vs a contractor",
      "Payroll run vs invoice payment",
      "Adjustments and approvals per worker type",
    ],
    tradeoffs: [
      "Two tracks means more surface to keep consistent",
      "Shared components must flex to both without leaking one into the other",
      "Users must always know which track they're in",
    ],
    measures: [
      "Wrong-track errors (employee treated as contractor)",
      "Task completion per worker type",
      "Confusion about worker type",
    ],
    rules: [
      "One shell, two clearly-labelled tracks",
      "Share components; diverge the flow, fields and compliance",
      "Always show the worker type (EOR / COR) unambiguously",
      "Same solution to the same problem across both tracks",
    ],
  },
];

/* ---------------- helpers ---------------- */
export const activePrinciples = () => PRINCIPLES.filter((p) => p.status === "active");
export const principlesFor = (target: string) =>
  PRINCIPLES.filter((p) => p.status === "active" && p.applications?.some((a) => a.target === target));
export const applicationFor = (p: Principle, target: string) =>
  p.applications?.find((a) => a.target === target);
// Absolute (leading "/") so target="_top" navigates the Storybook MANAGER (keeps the
// sidebar) instead of resolving relative to iframe.html (which drops the shell).
export const storyHref = (storyId: string) => `/?path=/story/${storyId}`;

/** pattern display name → its story id (deep links). */
export const PATTERN_STORY: Record<string, string> = {
  "Pay Breakdown": "patterns-pay-breakdown--pay-breakdown",
  "Signing Progress": "patterns-signing-progress--signing-progress",
  "Contract Preview": "patterns-contract-preview--contract-preview",
  "Document Upload": "patterns-document-upload--document-upload",
  "Tag Input": "patterns-tag-input--tag-input",
  "Attachments & Loading": "patterns-attachments-loading--attachments-loading",
};

/** which patterns each principle shows up in, and why it lives there. */
export const PRINCIPLE_PATTERNS: Record<number, { pattern: string; why: string }[]> = {
  1: [{ pattern: "Pay Breakdown", why: "Edit amounts inline in the drawer, right next to the total they change." }, { pattern: "Document Upload", why: "Replace a file in place — no separate edit screen." }, { pattern: "Tag Input", why: "Add context where the expense actually lives." }],
  2: [{ pattern: "Signing Progress", why: "One signing step is live at a time; the rest wait their turn." }, { pattern: "Contract Preview", why: "Read the agreement, then act — nothing else competes for attention." }],
  3: [{ pattern: "Pay Breakdown", why: "The drawer isolates one worker's pay from the whole run." }, { pattern: "Signing Progress", why: "The signature flow is a single, focused task surface." }],
  4: [{ pattern: "Pay Breakdown", why: "“Approve all” is the one primary action; reject stays quiet." }, { pattern: "Signing Progress", why: "A single Sign / Send button drives each step." }],
  5: [{ pattern: "Pay Breakdown", why: "Gross, deductions and net are computed for you — you just approve." }, { pattern: "Contract Preview", why: "Legal complexity is pre-filled; only the variables are highlighted." }],
  6: [{ pattern: "Pay Breakdown", why: "Every line item and the net total are visible before you commit." }],
  7: [{ pattern: "Signing Progress", why: "A real progress bar and per-step states you can trust." }, { pattern: "Attachments & Loading", why: "Skeletons set honest expectations while data loads." }, { pattern: "Document Upload", why: "Done / uploading / error states are always explicit." }],
  8: [{ pattern: "Pay Breakdown", why: "A lock-and-approve confirmation guards the irreversible payout." }],
  9: [{ pattern: "Contract Preview", why: "Country rules surface as highlighted, in-context variables." }, { pattern: "Document Upload", why: "Compliance documents are requested exactly where they're needed." }],
  10: [{ pattern: "Signing Progress", why: "Full-width, thumb-friendly steps on a worker's phone." }, { pattern: "Pay Breakdown", why: "The drawer collapses to one scrollable column on mobile." }],
  11: [{ pattern: "Pay Breakdown", why: "The “Ready for payroll” moment feels resolved, not anxious." }, { pattern: "Signing Progress", why: "Completing every step lands on a satisfying done-state." }],
  12: [{ pattern: "Contract Preview", why: "One agreement surface flexes to employee (EOR) and contractor (COR)." }, { pattern: "Pay Breakdown", why: "Salary vs fee is the same drawer, cleanly branched." }],
};
const patternsForPrinciple = (n: number) => PRINCIPLE_PATTERNS[n] ?? [];

/* ---------------- shared styles ---------------- */
export const sWrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 1000 };
export const sMono: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)" };
export const sEyebrow: React.CSSProperties = { fontSize: 13, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "26px 0 12px" };

const numberBadge = (active: boolean, size = 18): React.CSSProperties => ({
  display: "inline-flex", alignItems: "center", justifyContent: "center", width: size, height: size,
  borderRadius: 9999, background: active ? "var(--p-teal-600)" : "var(--p-neutral-300)", color: "#fff",
  fontSize: size <= 18 ? 11 : 13, fontWeight: 700, flex: "none",
});
const intentBand: React.CSSProperties = {
  background: "var(--p-teal-50)", border: "1px solid var(--p-teal-200)", borderRadius: 12,
  padding: "12px 18px", color: "var(--p-teal-700)", fontSize: 16, fontWeight: 500,
};
const soonTag: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em",
  color: "var(--p-teal-700)", background: "var(--p-teal-50)", border: "1px solid var(--p-teal-200)",
  borderRadius: 9999, padding: "3px 10px",
};
/* refreshed principle styles */
const chipStyle: React.CSSProperties = { fontSize: 11, fontWeight: 500, color: "var(--ds-color-text-muted)", background: "var(--ds-color-surface-sunken)", border: "1px solid var(--ds-color-border)", borderRadius: 9999, padding: "3px 9px" };
const backLink: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "var(--ds-color-text-muted)", textDecoration: "none" };
const groundChip: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 500, color: "var(--ds-color-text)", background: "var(--ds-color-surface-sunken)", border: "1px solid var(--ds-color-border)", borderRadius: 9999, padding: "5px 12px" };
const patCard: React.CSSProperties = { display: "block", textDecoration: "none", color: "var(--ds-color-text)", background: "var(--ds-color-surface)", border: "1px solid var(--ds-color-border)", borderRadius: 14, padding: "14px 16px", transition: "border-color .15s" };

/** Render a stage value (string or bullet list). */
function StageBody({ val }: { val?: string | string[] }) {
  if (!val) return null;
  if (Array.isArray(val))
    return <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.7 }}>{val.map((t, i) => <li key={i}>{t}</li>)}</ul>;
  return <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>{val}</p>;
}

/* ================================================================== *
 * View — Overview card grid
 * ================================================================== */
function PrincipleCard({ p }: { p: Principle }) {
  const active = p.status === "active";
  const pats = patternsForPrinciple(p.n);
  return (
    <a href={storyHref(p.storyId)} target="_top"
       style={{ position: "relative", display: "flex", flexDirection: "column", gap: 8, textDecoration: "none", color: "var(--ds-color-text)", background: "var(--ds-color-surface)", border: "1px solid var(--ds-color-border)", borderRadius: 16, padding: "18px 20px", minHeight: 176, overflow: "hidden", transition: "border-color .15s, transform .15s, box-shadow .15s" }}
       onMouseEnter={(e) => { const el = e.currentTarget; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "0 10px 26px -12px rgba(0,0,0,0.18)"; el.style.borderColor = "var(--ds-color-border-strong)"; }}
       onMouseLeave={(e) => { const el = e.currentTarget; el.style.transform = "none"; el.style.boxShadow = "none"; el.style.borderColor = "var(--ds-color-border)"; }}>
      <span aria-hidden style={{ position: "absolute", top: 2, right: 14, fontSize: 62, fontWeight: 800, lineHeight: 1, color: "var(--ds-color-border)", letterSpacing: "-0.04em", userSelect: "none" }}>{String(p.n).padStart(2, "0")}</span>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, position: "relative", zIndex: 1 }}>
        <span style={{ fontFamily: "var(--ds-font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "var(--ds-color-text-muted)" }}>{p.n <= 4 ? "BEHAVIOUR" : "PRODUCT"}</span>
        {!active && <span style={soonTag}>Soon</span>}
      </div>
      <div className="ds-h5" style={{ margin: 0, color: "var(--ds-color-heading)", position: "relative", zIndex: 1, maxWidth: 215 }}>{p.name}</div>
      <div style={{ fontSize: 13, lineHeight: 1.55, color: "var(--ds-color-text-muted)", flex: 1, position: "relative", zIndex: 1 }}>{p.intent}</div>
      {active && pats.length ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4, position: "relative", zIndex: 1 }}>
          {pats.map((a) => <span key={a.pattern} style={chipStyle}>{a.pattern}</span>)}
        </div>
      ) : null}
    </a>
  );
}

function TierHeading({ kicker, title, sub }: { kicker: string; title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontFamily: "var(--ds-font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", color: "var(--ds-color-text-muted)" }}>{kicker.toUpperCase()}</span>
        <h3 className="ds-h4" style={{ margin: 0 }}>{title}</h3>
      </div>
      <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--ds-color-text-muted)", maxWidth: 640 }}>{sub}</p>
    </div>
  );
}

export function PrincipleCardGrid() {
  const grid: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(272px, 1fr))", gap: 16, alignItems: "stretch" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      <section>
        <TierHeading kicker="Tier A" title="How a screen behaves" sub="Interaction-level principles that shape every component and pattern." />
        <div style={grid}>{PRINCIPLES.filter((p) => p.n <= 4).map((p) => <PrincipleCard key={p.id} p={p} />)}</div>
      </section>
      <section>
        <TierHeading kicker="Tier B" title="What an EOR product must be" sub="Product-level commitments that set Fronted apart from other EOR tools." />
        <div style={grid}>{PRINCIPLES.filter((p) => p.n > 4).map((p) => <PrincipleCard key={p.id} p={p} />)}</div>
      </section>
    </div>
  );
}

/* ================================================================== *
 * View — principle page (tabbed anatomy + per-pattern contextual)
 * ================================================================== */
function TabBar({ active, onPick }: { active: StageKey; onPick: (k: StageKey) => void }) {
  return (
    <div role="tablist" style={{ display: "inline-flex", flexWrap: "wrap", gap: 4, padding: 4, background: "var(--p-neutral-100)", border: "1px solid var(--ds-color-border)", borderRadius: 9999 }}>
      {STAGES.map((s) => {
        const on = s.key === active;
        return (
          <button key={s.key} role="tab" aria-selected={on} onClick={() => onPick(s.key)}
            style={{ display: "inline-flex", alignItems: "center", gap: 7, border: 0, cursor: "pointer", borderRadius: 9999, padding: "6px 14px", fontFamily: "var(--ds-font-body)", fontSize: 13, fontWeight: on ? 600 : 500, color: on ? "var(--ds-color-text)" : "var(--ds-color-text-muted)", background: on ? "var(--ds-color-surface)" : "transparent", boxShadow: on ? "var(--p-shadow-sm)" : "none" }}>
            <span style={{ width: 8, height: 8, borderRadius: 9999, background: s.bd, flex: "none" }} />
            {s.label}
          </button>
        );
      })}
    </div>
  );
}

export function PrinciplePage({ p }: { p: Principle }) {
  const tier = p.n <= 4 ? "A" : "B";
  const pats = patternsForPrinciple(p.n);
  const anatomy = STAGES.filter((s) => s.key !== "intent");

  return (
    <div style={{ ...sWrap, maxWidth: 880 }}>
      <a href="/?path=/story/design-strategy--overview" target="_top" style={{ ...backLink, padding: "7px 12px", border: "1px solid var(--ds-color-border)", borderRadius: 9999, background: "var(--ds-color-surface)" }}>← Back to all principles</a>

      <div style={{ ...sMono, margin: "16px 0 6px" }}>Principle {String(p.n).padStart(2, "0")} · Tier {tier} · {tier === "A" ? "Behaviour" : "Product"}</div>
      <h2 className="ds-h2" style={{ margin: "0 0 12px", fontSize: 34, lineHeight: 1.15 }}>{p.name}</h2>
      <p style={{ fontSize: 18, lineHeight: 1.5, color: "var(--ds-color-text)", margin: "0 0 16px", maxWidth: 680 }}>{p.intent}</p>
      {p.grounding ? <span style={groundChip}>Grounded in · {p.grounding}</span> : null}

      <h3 style={sEyebrow}>The anatomy</h3>
      <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: 16, overflow: "hidden", background: "var(--ds-color-surface)" }}>
        {anatomy.map((s, i) => {
          const val = p[s.key];
          if (!val) return null;
          return (
            <div key={s.key} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 20, padding: "18px 20px", borderTop: i ? "1px solid var(--ds-color-border)" : "none" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                <span style={{ width: 8, height: 8, borderRadius: 9999, background: s.bd, flex: "none", marginTop: 5 }} />
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)" }}>{s.label}</span>
              </div>
              <div style={{ color: "var(--ds-color-text)" }}><StageBody val={val} /></div>
            </div>
          );
        })}
      </div>

      {pats.length ? (
        <>
          <h3 style={sEyebrow}>Applied in these patterns</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 12 }}>
            {pats.map((a) => (
              <a key={a.pattern} href={storyHref(PATTERN_STORY[a.pattern] ?? "")} target="_top" style={patCard}
                 onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--ds-color-border-strong)"; }}
                 onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--ds-color-border)"; }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: "var(--ds-color-heading)" }}>{a.pattern}</span>
                  <span style={{ fontSize: 13, color: "var(--ds-color-text-muted)" }}>↗</span>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--ds-color-text-muted)", marginTop: 6 }}>{a.why}</div>
              </a>
            ))}
          </div>
        </>
      ) : null}

      {p.edge ? (
        <div style={{ marginTop: 24, background: "var(--ds-color-surface-sunken)", border: "1px solid var(--ds-color-border)", borderRadius: 14, padding: "16px 18px", borderLeft: "3px solid var(--ds-color-border-strong)" }}>
          <div style={{ ...sMono, margin: "0 0 4px" }}>Why ours is strongest</div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--ds-color-text)" }}>{p.edge}</p>
        </div>
      ) : null}
    </div>
  );
}

/* ================================================================== *
 * View — coming-soon principle page
 * ================================================================== */
export function ComingSoon({ p }: { p: Principle }) {
  return (
    <div style={sWrap}>
      <div style={{ ...sMono, marginBottom: 4 }}>Principle {p.n}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <h2 className="ds-h2" style={{ margin: 0 }}>{p.name}</h2>
        <span style={soonTag}>Coming soon</span>
      </div>
      <div style={{ ...intentBand, marginBottom: 20 }}>{p.intent}</div>
      <p className="ds-body" style={{ color: "var(--ds-color-text-muted)", maxWidth: 620 }}>
        This principle is scoped but not yet written up. It’ll follow the same tabbed anatomy — Why, When it matters, Trade-offs, Measures, Default rules — with a contextual breakdown per pattern.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
        {STAGES.map((s) => (
          <div key={s.key} style={{ border: "1px dashed var(--ds-color-border-strong)", borderRadius: 9999, padding: "8px 16px", color: "var(--ds-color-text-disabled)", fontSize: 13, fontWeight: 500 }}>{s.label}</div>
        ))}
      </div>
    </div>
  );
}
