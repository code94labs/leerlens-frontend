import { Livvic } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const livvic = Livvic({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#A879FF",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: livvic.style.fontFamily,
  },
});

export default theme;
