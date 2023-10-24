"use client";
import { styled, Box } from "@mui/material";

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
