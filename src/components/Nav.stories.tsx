import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Nav from "./Nav";

const meta: Meta<typeof Nav> = {
  title: "Components/Nav",
  component: Nav,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "light" },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "200px", background: "#f5f5f5" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Nav>;

/** Desktop — 1440px */
export const Desktop: Story = {
  parameters: {
    viewport: { defaultViewport: "custom", viewports: { custom: { name: "Desktop", styles: { width: "1440px", height: "900px" } } } },
  },
};

/** Laptop — 1024px */
export const Laptop: Story = {
  parameters: {
    viewport: { defaultViewport: "custom", viewports: { custom: { name: "Laptop", styles: { width: "1024px", height: "768px" } } } },
  },
};

/** Tablet — 768px */
export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "custom", viewports: { custom: { name: "Tablet", styles: { width: "768px", height: "1024px" } } } },
  },
};

/** Mobile — 375px */
export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "custom", viewports: { custom: { name: "Mobile", styles: { width: "375px", height: "812px" } } } },
  },
};

/** Mobile Large — 414px */
export const MobileLarge: Story = {
  parameters: {
    viewport: { defaultViewport: "custom", viewports: { custom: { name: "Mobile Large", styles: { width: "414px", height: "896px" } } } },
  },
};
