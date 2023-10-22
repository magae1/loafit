import { Box, BoxProps } from "@mui/material";

export default function CenterWrapper(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}
