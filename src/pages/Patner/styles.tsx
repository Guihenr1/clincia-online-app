import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  add: {
    padding: "10px 0",
    display: "flex",
    justifyContent: "end",
  },
  alert: {
    position: "fixed",
    height: "100%",
    marginTop: "548px",
    zIndex: 999,
  },
}));

export default useStyles;
