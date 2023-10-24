import { ReactNode } from "react";
import { Paper, Typography } from "@mui/material";

export default function GridItem({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Typography variant={"h6"} textAlign={"center"} mx={8} mb={1}>
        {title}
      </Typography>
      {children}
    </div>
  );
}
