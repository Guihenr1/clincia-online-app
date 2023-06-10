import { FC, ReactNode, MouseEvent } from "react";
import useStyles from "./styles";
import { Box, Modal as ModalMui, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../Button/Button";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
  title?: string;
}

const Modal: FC<ModalProps> = ({ children, open, handleClose, title }) => {
  const s = useStyles();

  return (
    <div>
      <ModalMui open={open} onClose={handleClose} data-testid="modal">
        <Box className={s.classes.children}>
          <Box className={s.classes.header}>
            <Typography variant="h5">{title}</Typography>
            <CloseIcon
              onClick={handleClose}
              className={s.classes.closeButton}
            />
          </Box>
          <Box className={s.classes.content}>{children}</Box>
          <Box className={s.classes.bottom}>
            <Button className={s.classes.cancel} color="warning">
              Cancel
            </Button>
            <Button>Confirm</Button>
          </Box>
        </Box>
      </ModalMui>
    </div>
  );
};

Modal.defaultProps = {
  children: "",
  title: "",
};

export default Modal;
