import { Autocomplete, SxProps, TextField, Theme } from "@mui/material";
import _ from "underscore";

import { GRADE_COLORS } from "@/libs/data";

interface Props {
  grade: string | null;
  setGrade: (v: string | null) => void;
  options: string[];
  sx?: SxProps<Theme>;
}

export default function ItemGradeInput(props: Props) {
  const { grade, setGrade, options, sx } = props;
  return (
    <Autocomplete
      sx={sx}
      size={"small"}
      value={grade}
      onChange={(_, newValue) => setGrade(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant={"standard"}
          placeholder={"없음"}
          label={"등급"}
        />
      )}
      options={options}
      renderOption={(props, option, state, ownerState) => (
        <li
          {...props}
          key={_.uniqueId("quality-options-list")}
          style={{
            color: GRADE_COLORS[state.index].color,
          }}
        >
          {option}
        </li>
      )}
    />
  );
}
