"use client";
import { useMemo } from "react";
import { Grid, useTheme, List, ListItem, ListItemText } from "@mui/material";
import { orange, red } from "@mui/material/colors";
import _ from "underscore";

import { useAppSelector } from "@/redux/store";
import { ITEM_OPTION_TYPES, TActiveEngraving } from "@/libs/types";
import { CustomLabel } from "@/components/styles";

function EngravingEffect({
  name,
  data,
  isPenalty,
  sum,
}: {
  name: string;
  isPenalty: boolean;
  data: TActiveEngraving[];
  sum: number;
}) {
  const level = Math.min(3, Math.floor(sum / 5));

  const overAlarm = !isPenalty ? (
    sum > 15 ? (
      <b style={{ color: orange[500] }}>{`+${sum - 15}`}</b>
    ) : undefined
  ) : sum >= 5 ? (
    <b style={{ color: red[500] }}>{`+${sum - 4}`}</b>
  ) : undefined;

  return (
    <ListItem disablePadding sx={{ ml: 1 }}>
      <ListItemText
        primary={
          <>
            {name}{" "}
            <b style={{ fontWeight: level * 300 + 100 }}>{`Lv.${level}`}</b>
          </>
        }
        secondary={
          <>
            {data.map((v) => v.Value).join("+")} = {sum} {overAlarm}
          </>
        }
      />
    </ListItem>
  );
}

export default function EngravingBoard() {
  const theme = useTheme();
  const jewelries = useAppSelector((state) => state.jewelries.value.curr);
  const stoneEngravings = useAppSelector(
    (state) => state.abilityStone.value.engravings,
  );
  const engravingSlots = useAppSelector((state) => state.engravingSlots.value);

  const totalEngravings = useMemo(() => {
    const jewelryEngravings: TActiveEngraving[] = _.chain(jewelries)
      .map((v) => (v.item ? v.item.Options : []))
      .flatten()
      .filter((v) => v.Type === ITEM_OPTION_TYPES.ABILITY_ENGRAVE)
      .map((v) => ({
        Name: v.OptionName,
        Value: v.Value,
        IsPenalty: v.IsPenalty,
      }))
      .value();

    const slotEngravings: TActiveEngraving[] = _.chain(engravingSlots)
      .filter((v) => v.isActive)
      .map((v) => v.Effect)
      .value();

    return _.chain(jewelryEngravings.concat(slotEngravings, stoneEngravings))
      .filter((v) => v.Value > 0)
      .partition((v) => v.IsPenalty)
      .value();
  }, [jewelries, stoneEngravings, engravingSlots]);

  return (
    <Grid container spacing={1}>
      <Grid item xs sm md={12}>
        <List dense>
          <li>
            <CustomLabel sx={{ borderColor: theme.palette.info.main }}>
              각인 효과
            </CustomLabel>
          </li>
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
                isPenalty={false}
                data={v[1].list}
                sum={v[1].sum}
              />
            ))
            .value()}
        </List>
      </Grid>
      <Grid item xs sm md={12}>
        <List dense>
          <li>
            <CustomLabel sx={{ borderColor: theme.palette.error.main }}>
              감소 효과
            </CustomLabel>
          </li>
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
                isPenalty={true}
                data={v[1].list}
                sum={v[1].sum}
              />
            ))
            .value()}
        </List>
      </Grid>
    </Grid>
  );
}
