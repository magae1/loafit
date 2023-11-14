import { Autocomplete, SxProps, TextField, Theme } from "@mui/material";
import { ArrowDropUp } from "@mui/icons-material";
import _ from "underscore";

import { qualityColor } from "@/libs/game-color";

interface Props {
  quality: number | null;
  setQuality: (v: number | null) => void;
  options: number[];
  sx?: SxProps<Theme>;
}

export default function ItemGradeQualityInput(props: Props) {
  const { quality, options, setQuality, sx } = props;

  return (
    <Autocomplete
      value={quality}
      options={options}
      sx={sx}
      onChange={(_, newValue) => setQuality(newValue)}
      size={"small"}
      getOptionLabel={(option) => `${option} ↑`}
      renderInput={(params) => (
        <TextField
          {...params}
          variant={"standard"}
          placeholder={"없음"}
          label={"품질"}
        />
      )}
      renderOption={(props, option, state, ownerState) => (
        <li
          {...props}
          key={_.uniqueId("quality-options-list")}
          style={{
            textDecoration: `3px ${qualityColor(option)} underline`,
          }}
        >
          {option} <ArrowDropUp fontSize={"inherit"} />
        </li>
      )}
    />
  );
}
