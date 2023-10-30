"use client";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Typography,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/redux/store";
import { changeName, changeValue } from "@/redux/features/engravingSlotsSlice";
import { optionType } from "@/libs/types";
import { engravingOptions } from "@/libs/data";

export default function EngravingSlider({ index }: { index: number }) {
  const dispatch = useDispatch();
  const engravingEffects = useAppSelector(
    (state) => state.engravingSlots.value[index],
  );
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<optionType | null>(null);

  if (!engravingEffects.Effect) {
    return <Typography>장착 중인 각인 효과가 없습니다.</Typography>;
  }

  useEffect(() => {
    let option = engravingOptions.find(
      (v) => v.Text === engravingEffects.Effect.Name,
    );
    setValue(option ? option : null);
  }, [engravingEffects]);

  return (
    <Grid container spacing={1} p={1}>
      <Grid item xs>
        <Autocomplete
          fullWidth
          inputValue={inputValue}
          value={value}
          onChange={(e, newValue) => {
            dispatch(
              changeName({
                slotIndex: index,
                name: newValue ? newValue.Text : null,
              }),
            );
          }}
          onInputChange={(_, newValue) => setInputValue(newValue)}
          renderInput={(params) => (
            <TextField {...params} label={`슬롯${index + 1}`} />
          )}
          groupBy={(option) => option.Class}
          options={engravingOptions.sort((a, b) => {
            if (a.Class == b.Class) {
              return a.Text > b.Text ? 1 : -1;
            }
            return a.Class > b.Class ? 1 : -1;
          })}
          getOptionDisabled={(option) => option.Value >= 800}
          getOptionLabel={(option) => option.Text}
        />
      </Grid>
      <Grid item xs={"auto"}>
        <FormControl>
          <InputLabel>활성 포인트</InputLabel>
          <Select
            label={"활성 포인트"}
            value={engravingEffects.Effect.Value}
            sx={{ width: "95px" }}
            onChange={(e) => {
              if (typeof e.target.value === "number") {
                console.log(e.target.value);
                dispatch(
                  changeValue({ slotIndex: index, value: e.target.value }),
                );
              }
            }}
            inputProps={{ "aria-label": "각인 활성 포인트" }}
          >
            <MenuItem value={0}>
              <em>미적용</em>
            </MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
