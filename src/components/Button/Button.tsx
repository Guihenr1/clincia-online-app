import { FC, MouseEvent, ReactNode } from "react";
import ButtonMaterialUI from "@mui/material/Button";
import useStyles from "./styles";
import { IconButton } from "@mui/material";

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: ReactNode;
  variant?: "contained" | "outlined" | "text";
  isIconButton?: boolean;
  title?: string;
}

const Button: FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
  variant,
  isIconButton,
  title,
}) => {
  const s = useStyles();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick && !disabled) {
      onClick(event);
    }
  };

  return (
    <>
      {isIconButton ? (
        <IconButton
          className={s.classes.button}
          disabled={disabled}
          title={title}
          onClick={handleClick}
        >
          {children}
        </IconButton>
      ) : (
        <ButtonMaterialUI
          onClick={handleClick}
          disabled={disabled}
          variant={variant}
          className={s.classes.button}
          title={title}
        >
          {children}
        </ButtonMaterialUI>
      )}
    </>
  );
};

Button.defaultProps = {
  disabled: false,
  variant: "contained",
  isIconButton: false,
  title: "",
};

export default Button;
