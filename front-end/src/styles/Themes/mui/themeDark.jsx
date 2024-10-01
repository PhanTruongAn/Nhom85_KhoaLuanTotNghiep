import { createTheme } from "@mui/material/styles";

const themeDark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      // main: "#283593",
      main: "#1976D2",
      light: "#5c6bc0",
      dark: "#283593",
    },
    secondary: {
      main: "#cb6816",
      light: "#d27619",
      dark: "#bf5313",
    },
  },
});

export default themeDark;
