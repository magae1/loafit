import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

export const theme = extendTheme({
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        variant: "outlined",
      },
    },
    MuiCard: {
      defaultProps: {
        variant: "elevation",
        elevation: 1,
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
