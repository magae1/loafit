import { Autocomplete, SxProps, TextField, Theme } from "@mui/material";

import { TCategoryItem } from "@/libs/types";

interface Props {
  categoryItem: TCategoryItem | null;
  setCategoryItem: (v: TCategoryItem | null) => void;
  options: TCategoryItem[];
  sx?: SxProps<Theme>;
}

export default function ItemCategoryInput(props: Props) {
  const { categoryItem, setCategoryItem, options, sx } = props;

  return (
    <Autocomplete
      sx={sx}
      value={categoryItem}
      onChange={(_, newValue) => setCategoryItem(newValue)}
      options={options}
      isOptionEqualToValue={(option, value) => option.Code === value.Code}
      getOptionLabel={(option) => option.CodeName}
      renderInput={(params) => (
        <TextField
          {...params}
          variant={"standard"}
          placeholder={"없음"}
          label={"카테고리"}
        />
      )}
    />
  );
}
