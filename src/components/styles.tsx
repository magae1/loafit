"use client";
import {
  styled,
  Box,
  lighten,
  darken,
  autocompleteClasses,
  ListSubheader,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { numberInputClasses } from "@mui/base";

export const CustomScrollBarBox = styled(Box)`
  overflow-x: scroll;
  display: flex;
  flex-wrap: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const ResponsivePaddingWrapper = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
  },
  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(20),
  },
  [theme.breakpoints.up("lg")]: {
    paddingLeft: theme.spacing(30),
    paddingRight: theme.spacing(30),
  },
}));

export const CustomLabel = styled("label")(({ theme }) => ({
  display: "inline-block",
  backgroundColor: theme.palette.divider,
  paddingLeft: theme.spacing(0.5),
  width: "100%",
  fontSize: "0.8em",
  borderLeft: "8px solid",
}));

export const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.contrastText,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

export const GroupItems = styled("ul")({
  padding: 0,
});

export const StyledInputRoot = styled("div")(
  ({ theme }) => `
  border-radius: 8px;
  width: inherit;
  minHeight: 46px;
  color: ${theme.palette.primary.contrastText};
  background: ${theme.palette.background.paper};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  padding: 4px;
  display: inline-flex;
  font-weight: 400;
  align-items: center;
  
   &.${autocompleteClasses.expanded} {
    border-color: ${theme.palette.primary.light};
    box-shadow: 0 0 0 3px ${theme.palette.primary.dark};
  }

  &:hover {
    border-color: ${theme.palette.primary.light};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

export const StyledNumInputRoot = styled("div")(
  ({ theme }) => `
  font-weight: 400;
  border-radius: 8px;
  minHeight: 46px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.background.paper};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  display: grid;
  grid-template-columns: auto 1fr auto 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  padding: 4px;

  &.${numberInputClasses.focused} {
    border-color: ${theme.palette.primary.light};
    box-shadow: 0 0 0 3px ${theme.palette.primary.dark};
  }
  &.MuiInputBase {
    &:focus {
      border-color: ${theme.palette.primary.light};
    }
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

export const StyledInput = styled("input")(
  ({ theme }) => `
  font-family: inherit;
  font-size: 1em;
  font-weight: 500;
  line-height: 1.2;
  grid-row: 1/3;
  width: 100%;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 2px;
  outline: 0;
`,
);

export const StyledButton = styled("button")(
  ({ theme }) => `
    display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  width: 19px;
  height: 20px;
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  line-height: 1;
  box-sizing: border-box;
  background: ${theme.palette.background.paper};
  border: 0;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    cursor: pointer;
  }

  &.${numberInputClasses.incrementButton} {
    grid-column: 4/5;
    grid-row: 1/2;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid;
    border-bottom: 0;
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};

    &:hover {
      cursor: pointer;
      color: #FFF;
      background: ${theme.palette.primary.dark};
      border-color: ${theme.palette.primary.light};
    }
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 4/5;
    grid-row: 2/3;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid;
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};

    &:hover {
      cursor: pointer;
      color: #FFF;
      background: ${theme.palette.primary.dark};
      border-color: ${theme.palette.primary.light};
    }
  }

  & .arrow {
    transform: translateY(-1px);
  }

  & .arrow {
    transform: translateY(-1px);
  }
`,
);

export const NumInputAdornment = styled("div")(
  ({ theme }) => `
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  grid-row: 1/3;
  min-width: 33px;
  color: ${theme.palette.mode === "dark" ? grey[500] : grey[700]};
`,
);

export const StyledInputLabel = styled("label")(({ theme }) => ({
  color: theme.palette.mode === "dark" ? grey[500] : grey[700],
  fontSize: "0.85em",
  lineHeight: 1,
  width: "100%",
}));

export const PriceWrapper = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CenterWrapper = styled(Box)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DetailsListSubheader = styled(ListSubheader)(({ theme }) => ({
  lineHeight: theme.spacing(3),
}));
