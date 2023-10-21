import Link from "next/link";
import { AppBar, Grid, Typography, Container } from "@mui/material";

import CharacterSearchInput from "@/components/CharacterSearchInput";

export default function Header() {
  return (
    <AppBar position={"static"} sx={{ borderWidth: "0 0 1px 0" }}>
      <Container maxWidth={"md"} disableGutters>
        <Grid container py={1} px={0.5} spacing={1}>
          <Grid item xs={"auto"}>
            <Link href={"/"}>
              <Typography>로아핏</Typography>
            </Link>
          </Grid>
          <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CharacterSearchInput />
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
}
