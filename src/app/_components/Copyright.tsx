import { Link, Typography, TypographyProps } from "@mui/material";

export default function Copyright(props: TypographyProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        로아핏
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
