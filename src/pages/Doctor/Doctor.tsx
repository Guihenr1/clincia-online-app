import { FC, ReactNode } from "react";
import useStyles from "./styles";
import { Tab } from "@mui/material";
import Base from "../Base/Base";

interface DoctorProps {}

const Doctor: FC<DoctorProps> = () => {
  const s = useStyles();

  return <h1>Doctor Page</h1>;
};

Doctor.defaultProps = {};

export default Doctor;
