import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  footer: {
    fontSize: "13px",
    textAlign: "center",
    height: "10vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default useStyles;
