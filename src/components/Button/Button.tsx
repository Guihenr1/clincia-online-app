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
  color?:
    | "inherit"
    | "warning"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info";
  className?: string;
}

const Button: FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
  variant,
  isIconButton,
  title,
  color,
  className,
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
          className={`${s.classes.button} ${className}`}
          title={title}
          color={color}
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
  color: "primary",
  className: "",
};

export default Button;
