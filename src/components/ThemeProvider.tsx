"use client";
import { ReactNode } from "react";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";

import { theme } from "@/libs/theme";

// @ts-ignore
export default function ThemeProvider(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>{children}</SnackbarProvider>
    </CssVarsProvider>
  );
}
