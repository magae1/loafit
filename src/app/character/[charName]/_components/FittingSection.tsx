import { ReactNode } from "react";
import { Box, Paper, Typography } from "@mui/material";

interface Props {
  children: ReactNode;
  name: string;
}

export default function FittingSection({ children, name }: Props) {
  return (
    <Paper sx={{ flex: 1, py: 1 }}>
      <Typography variant={"subtitle1"}>{name}</Typography>
      <Box>{children}</Box>
    </Paper>
  );
}
