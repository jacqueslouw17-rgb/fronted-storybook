import * as React from "react";
import { Section, Guidelines, KeyboardTable, Kbd, note } from "./_docTable";

/**
 * Usage + accessibility guidance registry — the judgment layer beside every component.
 * One source so every page reads consistently: when to use, Do / Don't, keyboard map,
 * and the accessibility notes that matter for that component.
 */

/** Render a set of keycaps separated by "/". */
function keys(...ks: string[]): React.ReactNode {
  return <>{ks.map((k, i) => <React.Fragment key={k}>{i > 0 && <span style={{ color: "var(--ds-color-text-muted)", margin: "0 2px" }}>/</span>}<Kbd>{k}</Kbd></React.Fragment>)}</>;
}

type Entry = {
  when: string;
  dos: React.ReactNode[];
  donts: React.ReactNode[];
  keyboard: Array<[React.ReactNode, string]>;
  a11y: React.ReactNode[];
};

export const GUIDANCE: Record<string, Entry> = {
  button: {
    when: "For a discrete action the user takes on this view. The gradient primary is the single most important action; everything else is outline or ghost.",
    dos: ["Keep one gradient primary per view — it's the anchor.", "Lead with a verb: “Send form”, “Approve”, “Add worker”.", "Use outline for supporting actions, ghost for tertiary/toolbar."],
    donts: ["Don't stack two primaries side by side — it splits focus.", "Don't use a button for navigation — that's a link.", "Don't rely on colour alone for a destructive action; label it."],
    keyboard: [[keys("Tab"), "Moves focus to the button; the focus ring is always visible."], [keys("Enter", "Space"), "Activates the button."]],
    a11y: ["Icon-only buttons need an aria-label and a hit area ≥ 24px.", "Disabled buttons are skipped in the tab order — pair with an explanation if the reason isn't obvious.", "Gradient primary carries near-white text at AA; the yellow brand primary uses black ink, never white."],
  },
  badge: {
    when: "A small, static label for status, role or a count. Read-only — never interactive.",
    dos: ["Pair status colour with a word (“Pending”, “Paid”) so meaning survives without colour.", "Use the Soft Accent set for status; keep it consistent across the app.", "Keep the label to one or two words."],
    donts: ["Don't attach a click handler — use a button or filter pill instead.", "Don't invent new status colours per screen.", "Don't put long sentences in a badge."],
    keyboard: [],
    a11y: ["A badge is not focusable and carries no role — it's a visual label.", "Never encode status by colour alone; the text is the source of truth.", "Tinted-fill + dark-text pairs are pre-checked for AA contrast."],
  },
  input: {
    when: "For a single line of free-form text or a number. Always paired with a Label.",
    dos: ["Give every input a visible Label tied with htmlFor.", "Use placeholder for an example, not as the label.", "Show validation inline, next to the field, on blur."],
    donts: ["Don't use the placeholder as the only label — it vanishes on typing.", "Don't disable a field without telling the user why.", "Don't block typing to enforce format; validate and guide instead."],
    keyboard: [[keys("Tab"), "Moves focus in and out of the field."], [keys("Esc"), "Clears focus (browser default) — does not clear the value."]],
    a11y: ["Label must be programmatically associated (htmlFor / id) — placeholder text is not a label.", "Error text needs aria-describedby so it's announced with the field.", "Placeholder text is intentionally low-contrast; never put essential info there."],
  },
  select: {
    when: "For choosing one option from a known, medium-length list. For very long lists, use Command (searchable).",
    dos: ["Order options predictably (frequency, then alphabetical).", "Set a sensible default where one exists.", "Keep labels short and parallel."],
    donts: ["Don't use a Select for 2–3 options — use a Segmented Toggle or Radio.", "Don't use it for multi-select — that needs a different control.", "Don't nest long paragraphs as options."],
    keyboard: [[keys("Space", "Enter"), "Opens the list."], [keys("↑", "↓"), "Moves the highlight between options."], [keys("Enter"), "Selects the highlighted option."], [keys("Esc"), "Closes without changing the value."], [<>type a letter</>, "Jumps to the matching option (type-ahead)."]],
    a11y: ["Trigger exposes the current value as its accessible name.", "Focus returns to the trigger on close.", "The open list traps arrow keys so the page doesn't scroll underneath."],
  },
  checkbox: {
    when: "For a single on/off choice, or selecting several items from a set independently.",
    dos: ["Use for independent options that don't affect each other.", "Give each checkbox a clickable label.", "Use an indeterminate state for a partially-selected group."],
    donts: ["Don't use a checkbox where only one of several can be true — use Radio.", "Don't use it for an instant setting toggle — use Switch.", "Don't leave it unlabelled."],
    keyboard: [[keys("Tab"), "Moves focus to the checkbox."], [keys("Space"), "Toggles checked / unchecked."]],
    a11y: ["The label is clickable and enlarges the target (Fitts's Law).", "State is exposed via the checkbox role — not by the tick colour alone.", "Group related checkboxes under a fieldset/legend."],
  },
  radio: {
    when: "For choosing exactly one option from a small, visible set (2–6). All options seen at once.",
    dos: ["Show all options at once — that's the point vs a Select.", "Pre-select the safest / most common default.", "Keep the set short (≤ 6)."],
    donts: ["Don't allow zero selection if an answer is required — default one.", "Don't use radios for independent toggles — use Checkbox.", "Don't use for long lists — use a Select."],
    keyboard: [[keys("Tab"), "Moves focus into the group (to the selected radio)."], [keys("↑", "↓", "←", "→"), "Moves to and selects the next / previous option."], [keys("Space"), "Selects the focused option."]],
    a11y: ["Arrow keys move selection within the group; Tab leaves it — standard radio semantics.", "Wrap the set in a group with an accessible name (legend).", "Selection is exposed by role, not by the dot colour."],
  },
  switch: {
    when: "For a setting that takes effect immediately — on or off, no Save.",
    dos: ["Use for instant, binary settings (notifications on/off).", "Label the setting, not the states.", "Reflect the real system state immediately."],
    donts: ["Don't use a Switch inside a form that needs a Save — use a Checkbox.", "Don't use it when the change is destructive or costly without confirmation.", "Don't rely on position alone; the label carries meaning."],
    keyboard: [[keys("Tab"), "Moves focus to the switch."], [keys("Space", "Enter"), "Toggles on / off."]],
    a11y: ["Exposes an on/off state via the switch role.", "The change applies instantly — no separate confirm step.", "Keep a visible focus ring; don't hide it on the track."],
  },
  label: {
    when: "The visible name for a form control. Every input, select, checkbox and switch gets one.",
    dos: ["Tie it to its control with htmlFor / id.", "Keep it short and in sentence case.", "Place it directly above or beside its control."],
    donts: ["Don't replace it with placeholder text.", "Don't wrap it around unrelated content.", "Don't hide it unless there's another accessible name."],
    keyboard: [[keys("Tab"), "Labels aren't focusable; clicking one focuses its control."]],
    a11y: ["A correctly associated label makes the whole label a click target for its control.", "It provides the control's accessible name for screen readers.", "If a label is visually hidden, the control still needs an accessible name."],
  },
  tabs: {
    when: "To switch between peer views of the same context without leaving the page.",
    dos: ["Use for 2–5 peer sections of one object.", "Keep one tab active at all times.", "Put the most important tab first and active by default."],
    donts: ["Don't use tabs for a sequence/wizard — that's stepped progress.", "Don't hide critical actions behind a rarely-visited tab.", "Don't overflow into many tabs — reconsider the IA."],
    keyboard: [[keys("Tab"), "Moves focus to the active tab, then into its panel."], [keys("←", "→"), "Moves between tabs."], [keys("Home", "End"), "Jumps to the first / last tab."]],
    a11y: ["Tab list uses roving focus — one tab stop for the whole set.", "Each tab controls its panel via aria-controls; the panel is labelled by its tab.", "The active tab is exposed by state, not only by the underline."],
  },
  tooltip: {
    when: "For a short, non-essential hint about a control — usually an icon-only button.",
    dos: ["Keep it to a few words.", "Attach it to a focusable trigger so keyboard users get it too.", "Use it to name icon-only controls."],
    donts: ["Don't hide essential information or actions in a tooltip.", "Don't put interactive content inside it.", "Don't show it on load or on non-interactive text."],
    keyboard: [[keys("Tab"), "Focusing the trigger shows the tooltip."], [keys("Esc"), "Dismisses the tooltip."]],
    a11y: ["Content appears on hover and on focus — not hover only.", "The tooltip labels or describes its trigger for assistive tech.", "It never traps the pointer or steals focus."],
  },
  avatar: {
    when: "To represent a person or entity with an image, with initials as the fallback.",
    dos: ["Provide a meaningful alt / name when the avatar conveys who.", "Fall back to initials, not a broken image.", "Keep sizes on the scale for alignment."],
    donts: ["Don't use an avatar as the only way to identify someone in a dense list — pair with a name.", "Don't stretch non-square images.", "Don't encode status only in a ring colour."],
    keyboard: [[keys("Tab"), "Only if the avatar is itself a control (e.g. a menu trigger)."]],
    a11y: ["Decorative avatars are aria-hidden; meaningful ones carry an accessible name.", "Initials fallback keeps identity legible when the image fails.", "A status dot on an avatar needs a text equivalent nearby."],
  },
  separator: {
    when: "To divide groups of content or controls where whitespace alone isn't enough.",
    dos: ["Use to separate meaningfully different groups.", "Prefer spacing first; add a rule only when it clarifies.", "Keep it subtle — a hairline, not a heavy bar."],
    donts: ["Don't scatter separators between every item — it adds noise.", "Don't use one as decoration where spacing would do.", "Don't make it darker than the border token."],
    keyboard: [],
    a11y: ["Decorative separators are aria-hidden so they add no screen-reader noise.", "A separator that conveys structure uses role=separator.", "Never rely on a line alone to convey grouping — spacing and headings carry it too."],
  },
  progress: {
    when: "To show determinate progress of a task — a percentage toward done.",
    dos: ["Use for known-length tasks (upload, signing steps).", "Pair the bar with a number or label.", "Animate smoothly toward the true value."],
    donts: ["Don't fake progress that isn't real.", "Don't use a determinate bar for unknown-length work — use a skeleton/spinner.", "Don't rely on the fill colour alone to signal state."],
    keyboard: [],
    a11y: ["Exposes role=progressbar with aria-valuenow / min / max.", "The percentage is available as text, not just the fill width.", "Colour is backed by a label so it reads without hue."],
  },
  collapsible: {
    when: "To hide secondary detail behind a labelled trigger the user can expand.",
    dos: ["Label the trigger with what's inside.", "Show a chevron that reflects open / closed.", "Keep the most important content visible by default."],
    donts: ["Don't hide critical information or the primary action.", "Don't nest many collapsibles deeply.", "Don't animate so slowly it feels sluggish."],
    keyboard: [[keys("Tab"), "Moves focus to the trigger."], [keys("Enter", "Space"), "Expands / collapses the content."]],
    a11y: ["The trigger exposes aria-expanded and controls its region.", "State is conveyed by the trigger, not the chevron rotation alone.", "Collapsed content is removed from the tab order until opened."],
  },
  skeleton: {
    when: "As a placeholder while real content loads, matching its final shape.",
    dos: ["Mirror the layout of the content that's coming.", "Keep the shimmer subtle.", "Swap to real content as soon as it's ready."],
    donts: ["Don't leave skeletons up longer than the real load.", "Don't use them for very fast (<300ms) loads — it flickers.", "Don't let them read out to screen readers."],
    keyboard: [],
    a11y: ["Skeletons are decorative and aria-hidden.", "Mark the loading region aria-busy so assistive tech knows content is pending.", "Announce completion by moving focus or a polite live region, not the shimmer."],
  },
  popover: {
    when: "For a small, focused panel of controls or info anchored to a trigger.",
    dos: ["Keep it to one focused task (a filter, a period picker).", "Return focus to the trigger on close.", "Anchor it to the control it belongs to."],
    donts: ["Don't overload it into a mini-page.", "Don't use a popover where a tooltip (hint) or dialog (blocking task) fits better.", "Don't trap the user — Esc must close it."],
    keyboard: [[keys("Space", "Enter"), "Opens the popover from the trigger."], [keys("Esc"), "Closes and returns focus to the trigger."], [keys("Tab"), "Cycles through the controls inside."]],
    a11y: ["Focus moves into the panel on open and back to the trigger on close.", "The trigger exposes aria-expanded.", "Clicking outside or Esc dismisses it — it never traps focus."],
  },
  dropdown: {
    when: "For a menu of actions or navigation choices triggered by a control.",
    dos: ["Group related actions; separate destructive ones.", "Keep labels action-led and scannable.", "Use for actions — not for form selection (use Select)."],
    donts: ["Don't put form fields inside a menu.", "Don't bury the primary action here — surface it.", "Don't make menus so long they need scrolling — reconsider."],
    keyboard: [[keys("Space", "Enter", "↓"), "Opens the menu."], [keys("↑", "↓"), "Moves between items."], [keys("Enter"), "Activates the item."], [keys("Esc"), "Closes the menu."]],
    a11y: ["Uses menu semantics with roving focus and type-ahead.", "Focus returns to the trigger on close.", "Separators and disabled items are conveyed via roles, not colour."],
  },
  dialog: {
    when: "For a focused task or confirmation that should interrupt the flow briefly.",
    dos: ["Give it a clear title and one primary action.", "Return focus to the trigger on close.", "Keep the content short — one job."],
    donts: ["Don't stack dialogs.", "Don't use a dialog for a non-blocking hint — use a popover/toast.", "Don't hide the close affordance."],
    keyboard: [[keys("Tab"), "Cycles through controls — focus is trapped inside."], [keys("Esc"), "Closes the dialog."], [keys("Enter"), "Triggers the default action when focus is on it."]],
    a11y: ["Focus is trapped while open and restored to the trigger on close.", "The dialog is labelled by its title (aria-labelledby).", "The background is inert and marked aria-hidden."],
  },
  alertdialog: {
    when: "For a consequential confirmation the user must resolve — delete, discard, irreversible actions.",
    dos: ["State the consequence plainly in the title/body.", "Make the safe choice the default focus.", "Name the destructive action (“Delete”), don't just say “OK”."],
    donts: ["Don't let it dismiss on outside click — a choice is required.", "Don't use it for routine, low-stakes confirmations.", "Don't make the destructive action the path of least resistance."],
    keyboard: [[keys("Tab"), "Cycles through the actions — focus is trapped."], [keys("Esc"), "Cancels (equivalent to the safe choice)."], [keys("Enter"), "Confirms the focused action."]],
    a11y: ["Uses alertdialog role so it's announced assertively.", "Focus lands on a control (usually Cancel), not the backdrop.", "Outside-click is disabled — the user must make a choice."],
  },
  sheet: {
    when: "For a side panel of related detail or a longer form — more room than a dialog, less than a page.",
    dos: ["Use for contextual detail or a multi-field form beside the current view.", "Keep the primary action pinned and visible.", "Return focus to the trigger on close."],
    donts: ["Don't use a sheet for a quick confirmation — that's a dialog.", "Don't cram a whole workflow into it.", "Don't hide the close control on scroll."],
    keyboard: [[keys("Tab"), "Cycles through controls — focus is trapped in the sheet."], [keys("Esc"), "Closes the sheet."]],
    a11y: ["Same semantics as a dialog: focus trap, labelled by its heading, background inert.", "Focus returns to the trigger on close.", "Scrollable content keeps the header and primary action reachable."],
  },
  command: {
    when: "For picking from a long list by typing — search-first selection or a command palette.",
    dos: ["Use when the list is long enough that scanning is slow.", "Filter as the user types; show the best match first.", "Group results with clear headings."],
    donts: ["Don't use it for a short, known set — a Select is simpler.", "Don't hide the fact that typing filters.", "Don't lose the user's query on re-open unless intended."],
    keyboard: [[<>type</>, "Filters the list live."], [keys("↑", "↓"), "Moves the highlight."], [keys("Enter"), "Selects the highlighted result."], [keys("Esc"), "Closes the palette."]],
    a11y: ["The input owns the list (aria-controls) and announces the active option.", "Result count changes are announced politely.", "Empty state is spelled out in text, not just an icon."],
  },
  calendar: {
    when: "For picking a date (or range) from a month grid.",
    dos: ["Show the current month and today clearly.", "Support typing a date as well as clicking, where possible.", "Mark disabled / out-of-range days visibly."],
    donts: ["Don't force calendar-only entry for a known date — allow typing.", "Don't hide which month you're on.", "Don't convey the selected day by colour alone."],
    keyboard: [[keys("←", "→"), "Moves by one day."], [keys("↑", "↓"), "Moves by one week."], [keys("PageUp", "PageDn"), "Moves by one month."], [keys("Enter", "Space"), "Selects the focused day."]],
    a11y: ["The grid uses roving focus; each day has an accessible date name.", "Selected and disabled days are exposed by state, not only colour.", "Month changes are announced so context isn't lost."],
  },
  segmented: {
    when: "For switching one setting between 2–4 mutually-exclusive options, all visible.",
    dos: ["Use for a small, fixed set of exclusive choices (View / Edit / Full).", "Keep labels short and parallel.", "Show the active segment with the solid fill."],
    donts: ["Don't use it for more than ~4 options — use a Select.", "Don't use it for multi-select.", "Don't rely on fill colour alone; the active label reads too."],
    keyboard: [[keys("Tab"), "Moves focus to a segment."], [keys("Enter", "Space"), "Selects the focused segment."]],
    a11y: ["Each segment is a real button with a visible focus ring.", "The active choice is exposed as pressed/selected state, not just fill.", "Solid-fill active segment meets AA text contrast."],
  },
  card: {
    when: "To group related content and actions into a single surface.",
    dos: ["Give a card one clear job and a scannable heading.", "If the whole card is clickable, make it one focusable target with an accessible name.", "Keep padding and radius on the tokens."],
    donts: ["Don't nest clickable cards inside clickable cards.", "Don't put many competing actions on one card.", "Don't make a card look interactive if it isn't."],
    keyboard: [[keys("Tab"), "Only if the card (or a control in it) is interactive."], [keys("Enter"), "Activates a card that acts as a link/button."]],
    a11y: ["A clickable card needs a single accessible name and one focus target — not nested links.", "Don't hide the heading hierarchy; cards still need real headings.", "Hover lift is decorative — never the only signal that a card is actionable."],
  },
  table: {
    when: "For rows of comparable records — workers, payslips, approvals — with per-row actions.",
    dos: ["Use real table semantics with header cells.", "Right-align numbers and use tabular figures.", "Make row actions real buttons with labels."],
    donts: ["Don't build a table out of divs where a table is meant.", "Don't hide the only way to act on a row behind hover on touch.", "Don't encode status with colour alone — use a labelled badge."],
    keyboard: [[keys("Tab"), "Moves through the interactive controls in each row."], [keys("Enter", "Space"), "Activates a row action or checkbox."]],
    a11y: ["Header cells (th) name their columns for assistive tech.", "Row-level actions have accessible names, not just icons.", "Status is carried by labelled badges, not colour alone."],
  },
};

/** Renders the Usage + Accessibility sections for a component key. */
export function Guidance({ k }: { k: keyof typeof GUIDANCE }) {
  const g = GUIDANCE[k];
  return (
    <>
      <Section title="Usage guidelines" sub={g.when}>
        <Guidelines dos={g.dos} donts={g.donts} />
      </Section>
      <Section title="Accessibility" sub="Keyboard, focus and contrast behaviour for this component.">
        {g.keyboard.length > 0 ? (
          <KeyboardTable rows={g.keyboard} />
        ) : (
          <p style={{ ...note, margin: 0 }}>Non-interactive — no keyboard behaviour. It is a visual element only.</p>
        )}
        <ul style={{ listStyle: "none", margin: "14px 0 0", padding: 0 }}>
          {g.a11y.map((a, i) => (
            <li key={i} style={{ display: "flex", gap: 10, padding: "7px 0", fontSize: 13.5, lineHeight: 1.55, color: "var(--ds-color-text)" }}>
              <span style={{ flex: "none", marginTop: 7, width: 5, height: 5, borderRadius: 999, background: "var(--ds-color-focus-ring)" }} />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
