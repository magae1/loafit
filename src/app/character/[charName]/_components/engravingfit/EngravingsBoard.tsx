"use client";
import { useMemo } from "react";
import { Divider, Grid, Typography, Box, Stack } from "@mui/material";
import _ from "underscore";

import { useAppSelector } from "@/redux/store";
import { TActiveEngraving } from "@/libs/types";

function EngravingEffect({
  name,
  data,
  sum,
}: {
  name: string;
  data: TActiveEngraving[];
  sum: number;
}) {
  const level = Math.min(3, Math.floor(sum / 5));
  return (
    <Box>
      <Typography
        sx={{
          textDecoration: level <= 0 ? "line-through" : undefined,
          fontWeight: Math.max(100, level * 300),
          lineHeight: 1,
        }}
      >
        {name} Lv.{level}
      </Typography>
      <Typography variant={"body2"} gutterBottom>
        {data.map((v) => v.Value).join("+")} = {sum}
      </Typography>
    </Box>
  );
}

export default function EngravingBoard() {
  const jewelries = useAppSelector((state) => state.jewelries.value.curr);
  const stoneEngravings = useAppSelector(
    (state) => state.abilityStone.value.engravings,
  );
  const engravingSlots = useAppSelector((state) => state.engravingSlots.value);

  const totalEngravings = useMemo(() => {
    const jewelryEngravings: TActiveEngraving[] = _.chain(jewelries)
      .map((v): TActiveEngraving[] => v.engravings)
      .flatten()
      .value();

    const slotEngravings: TActiveEngraving[] = _.chain(engravingSlots)
      .filter((v) => v.isActive)
      .map((v) => v.Effect)
      .value();

    return _.partition(
      jewelryEngravings.concat(slotEngravings, stoneEngravings),
      (v) => v.IsPenalty,
    );
  }, [jewelries, stoneEngravings, engravingSlots]);

  return (
    <Grid container spacing={{ xs: 1, sm: 3 }} py={1}>
      <Grid item xs>
        <Stack>
          {_.chain(totalEngravings[1])
            .groupBy((v) => v.Name)
            .mapObject((v, k) => {
              const sum = _.reduce(v, (prev, curr) => prev + curr.Value, 0);
              return { sum: sum, list: v };
            })
            .pairs()
            .sortBy((v) => -v[1].sum)
            .map((v, k) => (
              <EngravingEffect
                key={_.uniqueId("engraving-effect-item")}
                name={v[0]}
                data={v[1].list}
                sum={v[1].sum}
              />
            ))
            .value()}
        </Stack>
      </Grid>
      <Divider orientation={"vertical"} flexItem />
      <Grid item xs>
        <Stack>
          {_.chain(totalEngravings[0])
            .groupBy((v) => v.Name)
            .mapObject((v, k) => {
              const sum = _.reduce(v, (prev, curr) => prev + curr.Value, 0);
              return { sum: sum, list: v };
            })
            .pairs()
            .sortBy((v) => -v[1].sum)
            .map((v, k) => (
              <EngravingEffect
                key={_.uniqueId("engraving-effect-item")}
                name={v[0]}
                data={v[1].list}
                sum={v[1].sum}
              />
            ))
            .value()}
        </Stack>
      </Grid>
    </Grid>
  );
}
