import { MouseEvent } from "react";
import { Meta } from "@storybook/react";
import Button from "./Button";

function onClick(e: MouseEvent<HTMLButtonElement>): void {
  console.log("CLICKED", e);
}

export default {
  component: Button,
  args: {
    onClick: onClick,
  },
} as Meta;

export const Primary = (args: any) => <Button {...args} />;

Primary.args = {
  children: "Button",
};
