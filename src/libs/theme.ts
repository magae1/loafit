import { Roboto } from "next/font/google";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = extendTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        variant: "outlined",
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiCard: {
      defaultProps: {
        variant: "elevation",
        elevation: 1,
      },
    },
    MuiTooltip: {
      defaultProps: {
        enterTouchDelay: 300,
      },
    },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          light: purple[100],
          main: purple[200],
          dark: purple[300],
          contrastText: "#050505",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          light: purple[700],
          main: purple[800],
          dark: purple[900],
          contrastText: "#fafafa",
        },
      },
    },
  },
});
