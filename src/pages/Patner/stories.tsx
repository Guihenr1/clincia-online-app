import { Meta } from "@storybook/react";
import Patner from "./Patner";

export default {
  component: Patner,
  args: {
    children: "",
  },
} as Meta;

export const Primary = (args: any) => <Patner {...args} />;

Primary.args = {
  children: "primary",
};
