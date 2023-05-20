import { FC, ReactNode } from "react";
import useStyles from "./styles";
import Base from "../Base/Base";

interface PatnerProps {}

const Patner: FC<PatnerProps> = () => {
  const s = useStyles();

  return <h1>Patner Page</h1>;
};

Patner.defaultProps = {};

export default Patner;
