import { Meta } from "@storybook/react";
import Dialog from "./Dialog";

export default {
  component: Dialog,
  args: {
    title: "Do you confirm?",
    content: `Lorem ipsum dolor sit amet, 
      consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. 
      Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et 
      netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, 
      auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing`,
  },
} as Meta;

export const Primary = (args: any) => {
  return <Dialog {...args} />;
};

Primary.args = {
  open: true,
};
