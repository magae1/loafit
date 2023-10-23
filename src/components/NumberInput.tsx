import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { ChangeEvent } from "react";

interface Props {
  value: number;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  width?: string | number;
  simpleText?: string;
}

export default function NumberInput(props: Props) {
  const { value, onChangeValue, simpleText, width } = props;
  return (
    <FormControl sx={{ width: width }} variant={"outlined"}>
      <OutlinedInput
        size={"small"}
        type={"number"}
        value={value}
        onChange={onChangeValue}
        id={"outlined-number-input"}
        startAdornment={
          <InputAdornment position={"start"}>{simpleText}</InputAdornment>
        }
        inputProps={{
          "aria-label": "number-input",
          min: 0,
        }}
      />
    </FormControl>
  );
}
