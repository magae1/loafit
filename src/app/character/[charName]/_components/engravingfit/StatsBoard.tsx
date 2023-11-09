"use client";
import { useMemo, useRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
import _ from "underscore";

import { useAppSelector } from "@/redux/store";
import { TItemOption } from "@/libs/types";
import { CustomLabel } from "@/components/styles";

const STAT_TYPES = ["치명", "특화", "제압", "신속", "인내", "숙련"];

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
      .map((v): TItemOption[] => (v.item ? v.item.Options : []))
      .flatten()
      .filter((v) => _.contains(STAT_TYPES, v.OptionName))
      .map((v) => ({ Name: v.OptionName, Value: v.Value }))
      .groupBy((v) => v.Name)
      .mapObject((v, k) => {
        return _.reduce(v, (prev, curr) => curr.Value + prev, 0);
      })
      .defaults(defaultStats.current)
      .value();
  }, [jewelries]);

  return (
    <div>
      <CustomLabel>
        전투 특성 [합: {_.reduce(currentStats, (prev, stat) => prev + stat, 0)}]
      </CustomLabel>
      <Stack
        mb={1}
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-evenly"}
      >
        {_.chain(currentStats)
          .pairs()
          .map((v) => {
            const [a, b] = v;
            return (
              <StatItem key={_.uniqueId("stat-item")} name={a} value={b} />
            );
          })
          .value()}
      </Stack>
    </div>
  );
}
