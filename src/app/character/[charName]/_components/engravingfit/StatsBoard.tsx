"use client";
import { useEffect, useMemo, useRef } from "react";
import { Box } from "@mui/material";
import _ from "underscore";

import { useAppSelector } from "@/redux/store";
import { ITEM_OPTION_TYPES } from "@/libs/types";

const STAT_TYPES = ["치명", "특화", "제압", "신속", "인내", "숙련"];

function StatItem({ name, value }: { name: string; value: any }) {
  return <li>{`${name} - ${value}`}</li>;
}

export default function StatsBoard() {
  const basicStats = useRef(
    _.object(STAT_TYPES, new Array(STAT_TYPES.length).fill(0)),
  );

  const jewelries = useAppSelector((state) => state.jewelries.value);

  const currentStats = useMemo(() => {
    const obj = _.clone(basicStats.current);

    _.chain(jewelries)
      .values()
      .pluck("jewelry")
      .flatten()
      .pluck("item")
      .pluck("Options")
      .flatten()
      .filter((v) => _.contains(STAT_TYPES, v.OptionName))
      .each((v) => (obj[v.OptionName] += v.Value));

    return obj;
  }, [jewelries]);

  return (
    <Box>
      {_.chain(currentStats)
        .pairs()
        .map((v) => {
          const [a, b] = v;
          return <StatItem key={_.uniqueId("statiem")} name={a} value={b} />;
        })
        .value()}
    </Box>
  );
}
