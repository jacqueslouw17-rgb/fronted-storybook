import type { Preview } from "@storybook/react";
import React from "react";
import "../src/tokens.css";
import "../src/globals.css";
import "../src/typography.css";

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
