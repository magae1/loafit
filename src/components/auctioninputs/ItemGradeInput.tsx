import { Autocomplete, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { changeItemGrade } from "@/redux/features/auctionSlice";

export default function ItemGradeInput({ options }: { options: string[] }) {
  const dispatch = useDispatch();
  const grade = useAppSelector(
    (state) => state.auction.value.options.ItemGrade,
  );
  return (
    <Autocomplete
      sx={{ width: "85px" }}
      size={"small"}
      value={grade}
      onChange={(_, newValue) => {
        dispatch(changeItemGrade(newValue));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant={"standard"}
          placeholder={"없음"}
          label={"등급"}
        />
      )}
      options={options}
    />
  );
}
