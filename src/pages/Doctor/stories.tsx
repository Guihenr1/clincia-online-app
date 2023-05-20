import { Meta } from "@storybook/react";
import Doctor from "./Doctor";

export default {
  component: Doctor,
  args: {
    children: "",
  },
} as Meta;

export const Primary = (args: any) => <Doctor {...args} />;

Primary.args = {
  children: "primary",
};
