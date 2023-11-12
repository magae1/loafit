"use client";
import { useDispatch } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";
import { ArrowDropUp } from "@mui/icons-material";
import _ from "underscore";

import { useAppSelector } from "@/redux/store";
import { changeItemGradeQuality } from "@/redux/features/auctionSlice";
import { qualityColor } from "@/libs/game-color";

export default function ItemGradeQualityInput({
  options,
}: {
  options: number[];
}) {
  const dispatch = useDispatch();
  const value = useAppSelector(
    (state) => state.auction.value.options.ItemGradeQuality,
  );

  return (
    <Autocomplete
      value={value}
      options={options}
      sx={{ width: "85px" }}
      onChange={(_, value) => {
        dispatch(changeItemGradeQuality(value));
      }}
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
