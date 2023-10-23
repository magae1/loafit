"use client";
import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import _ from "underscore";

import { useAppSelector } from "@/redux/store";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  /*
  const recentSearchList = useAppSelector(
    (state) => state.characterSearch.value,
  );

  const recentSearches = useMemo(() => {
    return _.chain(recentSearchList)
      .pairs()
      .sortBy((v) => -v[1])
      .map((v) => {
        const [a, b] = v;
        return <SearchChip key={_.uniqueId("search-chip")} label={a} />;
      })
      .value();
  }, [recentSearchList]);
 */
  return <Box width={"100%"}>123</Box>;
}
