import { Autocomplete, IconButton, SxProps, Theme } from "@mui/material";
import _ from "underscore";

import { GRADE_COLORS } from "@/libs/data";
import {
  StyledInput,
  StyledInputLabel,
  StyledInputRoot,
} from "@/components/styles";
import { Clear } from "@mui/icons-material";

interface Props {
  grade: string | null;
  setGrade: (v: string | null) => void;
  options: string[];
  sx?: SxProps<Theme>;
}

export default function ItemGradeInput(props: Props) {
  const { grade, setGrade, options, sx } = props;
  return (
    <div>
      <StyledInputLabel>등급</StyledInputLabel>
      <Autocomplete
        sx={sx}
        size={"small"}
        value={grade}
        onChange={(_, newValue) => setGrade(newValue)}
        renderInput={(params) => (
          <StyledInputRoot ref={params.InputProps.ref}>
            <StyledInput
              {...params.inputProps}
              style={{
                color: GRADE_COLORS.find((c) => c.name === grade)?.color,
              }}
            />
            <IconButton onClick={() => setGrade(null)}>
              <Clear fontSize={"small"} />
            </IconButton>
          </StyledInputRoot>
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
    </div>
  );
}
