import { Box, FormControlLabel, Stack } from "@mui/material";

import Copyright from "@/app/_components/Copyright";
import ThemeSwitch from "@/app/_components/ThemeSwitch";

export default function Footer() {
  return (
    <Stack
      pt={3}
      pb={1}
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <FormControlLabel
        control={<ThemeSwitch />}
        label={"다크 모드"}
        labelPlacement={"start"}
      />
      <Copyright />
    </Stack>
  );
}
