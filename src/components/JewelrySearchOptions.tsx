"use client";
import { useCallback, useMemo, useState } from "react";
import { Autocomplete, Button, Grid, ListItem, TextField } from "@mui/material";
import { CallMadeSharp } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import _ from "underscore";

import { auctionOptions } from "@/libs/data";
import SecondOptionInputs from "@/components/SecondOptionInputs";
import { TCategoryItem, TEtcOption, TSearchDetailOption } from "@/libs/types";
import { openAuction } from "@/redux/features/auctionSlice";

export default function JewelrySearchOptions({
  codeName,
}: {
  codeName: string;
}) {
  const dispatch = useDispatch();
  const [detailOptions, setDetailOptions] = useState<TSearchDetailOption[]>([]);
  const [firstOption, setFirstOption] = useState<TEtcOption | null>(null);

  const addNewOption = useCallback(() => {
    if (!firstOption) return;
    setDetailOptions((prevState) => {
      const newOption: TSearchDetailOption = {
        FirstOption: firstOption.Value,
        SecondOption: null,
        MinValue: null,
        MaxValue: null,
      };
      const state = [...prevState];
      state.push(newOption);
      return state;
    });
  }, [firstOption]);

  const code: number = useMemo(() => {
    return _.chain(auctionOptions.Categories)
      .map((v) => [
        v.Subs,
        { Code: v.Code, CodeName: v.CodeName } as TCategoryItem,
      ])
      .compact()
      .flatten()
      .find((v) => v.CodeName === codeName)
      .get("Code")
      .value();
  }, [codeName]);

  return (
    <ListItem disablePadding sx={{ pl: 5 }}>
      <Grid container columnSpacing={1}>
        <Grid container item xs rowSpacing={1}>
          {detailOptions.map((option, i) => (
            <SecondOptionInputs
              firstOptionValue={option.FirstOption}
              detailOption={detailOptions[i]}
              setOptions={setDetailOptions}
              index={i}
            />
          ))}
          <Grid item style={{ display: "flex", flex: 1 }}>
            <Autocomplete
              size={"small"}
              fullWidth
              value={firstOption}
              onChange={(_, newValue) => setFirstOption(newValue)}
              options={auctionOptions.EtcOptions}
              getOptionLabel={(option) => option.Text}
              renderInput={(params) => <TextField {...params} />}
            />
            <Button onClick={addNewOption} disabled={!firstOption}>
              추가
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={"auto"}>
          <Button
            sx={{ height: "100%" }}
            onClick={() => {
              dispatch(
                openAuction({ detailOptions: detailOptions, code: code }),
              );
            }}
          >
            <CallMadeSharp />
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  );
}
