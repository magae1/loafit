"use client";
import { ReactNode, useState } from "react";
import { Autocomplete, Button, Grid } from "@mui/material";

import { TDetailEtcOption, TEtcOption, TEtcSub } from "@/libs/types";
import {
  GroupHeader,
  GroupItems,
  NumInputAdornment,
  StyledInput,
  StyledInputLabel,
  StyledInputRoot,
} from "@/components/styles";
import NumberInput from "@/components/NumberInput";

interface Props {
  options: TEtcOption[];
  onAdd: (opt: TDetailEtcOption) => void;
  children: ReactNode;
}

const getDetailEtcOpt = (
  firstOption: TEtcOption,
  secondOpt: TEtcSub,
  minValue?: number,
  maxValue?: number,
): TDetailEtcOption => ({
  Value: firstOption.Value,
  Text: firstOption.Text,
  EtcSub: secondOpt,
  MinValue: minValue ? minValue : null,
  MaxValue: maxValue ? maxValue : null,
});

export default function EtcOptionInput(props: Props) {
  const { options, onAdd, children } = props;

  const [firstOption, setFirstOption] = useState<TEtcOption | null>(null);
  const [secondOption, setSecondOption] = useState<TEtcSub | null>(null);
  const [minValue, setMinValue] = useState<number | undefined>(undefined);
  const [maxValue, setMaxValue] = useState<number | undefined>(undefined);

  const onClickAdd = () => {
    if (!firstOption || !secondOption) return;

    const detailEtcOpt = getDetailEtcOpt(
      firstOption,
      secondOption,
      minValue,
      maxValue,
    );
    onAdd(detailEtcOpt);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <StyledInputLabel>기타 옵션</StyledInputLabel>
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
      <Grid item xs={7}>
        <Autocomplete
          value={firstOption}
          onChange={(_, newValue) => {
            setSecondOption(null);
            setFirstOption(newValue);
          }}
          fullWidth
          renderInput={(params) => (
            <StyledInputRoot ref={params.InputProps.ref}>
              <StyledInput {...params.inputProps} />
            </StyledInputRoot>
          )}
          isOptionEqualToValue={(option, value) => option.Value === value.Value}
          getOptionLabel={(option) => option.Text}
          options={options}
        />
      </Grid>
      <Grid item xs={5}>
        <Autocomplete
          value={secondOption}
          onChange={(_, newValue) => setSecondOption(newValue)}
          fullWidth
          renderInput={(params) => (
            <StyledInputRoot ref={params.InputProps.ref}>
              <StyledInput {...params.inputProps} />
            </StyledInputRoot>
          )}
          groupBy={(option) => option.Class}
          renderGroup={(params) => (
            <li key={params.key}>
              <GroupHeader>{params.group}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          )}
          isOptionEqualToValue={(option, value) => option.Value === value.Value}
          getOptionLabel={(option) => option.Text}
          options={
            firstOption
              ? firstOption.EtcSubs.sort((a, b) => {
                  if (a.Class == b.Class) {
                    return a.Value - b.Value;
                  }
                  return a.Class > b.Class ? 1 : -1;
                })
              : []
          }
        />
      </Grid>
      <Grid item xs>
        <NumberInput
          value={minValue}
          min={1}
          onChange={(_, newValue) => setMinValue(newValue)}
          startAdornment={<NumInputAdornment>최소</NumInputAdornment>}
        />
      </Grid>
      <Grid item xs>
        <NumberInput
          value={maxValue}
          min={1}
          onChange={(_, newValue) => setMaxValue(newValue)}
          startAdornment={<NumInputAdornment>최대</NumInputAdornment>}
        />
      </Grid>
      <Grid item xs={"auto"}>
        <Button sx={{ height: "100%" }} onClick={onClickAdd}>
          추가
        </Button>
      </Grid>
    </Grid>
  );
}
