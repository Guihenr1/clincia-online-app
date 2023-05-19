import { FC, ReactNode } from "react";
import useStyles from "./styles";
import { Box } from "@mui/material";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const s = useStyles();

  return <Box className={s.classes.footer}>@2023 Clinica Online</Box>;
};

Footer.defaultProps = {};

export default Footer;
