import { SxProps, TextField, Theme } from "@mui/material";
import {
  StyledInput,
  StyledInputLabel,
  StyledInputRoot,
} from "@/components/styles";

interface Props {
  value: string | null;
  setValue: (v: string) => void;
  sx?: SxProps<Theme>;
}

export default function ItemNameInput(props: Props) {
  const { value, setValue, sx } = props;

  return (
    <div>
      <StyledInputLabel>아이템 이름</StyledInputLabel>
      <TextField
        sx={sx}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        size={"small"}
        InputProps={{
          slots: { root: StyledInputRoot, input: StyledInput },
        }}
      />
    </div>
  );
}
