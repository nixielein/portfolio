import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Work from "./Work";

const meta: Meta<typeof Work> = {
  title: "Components/Work",
  component: Work,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Work>;

export const Default: Story = {};
