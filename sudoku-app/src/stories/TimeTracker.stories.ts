import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import "../index.css";
import { fn } from "storybook/test";

import { TimeTracker } from "../components";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/TimeTracker",
  component: TimeTracker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    isPaused: { control: "boolean" },
    seconds: { control: "number" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof TimeTracker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { isPaused: false, seconds: 0 },
};
