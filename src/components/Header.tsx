import Link from "next/link";
import {
  AppBar,
  Link as MuiLink,
  Container,
  Typography,
  Toolbar,
} from "@mui/material";

export default function Header() {
  return (
    <AppBar position={"static"}>
      <Container maxWidth={"lg"} disableGutters>
        <Toolbar
          variant={"dense"}
          sx={{ flexGrow: 1, justifyContent: "space-between" }}
        >
          <MuiLink component={Link} href={"/"} sx={{ textDecoration: "none" }}>
            <Typography
              color={"primary.contrastText"}
              variant={"h6"}
              textAlign={"center"}
              sx={{ fontWeight: 600 }}
            >
              로아핏
            </Typography>
            <Typography
              color={"primary.contrastText"}
              textAlign={"center"}
              fontSize={"11px"}
              sx={{ lineHeight: 1.1 }}
            >
              LOA-FIT
            </Typography>
          </MuiLink>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
