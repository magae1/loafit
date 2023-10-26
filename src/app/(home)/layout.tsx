import { ReactNode } from "react";
import { Stack, Container, Divider } from "@mui/material";

interface Props {
  children: ReactNode;
  engraving: ReactNode;
  notice: ReactNode;
}

export default function Layout(props: Props) {
  const { children, engraving, notice } = props;
  return (
    <Container maxWidth={"lg"}>
      <Stack divider={<Divider />} spacing={2}>
        {children}
        {notice}
      </Stack>
    </Container>
  );
}
