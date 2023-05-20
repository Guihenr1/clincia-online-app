import { Meta } from "@storybook/react";
import Patient from "./Patient";

export default {
  component: Patient,
  args: {
    children: "",
  },
} as Meta;

export const Primary = (args: any) => <Patient {...args} />;

Primary.args = {
  children: "primary",
};
