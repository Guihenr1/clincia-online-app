import { Meta } from "@storybook/react";
import Modal from "./Modal";
import { useState } from "react";
import Button from "../Button/Button";

export default {
  component: Modal,
  args: {
    children: <p>TEST</p>,
  },
} as Meta;

export const Template = (args: any) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setOpen(true)}>OPEN</Button>
      <Modal
        {...args}
        title="Test"
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
};
