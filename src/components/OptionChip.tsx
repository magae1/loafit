import { Chip } from "@mui/material";

import { ITEM_OPTION_TYPES, TItemOption } from "@/libs/types";

const color = (option: TItemOption) => {
  const { Type, IsPenalty } = option;
  if (Type === ITEM_OPTION_TYPES.ABILITY_ENGRAVE) {
    return IsPenalty ? "error" : "info";
  } else if (Type === ITEM_OPTION_TYPES.BRACELET_RANDOM_SLOT) {
    return "warning";
  }
  return undefined;
};

const label = (option: TItemOption) => {
  const { Type, Value, OptionName, IsPenalty } = option;
  let name = "";

  if (Type === ITEM_OPTION_TYPES.STAT) {
    name = OptionName[0];
  } else if (Type === ITEM_OPTION_TYPES.ABILITY_ENGRAVE) {
    const optionChucks = OptionName.split(" ");
    if (IsPenalty) {
      optionChucks.pop();
    }
    if (optionChucks.length > 1) {
      let tName = optionChucks.map((v) => {
        if (v.length > 4) {
          return v.slice(0, 2);
        }
        if (v.length == 4) {
          return v[0] + v[2];
        }
        return v[0];
      });
      name = tName.reduce((prev, curr) => prev + curr, "").slice(0, 2);
    } else {
      let v = optionChucks[0];
      if (v.length > 4) {
        name = v.slice(0, 2);
      } else if (v.length == 4) {
        name = v[0] + v[2];
      } else {
        name = v;
      }
    }
  } else {
    name = OptionName;
  }
  return (
    <>
      {name}{" "}
      {Type != ITEM_OPTION_TYPES.BRACELET_SPECIAL_EFFECTS && <b>{Value}</b>}
    </>
  );
};

export default function OptionChip({ option }: { option: TItemOption }) {
  return (
    <Chip
      color={color(option)}
      size={"small"}
      sx={{ fontSize: "0.8em" }}
      label={label(option)}
    />
  );
}
