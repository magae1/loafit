import { Autocomplete, SxProps, TextField, Theme } from "@mui/material";

interface Props {
  options: number[];
  value: number;
  setValue: (v: number) => void;
  sx?: SxProps<Theme>;
}

export default function ItemTiersInput(props: Props) {
  const { options, value, setValue, sx } = props;

  return (
    <Autocomplete
      sx={sx}
      value={value}
      onChange={(_, newValue) => setValue(newValue)}
      options={options}
      size={"small"}
      disableClearable
      getOptionLabel={(option) => `${option}`}
      renderInput={(params) => (
        <TextField {...params} variant={"standard"} label={"티어"} />
      )}
    />
  );
}
