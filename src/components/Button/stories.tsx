import { MouseEvent } from "react";
import { Meta } from "@storybook/react";
import Button from "./Button";
import BugReportIcon from "@mui/icons-material/BugReport";

function onClick(e: MouseEvent<HTMLButtonElement>): void {
  console.log("CLICKED", e);
}

export default {
  component: Button,
  args: {
    onClick: onClick,
  },
} as Meta;

export const Default = (args: any) => <Button {...args} />;
export const Icon = (args: any) => <Button {...args} />;

Default.args = {
  children: "Button",
};

Icon.args = {
  children: <BugReportIcon />,
  title: "Bug Report",
  isIconButton: true,
};
