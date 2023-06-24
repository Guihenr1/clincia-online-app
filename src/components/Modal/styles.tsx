import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  children: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "300px",
    boxShadow: "24",
    borderRadius: "10px",
    backgroundColor: "#fff",
  },
  header: {
    height: "50px",
    borderBottom: "solid 1px #ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
  },
  bottom: {
    height: "50px",
    borderTop: "solid 1px #ccc",
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    padding: "10px",
    justifyContent: "end",
  },
  closeButton: {
    cursor: "pointer",
  },
  content: {
    padding: "10px",
  },
  cancel: {
    marginRight: "10px",
  },
}));

export default useStyles;
