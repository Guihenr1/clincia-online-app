import { Meta } from "@storybook/react";
import Modal from "./Modal";
import { FormEvent, useState } from "react";
import Button from "../Button/Button";

export default {
  component: Modal,
  args: {
    children: <p>TEST</p>,
  },
} as Meta;

export const Template = (args: any) => {
  const [open, setOpen] = useState(true);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SUBMIT");
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>OPEN</Button>
      <Modal
        {...args}
        title="Test"
        open={open}
        handleClose={() => setOpen(false)}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
