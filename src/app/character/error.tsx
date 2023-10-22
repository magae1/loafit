"use client";
import { useEffect } from "react";
import { Paper, Typography } from "@mui/material";

import CenterWrapper from "@/components/CenterWrapper";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <CenterWrapper>
      <Paper>
        <Typography variant={"h4"}>404 Not found</Typography>
        <Typography variant={"caption"}>{error.message}</Typography>
      </Paper>
    </CenterWrapper>
  );
}
