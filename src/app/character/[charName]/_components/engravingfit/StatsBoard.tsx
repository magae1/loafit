"use client";
import { useMemo, useRef } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import _ from "underscore";
import {
  useSpring,
  config,
  animated,
  useIsomorphicLayoutEffect,
} from "@react-spring/web";

import { useAppSelector } from "@/redux/store";
import { ITEM_OPTION_TYPES } from "@/libs/types";

const STAT_TYPES = ["치명", "특화", "제압", "신속", "인내", "숙련"];

const AnimateTypo = animated(Typography);

function StatItem({ name, value }: { name: string; value: number }) {
  return (
    <Box>
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
  const basicStats = useRef<_.Dictionary<number>>(
    _.object(STAT_TYPES, new Array(STAT_TYPES.length).fill(0)),
  );

  const jewelries = useAppSelector((state) => state.jewelries.value.curr);

  const currentStats = useMemo(() => {
    const obj = _.clone(basicStats.current);

    _.chain(jewelries)
      .values()
      .map((v) => v.item?.Options)
      .flatten()
      .compact()
      .filter((v) => v.Type === ITEM_OPTION_TYPES.STAT)
      .each((v, k) => {
        if (v.OptionName in obj) {
          obj[v.OptionName] += v.Value;
        }
      });

    return obj;
  }, [jewelries]);

  return (
    <Stack
      my={2}
      direction={"row"}
      justifyContent={"space-evenly"}
      divider={<Divider orientation={"vertical"} flexItem />}
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
