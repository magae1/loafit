import { Chip } from "@mui/material";

import { ITEM_OPTION_TYPES, TItemOption } from "@/libs/types";

interface Props {
  option: TItemOption;
}

export default function OptionChip(props: Props) {
  const { OptionName, Type, Value, IsPenalty } = props.option;

  const color = () => {
    if (Type === ITEM_OPTION_TYPES.ABILITY_ENGRAVE) {
      return IsPenalty ? "error" : "info";
    }
    return undefined;
  };

  return (
    <Chip
      color={color()}
      size={"small"}
      label={
        <b>
          {OptionName} {Value}
        </b>
      }
    />
  );
}
