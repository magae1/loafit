"use client";
import { useState } from "react";
import {
  Autocomplete,
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Typography,
  Grid,
  NativeSelect,
  InputBase,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import { useAppSelector } from "@/redux/store";
import { changeName, changeValue } from "@/redux/features/engravingSlotsSlice";
import { engravingOptions } from "@/libs/data";
import {
  GroupHeader,
  GroupItems,
  StyledInput,
  StyledInputRoot,
} from "@/components/styles";

export default function EngravingEquipment({ index }: { index: number }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const engravingEffects = useAppSelector(
    (state) => state.engravingSlots.value[index],
  );
  const className = useAppSelector(
    (state) => state.auction.value.options.CharacterClass,
  );
  const [inputValue, setInputValue] = useState("");

  if (!engravingEffects.Effect) {
    return <Typography>장착 중인 각인 효과가 없습니다.</Typography>;
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs>
        <Autocomplete
          fullWidth
          inputValue={inputValue}
          value={
            engravingOptions.find(
              (v) => v.Text === engravingEffects.Effect.Name,
            ) ?? null
          }
          onChange={(_, newValue) => {
            if (newValue?.Class != "" && className !== newValue?.Class) {
              enqueueSnackbar("다른 클래스의 직업 각인을 적용합니다.", {
                variant: "warning",
              });
            }

            dispatch(
              changeName({
                slotIndex: index,
                name: newValue ? newValue.Text : null,
              }),
            );
          }}
          onInputChange={(_, newValue) => setInputValue(newValue)}
          renderInput={(params) => (
            <StyledInputRoot ref={params.InputProps.ref}>
              <StyledInput {...params.inputProps} />
            </StyledInputRoot>
          )}
          groupBy={(option) => option.Class}
          options={engravingOptions.sort((a, b) => {
            if (a.Class == b.Class) {
              return a.Value - b.Value;
            }
            return a.Class > b.Class ? 1 : -1;
          })}
          renderGroup={(params) => (
            <li key={params.key}>
              <GroupHeader>{params.group}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          )}
          getOptionDisabled={(option) => option.Value >= 800}
          getOptionLabel={(option) => option.Text}
        />
      </Grid>
      <Grid item xs={"auto"}>
        <FormControl>
          <Select
            value={engravingEffects.Effect.Value}
            sx={{ width: "95px" }}
            onChange={(e) => {
              if (typeof e.target.value === "number") {
                dispatch(
                  changeValue({ slotIndex: index, value: e.target.value }),
                );
              }
            }}
            input={
              <InputBase
                slots={{
                  root: StyledInputRoot,
                  input: StyledInput,
                }}
              />
            }
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
