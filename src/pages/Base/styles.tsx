import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  header: {
    height: "10vh",
  },
  content: {
    height: "70vh",
  },
  footer: {
    height: "10vh",
  },
}));

export default useStyles;
