import { Stack } from "@mui/material";

import Copyright from "@/app/_components/Copyright";
import ThemeSwitch from "@/app/_components/ThemeSwitch";

export default function Footer() {
  return (
    <Stack
      pt={4}
      pb={10}
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <ThemeSwitch />
      <Copyright />
    </Stack>
  );
}
