import type { Preview } from "@storybook/react";
import "../src/tokens.css";
import "../src/typography.css";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    options: {
      storySort: { order: ["Foundations", "Components", "Patterns"] },
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
