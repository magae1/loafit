"use client";
import { SyntheticEvent, useMemo } from "react";
import {
  List,
  ListItem,
  Grid,
  Rating,
  Typography,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  RadioButtonChecked,
  RadioButtonUnchecked,
  RemoveCircle,
} from "@mui/icons-material";
import { red, blue } from "@mui/material/colors";
import _ from "underscore";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/redux/store";
import { TActiveEngraving } from "@/libs/types";
import {
  changeEngValue,
  removeStone,
  restoreStone,
} from "@/redux/features/stoneSlice";
import EmptyJewelryListItem from "@/components/EmptyJewelryListItem";
import AuctionItemAvatar from "@/components/AuctionItemAvatar";

interface Props {
  option: TActiveEngraving;
  onChangeValue: (
    e: SyntheticEvent<Element, Event>,
    value: number | null,
  ) => void;
}

function EngravingOptionItem(props: Props) {
  const { Name, Value, IsPenalty } = props.option;

  return (
    <ListItem sx={{ pr: 3 }}>
      <Grid container>
        <Grid item xs>
          <Typography>{Name}</Typography>
          <Typography variant={"caption"}>
            활성 포인트: <strong>{Value}</strong>
          </Typography>
        </Grid>
        <Grid item xs={"auto"}>
          <Rating
            name={Name}
            value={Value}
            max={10}
            onChange={props.onChangeValue}
            sx={{
              "& .MuiRating-icon": { color: IsPenalty ? red[500] : blue[500] },
            }}
            icon={<RadioButtonChecked fontSize={"inherit"} />}
            emptyIcon={<RadioButtonUnchecked fontSize={"inherit"} />}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default function StoneBoard() {
  const { curr, prev } = useAppSelector((state) => state.abilityStone.value);
  const dispatch = useDispatch();

  const StoneStates = useMemo(() => {
    if (_.isEmpty(curr)) {
      return null;
    }
    return curr.engravings.map((v, i) => (
      <EngravingOptionItem
        key={_.uniqueId("stone-engraving-rate-item")}
        option={v}
        onChangeValue={(e, value) => {
          dispatch(changeEngValue({ index: i, value: value }));
        }}
      />
    ));
  }, [curr, dispatch]);

  return (
    <List disablePadding>
      {curr.item ? (
        <ListItem
          secondaryAction={
            <IconButton
              edge={"end"}
              onClick={() => {
                dispatch(removeStone());
              }}
            >
              <RemoveCircle />
            </IconButton>
          }
        >
          <AuctionItemAvatar item={curr.item} />
          <ListItemText primary={`[${curr.item.Grade}] ${curr.item.Name}`} />
        </ListItem>
      ) : (
        <EmptyJewelryListItem
          prev_item={prev.item}
          codeName={curr.codeName}
          onRestore={() => {
            dispatch(restoreStone());
          }}
        />
      )}
      <List dense>{StoneStates}</List>
    </List>
  );
}
