import { ReactNode } from "react";
import { Container } from "@mui/material";

export async function generateMetadata({
  params,
}: {
  params: { charName: string };
}) {
  const charaName = decodeURI(params.charName);
  return {
    title: `로아핏 유저 검색 - ${charaName}`,
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Container maxWidth={"md"} disableGutters>
      {children}
    </Container>
  );
}
