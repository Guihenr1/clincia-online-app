import { FC, useState } from "react";
import useStyles from "./styles";
import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Navigate, useNavigate, useOutlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface BaseProps {}

const Base: FC<BaseProps> = () => {
  const s = useStyles();
  const { user, logout } = useAuth();
  const outlet = useOutlet();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" />;
  }

  const onClickLogout = () => logout();
  const menu = [
    {
      text: "Doctor",
      onClick: () => navigate("/"),
    },
    {
      text: "Patient",
      onClick: () => navigate("/patient"),
    },
    {
      text: "Patner",
      onClick: () => navigate("/patner"),
    },
  ];

  return (
    <Box>
      <Box className={s.classes.header}>
        <Header menu={menu} handleClickLogout={onClickLogout} />
      </Box>
      <Box className={s.classes.content}>{outlet}</Box>
      <Box className={s.classes.footer}>
        <Footer />
      </Box>
    </Box>
  );
};

Base.defaultProps = {};

export default Base;
