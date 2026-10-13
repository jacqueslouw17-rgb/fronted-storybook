import type { Preview } from "@storybook/react";
import React from "react";
import "../src/tokens.css";
import "../src/globals.css";
import "../src/typography.css";
import "../src/responsive.css";

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
      return React.createElement(
        "div",
        {
          ref: labelTableCells,
          className: "sb-docs",
          "data-theme": theme,
          style: {
            background: "var(--ds-color-bg)",
            color: "var(--ds-color-text)",
            fontFamily: "var(--ds-font-body)",
            minHeight: "100vh",
          },
        },
        React.createElement(Story)
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
    options: {
      storySort: { order: ["Introduction", "Brand", "Product Flows", "Flows", "Design Strategy", ["Overview", "Principles"], "Foundations", "Inventory", "Components", "Patterns", "Governance"] },
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
