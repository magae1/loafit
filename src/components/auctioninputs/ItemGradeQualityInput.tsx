"use client";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Autocomplete, Slider, TextField, Typography } from "@mui/material";
import _ from "underscore";

import { useAppSelector } from "@/redux/store";
import { QUALITY_COLORS } from "@/libs/data";
import { changeItemGradeQuality } from "@/redux/features/auctionSlice";

const color = (value: number) => {
  const idx = QUALITY_COLORS.findIndex((color) => color.minValue <= value);
  if (idx >= 0) return QUALITY_COLORS[idx].color;
  return undefined;
};

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
          style={{
            textDecoration: `${color(option)} underline`,
          }}
        >
          {option} 이상
        </li>
      )}
    />
  );
}
