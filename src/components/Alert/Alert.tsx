import { FC, useState } from "react";
import useStyles from "./styles";
import { Alert as AlertMUI, Collapse } from "@mui/material";

interface AlertProps {
  children: string;
  severity?: "error" | "warning" | "info" | "success";
  open: boolean;
}

const Alert: FC<AlertProps> = ({ children, severity, open }) => {
  const s = useStyles();

  return (
    <Collapse in={open}>
      <AlertMUI className={s.classes.alert} severity={severity}>
        {children}
      </AlertMUI>
    </Collapse>
  );
};

Alert.defaultProps = {
  severity: "success",
  open: true,
};

export default Alert;
