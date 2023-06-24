import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  box: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    marginTop: "150px",
    border: "1px solid #ccc",
    borderRadius: "10px",
  },
  login: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40em",
  },
  logo: {
    background: `${theme.palette.primary.main}`,
    padding: "10px",
    borderRadius: "10px",
  },
}));

export default useStyles;
