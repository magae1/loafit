import { Stack, Typography } from "@mui/material";

import SearchBar from "@/app/(home)/_component/SearchBar";
import { ResponsivePaddingWrapper } from "@/components/styles";

export default function Page() {
  return (
    <Stack pt={2}>
      <Typography variant={"h5"} component={"h4"} align={"center"} gutterBottom>
        캐릭터핏
      </Typography>
      <ResponsivePaddingWrapper>
        <SearchBar width={"100%"} />
      </ResponsivePaddingWrapper>
    </Stack>
  );
}
