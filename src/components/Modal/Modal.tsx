import { FC, ReactNode, MouseEvent, FormEvent } from "react";
import useStyles from "./styles";
import { Box, Modal as ModalMui, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../Button/Button";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
  title?: string;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const Modal: FC<ModalProps> = ({
  children,
  open,
  handleClose,
  title,
  handleSubmit,
}) => {
  const s = useStyles();

  return (
    <div>
      <ModalMui open={open} onClose={handleClose} data-testid="modal">
        <form onSubmit={handleSubmit}>
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
              <Button
                onClick={handleClose}
                className={s.classes.cancel}
                color="warning"
              >
                Cancel
              </Button>
              <Button type="submit">Confirm</Button>
            </Box>
          </Box>
        </form>
      </ModalMui>
    </div>
  );
};

Modal.defaultProps = {
  children: "",
  title: "",
};

export default Modal;
