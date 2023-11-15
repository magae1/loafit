import { Autocomplete, IconButton, SxProps, Theme } from "@mui/material";
import { ArrowDropUp, Clear } from "@mui/icons-material";
import _ from "underscore";

import { qualityColor } from "@/libs/game-color";
import {
  StyledInput,
  StyledInputLabel,
  StyledInputRoot,
} from "@/components/styles";

interface Props {
  quality: number | null;
  setQuality: (v: number | null) => void;
  options: number[];
  sx?: SxProps<Theme>;
}

export default function ItemGradeQualityInput(props: Props) {
  const { quality, options, setQuality, sx } = props;

  return (
    <div>
      <StyledInputLabel>품질</StyledInputLabel>
      <Autocomplete
        value={quality}
        options={options}
        sx={sx}
        onChange={(_, newValue) => setQuality(newValue)}
        size={"small"}
        getOptionLabel={(option) => `${option} 이상`}
        renderInput={(params) => (
          <StyledInputRoot ref={params.InputProps.ref}>
            <StyledInput
              {...params.inputProps}
              style={{
                color: quality ? qualityColor(quality) : undefined,
              }}
            />
            <IconButton onClick={() => setQuality(null)}>
              <Clear fontSize={"small"} />
            </IconButton>
          </StyledInputRoot>
        )}
        renderOption={(props, option, state, ownerState) => (
          <li
            {...props}
            key={_.uniqueId("quality-options-list")}
            style={{
              color: qualityColor(option),
            }}
          >
            {option} <ArrowDropUp fontSize={"inherit"} />
          </li>
        )}
      />
    </div>
  );
}
