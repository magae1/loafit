"use client";
import { useMemo, useRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
import _ from "underscore";
import { animated } from "@react-spring/web";

import { useAppSelector } from "@/redux/store";
import { TActiveStat } from "@/libs/types";

const STAT_TYPES = ["치명", "특화", "제압", "신속", "인내", "숙련"];

const AnimateTypo = animated(Typography);

function StatItem({ name, value }: { name: string; value: number }) {
  return (
    <Box px={1}>
      <Typography variant={"subtitle2"} textAlign={"center"}>
        {name}
      </Typography>
      <Typography variant={"h6"} textAlign={"center"}>
        {value}
      </Typography>
    </Box>
  );
}

export default function StatsBoard() {
  const defaultStats = useRef<_.Dictionary<number>>(
    _.object(STAT_TYPES, new Array(STAT_TYPES.length).fill(0)),
  );

  const jewelries = useAppSelector((state) => state.jewelries.value.curr);

  const currentStats = useMemo(() => {
    return _.chain(jewelries)
      .map((v, key): TActiveStat[] => {
        return v.stats;
      })
      .flatten()
      .filter((v) => _.contains(STAT_TYPES, v.Name))
      .groupBy((v) => v.Name)
      .mapObject((v, k) => {
        return _.reduce(v, (prev, curr) => curr.Value + prev, 0);
      })
      .defaults(defaultStats.current)
      .value();
  }, [jewelries]);

  return (
    <Stack
      my={2}
      direction={"row"}
      flexWrap={"wrap"}
      justifyContent={"space-evenly"}
    >
      {_.chain(currentStats)
        .pairs()
        .map((v) => {
          const [a, b] = v;
          return <StatItem key={_.uniqueId("stat-item")} name={a} value={b} />;
        })
        .value()}
    </Stack>
  );
}
