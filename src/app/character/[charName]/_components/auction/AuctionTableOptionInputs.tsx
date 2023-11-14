"use client";
import { useState } from "react";
import {
  DialogActions,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDispatch } from "react-redux";

import { auctionOptions } from "@/libs/data";
import ItemGradeInput from "@/components/auctioninputs/ItemGradeInput";
import ItemGradeQualityInput from "@/components/auctioninputs/ItemGradeQualityInput";
import ItemCategoryInput from "@/components/auctioninputs/ItemCategoryInput";
import ItemTiersInput from "@/components/auctioninputs/ItemTiersInput";
import { useAppSelector } from "@/redux/store";
import {
  changeCategory,
  changeItemGrade,
  changeItemGradeQuality,
  changeItemName,
  changeItemTier,
} from "@/redux/features/auctionSlice";

export default function AuctionTableOptionInputs() {
  const dispatch = useDispatch();
  const { options, categoryOptions } = useAppSelector(
    (state) => state.auction.value,
  );
  const { ItemTier, Category, ItemGrade, ItemGradeQuality } = options;

  const [input, setInput] = useState("");

  return (
    <DialogActions sx={{ flexWrap: "wrap", gap: "4px" }}>
      <ItemCategoryInput
        categoryItem={Category}
        setCategoryItem={(v) => {
          dispatch(changeCategory(v));
        }}
        sx={{ width: "160px" }}
        options={categoryOptions}
      />
      <ItemGradeInput
        grade={ItemGrade}
        setGrade={(v) => {
          dispatch(changeItemGrade(v));
        }}
        options={auctionOptions.ItemGrades}
        sx={{ width: "92px" }}
      />
      <ItemGradeQualityInput
        quality={ItemGradeQuality}
        setQuality={(v) => dispatch(changeItemGradeQuality(v))}
        options={auctionOptions.ItemGradeQualities}
        sx={{ width: "85px" }}
      />
      <ItemTiersInput
        value={ItemTier}
        setValue={(v) => {
          dispatch(changeItemTier(v));
        }}
        options={auctionOptions.ItemTiers}
      />
      <TextField
        sx={{ width: "100%" }}
        component={"form"}
        variant={"standard"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={"아이템 이름"}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(changeItemName(input));
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position={"end"}>
              <IconButton type={"submit"}>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </DialogActions>
  );
}
