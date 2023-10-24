import { Stack, Typography } from "@mui/material";

import SearchBar from "@/app/(home)/_component/SearchBar";
import RecentSearchList from "@/app/(home)/_component/RecentSearchList";
import { ResponsivePaddingWrapper } from "@/components/styles";

export default function Page() {
  return (
    <Stack pt={10}>
      <Typography variant={"h5"} component={"h4"} align={"center"} gutterBottom>
        캐릭터핏
      </Typography>
      <ResponsivePaddingWrapper>
        <SearchBar width={"100%"} />
        <RecentSearchList />
      </ResponsivePaddingWrapper>
    </Stack>
  );
}
