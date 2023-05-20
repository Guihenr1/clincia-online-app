import { FC, ReactNode } from "react";
import useStyles from "./styles";
import Base from "../Base/Base";

interface PatientProps {}

const Patient: FC<PatientProps> = () => {
  const s = useStyles();

  return <h1>Patient Page</h1>;
};

Patient.defaultProps = {};

export default Patient;
