"use client";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Box sx={{ width: "100%" }} pt={6} px={"10vw"}>
      <Typography variant={"h4"}>404 Not found</Typography>
      <Typography variant={"caption"}>{error.message}</Typography>
    </Box>
  );
}
