import Link from "next/link";
import { cookies } from "next/headers";
import { Chip, Stack, Typography } from "@mui/material";
import _ from "underscore";

import SearchBar from "@/app/(home)/_component/SearchBar";
import { ResponsivePaddingWrapper } from "@/components/styles";
import { CustomScrollBarBox } from "@/components/styles";

export default function Page() {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get("recent-search-characters")?.value;

  const value = cookieValue && JSON.parse(cookieValue);

  return (
    <Stack pt={2}>
      <Typography variant={"h5"} component={"h4"} align={"center"} gutterBottom>
        캐릭터핏
      </Typography>
      <ResponsivePaddingWrapper>
        <SearchBar width={"100%"} />
        <div style={{ paddingLeft: 15, paddingRight: 5 }}>
          <Typography variant={"overline"} lineHeight={0.5} gutterBottom>
            최근 검색어
          </Typography>
          <CustomScrollBarBox
            component={"ul"}
            sx={{ listStyle: "none", m: 0, p: 0 }}
          >
            {_.chain(value)
              .pairs()
              .sortBy((v) => {
                const [a, b] = v;
                return -b;
              })
              .map((v) => (
                <li
                  key={_.uniqueId("recent-search-link")}
                  style={{ margin: "1px 3px" }}
                >
                  <Chip
                    component={Link}
                    href={`/character/${v[0]}`}
                    label={v[0]}
                    clickable
                  />
                </li>
              ))
              .value()}
          </CustomScrollBarBox>
        </div>
      </ResponsivePaddingWrapper>
    </Stack>
  );
}
