import { FC } from "react";
import useStyles from "./styles";

import DialogMui from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../Button/Button";

interface DialogProps {
  open: boolean;
  title: string;
  content: string;
  handleClose: () => void;
  handleConfirm: () => void;
}

const Dialog: FC<DialogProps> = ({
  open,
  title,
  content,
  handleClose,
  handleConfirm,
}) => {
  const s = useStyles();

  return (
    <DialogMui open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleConfirm}>Agree</Button>
      </DialogActions>
    </DialogMui>
  );
};

Dialog.defaultProps = {
  title: "",
  content: "",
};

export default Dialog;
