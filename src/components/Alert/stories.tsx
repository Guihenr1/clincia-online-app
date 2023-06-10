import { Meta } from "@storybook/react";
import Alert from "./Alert";

export default {
  component: Alert,
  args: {},
} as Meta;

export const Success = (args: any) => <Alert {...args} />;
export const Error = (args: any) => <Alert {...args} />;
export const Warning = (args: any) => <Alert {...args} />;
export const Info = (args: any) => <Alert {...args} />;

Success.args = {
  children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  severity: "success",
};

Error.args = {
  children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  severity: "error",
};

Warning.args = {
  children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  severity: "warning",
};

Info.args = {
  children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  severity: "info",
};
