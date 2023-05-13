import { createTheme } from "@mui/material/styles";
import { indigo, lime } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      light: indigo[100],
      main: indigo[500],
      dark: indigo[900],
      contrastText: "#fff",
    },
    secondary: {
      light: lime[100],
      main: lime[500],
      dark: lime[900],
      contrastText: "#000",
    },
  },
});

export default theme;
