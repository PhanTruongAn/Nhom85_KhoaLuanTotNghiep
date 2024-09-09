import { createTheme } from "@mui/material/styles";

const themeDark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#283593",
      light: "#5c6bc0",
      dark: "#1a237e",
    },
    secondary: {
      main: "#cb6816",
      light: "#d27619",
      dark: "#bf5313",
    },
  },
});

export default themeDark;
