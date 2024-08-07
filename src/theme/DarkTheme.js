import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(88, 199, 250)",
    },
    secondary: {
      main: "#5A20CB",
    },
    background: {
      default: "#212534",
      paper: "#212534",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "rgb(88, 199, 250)",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
  },
});
