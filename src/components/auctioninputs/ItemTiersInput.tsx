import { Autocomplete, SxProps, Theme } from "@mui/material";

import {
  StyledInput,
  StyledInputLabel,
  StyledInputRoot,
} from "@/components/styles";

interface Props {
  options: number[];
  value: number;
  setValue: (v: number) => void;
  sx?: SxProps<Theme>;
}

export default function ItemTiersInput(props: Props) {
  const { options, value, setValue, sx } = props;

  return (
    <div>
      <StyledInputLabel>티어</StyledInputLabel>
      <Autocomplete
        sx={sx}
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        options={options}
        size={"small"}
        disableClearable
        getOptionLabel={(option) => `${option}`}
        renderInput={(params) => (
          <StyledInputRoot ref={params.InputProps.ref}>
            <StyledInput {...params.inputProps} />
          </StyledInputRoot>
        )}
      />
    </div>
  );
}
