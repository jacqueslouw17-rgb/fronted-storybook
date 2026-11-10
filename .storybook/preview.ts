import type { Preview } from "@storybook/react";
import React from "react";
import "../src/tokens.css";
import "../src/globals.css";
import "../src/typography.css";
import "../src/responsive.css";
import COMPONENT_IDS from "../src/component-ids.json";

/** A story's component ID (scripts/component-ids.mjs): on its wrapper as data-component-id, and as a small tag
 *  top right that copies it on click. Docs-only pages and flows have none. */
function idTag(id: string) {
  return React.createElement("button", {
    type: "button",
    title: "Component ID: click to copy",
    onClick: () => { try { navigator.clipboard.writeText(id); } catch (e) { /* no clipboard in this frame */ } },
    style: {
      position: "absolute", top: 8, right: 8, zIndex: 50, cursor: "copy",
      font: "500 11px/16px var(--ds-font-mono)", letterSpacing: ".02em",
      padding: "2px 8px", borderRadius: 999, border: "1px solid var(--ds-color-border)",
      background: "var(--ds-color-surface)", color: "var(--ds-color-text-muted)",
    },
  }, id);
}

/** Label each doc-table cell with its column header, so a table stacked on a phone
 *  (responsive.css) still says what each value is. Re-runs as the story changes. */
function labelTableCells(root: HTMLDivElement | null) {
  if (!root || (root as any).__labelled) return;
  (root as any).__labelled = true;
  const run = () => root.querySelectorAll("table").forEach((t) => {
    const heads = Array.from(t.querySelectorAll("thead th")).map((th) => (th.textContent || "").trim());
    if (!heads.length) return;
    t.querySelectorAll("tbody tr").forEach((tr) => Array.from(tr.children).forEach((td, i) => {
      if (heads[i] && td.getAttribute("data-th") !== heads[i]) td.setAttribute("data-th", heads[i]);
    }));
  });
  run();
  new MutationObserver(run).observe(root, { childList: true, subtree: true });
}

const preview: Preview = {
  globalTypes: {
    /* The component ID tag top right of a story; off for clean screenshots (the flow canvas's snapshots pass ids:hide) */
    ids: {
      description: "Show each story's component ID",
      defaultValue: "show",
      toolbar: { title: "IDs", icon: "tag", items: [{ value: "show", title: "Show IDs" }, { value: "hide", title: "Hide IDs" }], dynamicTitle: true },
    },
    theme: {
      description: "Brand theme — Fronted Brand (real identity, default) vs First Launch (launch look)",
      defaultValue: "fronted",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "fronted", title: "Fronted Brand" },
          { value: "interim", title: "First Launch" },
        ],
        dynamicTitle: true,
      },
    },
  },
  // Every story is checked at phone (390px) and desktop widths: see Viewport in the toolbar.
  tags: ["responsive"],
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as string) || "fronted";
      // Set on <html> so it themes portalled content too (Radix Dialog/Drawer).
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", theme);
      }
      const componentId = (COMPONENT_IDS as Record<string, string>)[context.id];
      return React.createElement(
        "div",
        {
          ref: labelTableCells,
          className: "sb-docs",
          "data-theme": theme,
          "data-component-id": componentId,
          style: {
            position: "relative",
            background: "var(--ds-color-bg)",
            color: "var(--ds-color-text)",
            fontFamily: "var(--ds-font-body)",
            minHeight: "100vh",
          },
        },
        componentId && context.globals.ids !== "hide" ? idTag(componentId) : null,
        React.createElement(Story)
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
    options: {
      storySort: { order: ["Introduction", "Brand", "Product Flows", "Design Strategy", ["Overview", "Principles"], "Foundations", "Inventory", "Components", "Patterns", "Governance"] },
    },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    viewport: {
      viewports: {
        desktop: { name: "Desktop", styles: { width: "1280px", height: "800px" }, type: "desktop" },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" }, type: "tablet" },
        mobile: { name: "Mobile", styles: { width: "390px", height: "844px" }, type: "mobile" },
      },
    },
  },
};

export default preview;
