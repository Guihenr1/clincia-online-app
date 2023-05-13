import { FC, MouseEvent, ReactNode } from "react";
import ButtonMaterialUI from "@mui/material/Button";
import useStyles from "./styles";

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: ReactNode;
  variant?: "contained" | "outlined" | "text";
}

const Button: FC<ButtonProps> = ({ onClick, disabled, children, variant }) => {
  const s = useStyles();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick && !disabled) {
      onClick(event);
    }
  };

  return (
    <ButtonMaterialUI
      onClick={handleClick}
      disabled={disabled}
      variant={variant}
      className={s.classes.button}
    >
      {children}
    </ButtonMaterialUI>
  );
};

Button.defaultProps = {
  disabled: false,
  variant: "contained",
};

export default Button;
