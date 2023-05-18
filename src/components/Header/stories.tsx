import { Meta } from "@storybook/react";
import Header from "./Header";

export default {
  component: Header,
  args: {
    children: "",
    handleClickLogout: () => console.log("Logout"),
    menu: [
      {
        text: "Home",
        onClick: () => console.log("Home"),
      },
      {
        text: "Privacy",
        onClick: () => console.log("Privacy"),
      },
      {
        text: "Settings",
        onClick: () => console.log("Settings"),
      },
    ],
  },
} as Meta;

export const Primary = (args: any) => <Header {...args} />;
