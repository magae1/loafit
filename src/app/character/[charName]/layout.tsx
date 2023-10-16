import { ReactNode } from "react";
import { Container } from "@mui/material";

export async function generateMetadata({
  params,
}: {
  params: { charName: string };
}) {
  return {
    title: `로아핏 유저 검색 - ${params.charName}`,
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}
