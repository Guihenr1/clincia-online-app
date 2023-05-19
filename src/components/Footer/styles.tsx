import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  footer: {
    fontSize: "13px",
    textAlign: "center",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: "10vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default useStyles;
