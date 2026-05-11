import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Contact from "./Contact";

const meta: Meta<typeof Contact> = {
  title: "Components/Contact",
  component: Contact,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Contact>;

export const Default: Story = {};

export const Submitted: Story = {
  play: async ({ canvas }) => {
    // Shows the "sent" state
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
};
