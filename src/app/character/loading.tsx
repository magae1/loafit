import { CircularProgress, Box } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 55px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={54} />
    </Box>
  );
}
