"use client";
import { Autocomplete, TextField } from "@mui/material";
import { useDispatch } from "react-redux";

import { changeItemTier } from "@/redux/features/auctionSlice";
import { useAppSelector } from "@/redux/store";

export default function ItemTiersInput({ options }: { options: number[] }) {
  const dispatch = useDispatch();
  const value = useAppSelector((state) => state.auction.value.options.ItemTier);

  return (
    <Autocomplete
      sx={{ minWidth: "50px" }}
      value={value}
      onChange={(_, newValue) => dispatch(changeItemTier(newValue))}
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
