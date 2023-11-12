"use client";
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useCallback,
  useMemo,
} from "react";
import {
  Autocomplete,
  Button,
  Grid,
  Input,
  InputProps,
  styled,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import { TEtcSub, TSearchDetailOption } from "@/libs/types";
import { auctionOptions } from "@/libs/data";
import { GroupHeader, GroupItems } from "@/components/styles";

interface Props {
  firstOptionValue: number;
  detailOption: TSearchDetailOption;
  setOptions: Dispatch<SetStateAction<TSearchDetailOption[]>>;
  index: number;
}

const ValueInput = styled(({ ...props }: InputProps) => (
  <Input {...props} size={"small"} inputProps={{ type: "number" }} />
))(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: theme.spacing(7),
  },
}));

export default function SecondOptionInputs(props: Props) {
  const { firstOptionValue, detailOption, setOptions, index } = props;

  const etcOption = useMemo(() => {
    return auctionOptions.EtcOptions.find(
      (opt) => opt.Value === firstOptionValue,
    );
  }, [firstOptionValue]);

  const onDeleteOption = useCallback(() => {
    setOptions((prevState) => {
      return prevState
        .slice(0, index)
        .concat(prevState.slice(index + 1, prevState.length));
    });
  }, [index]);

  const onChangeSecondOption = useCallback(
    (_: SyntheticEvent, newValue: TEtcSub | null) => {
      setOptions((prevState) => {
        const state = [...prevState];
        state[index].SecondOption = newValue ? newValue.Value : null;
        return state;
      });
    },
    [index],
  );

  if (!etcOption) return null;
  return (
    <Grid container item columnSpacing={1}>
      <Grid container item xs={"auto"}>
        <Button variant={"contained"} color={"error"} onClick={onDeleteOption}>
          <Delete fontSize={"small"} />
        </Button>
      </Grid>
      <Grid container item xs spacing={1}>
        <Grid item xs={12} sm>
          <Autocomplete
            fullWidth
            onChange={onChangeSecondOption}
            renderInput={(params) => (
              <TextField
                {...params}
                size={"small"}
                variant={"standard"}
                placeholder={etcOption.Text}
              />
            )}
            options={etcOption.EtcSubs.sort((a, b) => {
              if (a.Class === b.Class) return a.Value - b.Value;
              return a.Class > b.Class ? 1 : -1;
            })}
            renderGroup={(params) => (
              <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>{params.children}</GroupItems>
              </li>
            )}
            groupBy={(option) => option.Class}
            getOptionLabel={(option) => option.Text}
          />
        </Grid>
        <Grid item xs={6} sm={"auto"}>
          <ValueInput
            placeholder={"최소"}
            disabled={!detailOption.SecondOption}
            value={detailOption.MinValue}
            onChange={(e) => {
              const numValue = parseInt(e.target.value);
              if (
                numValue < 0 ||
                (detailOption.MaxValue && detailOption.MaxValue < numValue)
              ) {
                return;
              }
              setOptions((prevState) => {
                let state = [...prevState];
                state[index].MinValue = numValue;
                return state;
              });
            }}
          />
        </Grid>
        <Grid item xs={6} sm={"auto"}>
          <ValueInput
            placeholder={"최대"}
            disabled={!detailOption.SecondOption}
            value={detailOption.MaxValue}
            onChange={(e) => {
              const numValue = parseInt(e.target.value);
              if (
                numValue < 0 ||
                (detailOption.MinValue && detailOption.MinValue > numValue)
              ) {
                return;
              }
              setOptions((prevState) => {
                let state = [...prevState];
                state[index].MaxValue = numValue;
                return state;
              });
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
