"use client";
import { styled, Box, TextField, lighten, darken } from "@mui/material";
import { grey } from "@mui/material/colors";

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
  marginBottom: theme.spacing(1),
  paddingLeft: theme.spacing(0.5),
  width: "100%",
  fontSize: "0.8em",
  borderLeft: "8px solid",
}));

export const AuctionOptionInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    padding: "0",
  },
}));

export const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

export const GroupItems = styled("ul")({
  padding: 0,
});
