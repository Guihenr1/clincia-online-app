import { Meta } from "@storybook/react";
import Base from "./Base";

export default {
  component: Base,
  args: {
    children: <h1>TEST</h1>,
  },
} as Meta;

export const Primary = (args: any) => <Base {...args} />;
