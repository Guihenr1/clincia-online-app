import { FC } from "react";
import useStyles from "./styles";
import { Alert as AlertMUI, Collapse } from "@mui/material";

interface AlertProps {
  children: string;
  severity?: "error" | "warning" | "info" | "success";
  open: boolean;
  className?: string;
}

const Alert: FC<AlertProps> = ({ children, severity, open, className }) => {
  const s = useStyles();

  return (
    <Collapse in={open} className={className}>
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
