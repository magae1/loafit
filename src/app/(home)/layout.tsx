import { ReactNode } from "react";
import { Stack, Container, Divider, Grid } from "@mui/material";

interface Props {
  children: ReactNode;
  engraving: ReactNode;
  oreha: ReactNode;
}

export default function Layout(props: Props) {
  const { children, engraving, oreha } = props;
  return (
    <Container maxWidth={"lg"}>
      <Stack spacing={1} divider={<Divider />}>
        {children}
        <Grid container>
          <Grid item xs>
            {engraving}
          </Grid>
          <Grid item xs>
            {oreha}
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
