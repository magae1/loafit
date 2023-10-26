import { List, ListItem, ListItemText, Paper } from "@mui/material";
import _ from "underscore";

import { useAppSelector } from "@/redux/store";
import {
  ITEM_OPTION_TYPES,
  TActiveEngravingEffect,
  TJewelry,
} from "@/libs/types";

function EngravingItem({ data }: { data: TActiveEngravingEffect }) {
  return (
    <ListItem>
      <ListItemText primary={data.Name} secondary={data.Value} />
    </ListItem>
  );
}

export default function EngravingBoard() {
  const jewelries = useAppSelector((state) => state.jewelries.value.curr);
  const stoneEffects = useAppSelector(
    (state) => state.abilityStone.value.currentEffects,
  );

  const jewelryEffects = _.chain(jewelries)
    .values()
    .pluck("item")
    .compact()
    .pluck("Options")
    .flatten()
    .filter((v) => v.Type === ITEM_OPTION_TYPES.ABILITY_ENGRAVE)
    .map(
      (v): TActiveEngravingEffect => ({
        Name: v.OptionName,
        Value: v.Value,
        IsPenalty: v.IsPenalty,
      }),
    )
    .value();

  const allEffects = _.chain(stoneEffects.concat(jewelryEffects))
    .groupBy((v) => v.Name)
    .mapObject((v, k) => {
      return _.reduce(
        v,
        (memo, one) => {
          return {
            Name: one.Name,
            Value: memo.Value + one.Value,
            IsPenalty: one.IsPenalty,
          };
        },
        { Name: "", Value: 0, IsPenalty: false },
      );
    })
    .values()
    .value()
    .sort((a, b) => {
      if (!a.IsPenalty) {
        if (b.IsPenalty) return -1;
        return a.Value < b.Value ? 1 : -1;
      }
      if (!b.IsPenalty) return 1;
      return a.Value < b.Value ? 1 : -1;
    });

  return (
    <Paper>
      <List dense>
        {allEffects.map((v) => (
          <EngravingItem key={_.uniqueId("engraving-effects-item")} data={v} />
        ))}
      </List>
    </Paper>
  );
}
