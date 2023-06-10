import { FC, ReactNode, useState } from "react";
import useStyles from "./styles";
import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Doctor from "../Doctor/Doctor";
import Patient from "../Patient/Patient";
import Patner from "../Patner/Patner";

interface BaseProps {
  children: ReactNode;
}

const Base: FC<BaseProps> = ({ children }) => {
  const s = useStyles();
  const [page, setPage] = useState("doctor");

  const onClick = (page: string) => {
    setPage(page);
  };

  const onClickLogout = () => {};
  const menu = [
    {
      text: "Doctor",
      onClick: () => onClick("doctor"),
    },
    {
      text: "Patient",
      onClick: () => onClick("patient"),
    },
    {
      text: "Patner",
      onClick: () => onClick("patner"),
    },
  ];

  const ReturnPage = (page: string) => {
    switch (page) {
      case "doctor":
        return <Doctor />;
      case "patient":
        return <Patient />;
      case "patner":
        return <Patner />;
      default:
        return <Doctor />;
    }
  };

  return (
    <Box>
      <Box className={s.classes.header}>
        <Header menu={menu} handleClickLogout={onClickLogout} />
      </Box>
      <Box className={s.classes.content}>{ReturnPage(page)}</Box>
      <Box className={s.classes.footer}>
        <Footer />
      </Box>
    </Box>
  );
};

Base.defaultProps = {
  children: "",
};

export default Base;
