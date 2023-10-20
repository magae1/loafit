"use client";
import { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  children: ReactNode;
  name: string;
}

export default function Section({ children, name }: Props) {
  return (
    <Box sx={{ flex: 1, py: 1 }}>
      <Typography variant={"subtitle1"}>{name}</Typography>
      <Box>{children}</Box>
    </Box>
  );
}
