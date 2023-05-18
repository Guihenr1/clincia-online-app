import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  margin: {
    marginLeft: "auto",
  },
}));

export default useStyles;
