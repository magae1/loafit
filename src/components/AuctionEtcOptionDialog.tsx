"use client";
import { useCallback, useState } from "react";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

import { option } from "@/app/character/[charName]/_components/engravingfit/JewelrySearchOptionList";
import { TEtcOption, TEtcSub, TSearchDetailOption } from "@/libs/types";
import { auctionOptions } from "@/libs/data";
import NumberInput from "@/components/NumberInput";
import {
  GroupHeader,
  GroupItems,
  NumInputAdornment,
  StyledInput,
  StyledInputRoot,
} from "@/components/styles";

interface Props {
  open: boolean;
  addOption: (opt: option) => void;
  onClose: () => void;
}

export default function AuctionEtcOptionDialog(props: Props) {
  const { open, addOption, onClose } = props;
  const [firstOption, setFirstOption] = useState<TEtcOption | null>(null);
  const [secondOption, setSecondOption] = useState<TEtcSub | null>(null);
  const [minValue, setMinValue] = useState<number | undefined>(undefined);
  const [maxValue, setMaxValue] = useState<number | undefined>(undefined);

  const addAndClose = useCallback(() => {
    if (!firstOption || !secondOption) return;

    const searchOpt: TSearchDetailOption = {
      FirstOption: firstOption.Value,
      SecondOption: secondOption.Value,
      MinValue: minValue ?? null,
      MaxValue: maxValue ?? null,
    };
    const newOpt: option = {
      firstName: firstOption.Text,
      secondName: secondOption.Text,
      searchOption: searchOpt,
    };
    addOption(newOpt);
    onClose();
  }, [firstOption, secondOption, minValue, maxValue]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>기타 검색 옵션 추가</DialogTitle>
      <DialogContent>
        <Grid container columnSpacing={2} rowSpacing={1} columns={6}>
          <Grid item xs={2}>
            <Autocomplete
              fullWidth
              value={firstOption}
              onChange={(_, newValue) => {
                setSecondOption(null);
                setFirstOption(newValue);
              }}
              options={auctionOptions.EtcOptions}
              aria-label={"기타 검색 옵션 선택"}
              getOptionLabel={(option) => option.Text}
              renderInput={(params) => (
                <StyledInputRoot ref={params.InputProps.ref}>
                  <StyledInput {...params.inputProps} />
                </StyledInputRoot>
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              fullWidth
              value={secondOption}
              onChange={(_, newValue) => setSecondOption(newValue)}
              options={firstOption ? firstOption.EtcSubs : []}
              aria-label={"기타 검색 옵션 선택"}
              getOptionLabel={(option) => option.Text}
              renderInput={(params) => (
                <StyledInputRoot ref={params.InputProps.ref}>
                  <StyledInput type={"text"} {...params.inputProps} />
                </StyledInputRoot>
              )}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <NumberInput
              value={minValue}
              startAdornment={<NumInputAdornment>최소</NumInputAdornment>}
              onChange={(_, value) => setMinValue(value)}
              min={0}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <NumberInput
              value={maxValue}
              startAdornment={<NumInputAdornment>최대</NumInputAdornment>}
              onChange={(_, value) => setMaxValue(value)}
              min={0}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={addAndClose}>추가</Button>
      </DialogActions>
    </Dialog>
  );
}
