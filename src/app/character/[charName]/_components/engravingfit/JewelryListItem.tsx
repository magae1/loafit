"use client";
import {
  ListItem,
  IconButton,
  ListItemText,
  Typography,
  Stack,
} from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";
import _ from "underscore";
import { useDispatch } from "react-redux";

import { wearingType } from "@/libs/types";
import { useAppSelector } from "@/redux/store";
import { removeOne, restoreOne } from "@/redux/features/jewelriesSlice";
import EmptyJewelryListItem from "@/components/EmptyJewelryListItem";
import OptionChip from "@/components/OptionChip";
import AuctionItemAvatar from "@/components/AuctionItemAvatar";

interface Props {
  type: keyof wearingType;
}

export default function JewelryListItem(props: Props) {
  const { type } = props;
  const dispatch = useDispatch();
  const currJewelry = useAppSelector(
    (state) => state.jewelries.value.curr[type],
  );
  const prevJewelry = useAppSelector(
    (state) => state.jewelries.value.prev[type],
  );

  if (!currJewelry.item) {
    return (
      <EmptyJewelryListItem
        prev_item={prevJewelry.item}
        codeName={currJewelry.codeName}
        onRestore={() => {
          dispatch(restoreOne(type));
        }}
      />
    );
  }

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge={"end"}
          onClick={() => {
            dispatch(removeOne(type));
          }}
        >
          <RemoveCircle />
        </IconButton>
      }
    >
      <AuctionItemAvatar item={currJewelry.item} />
      <ListItemText
        disableTypography
        primary={
          <Typography>
            [{currJewelry.item.Grade}] {currJewelry.item.Name}
          </Typography>
        }
        secondary={
          <Stack spacing={0.5} direction={"row"} useFlexGap flexWrap={"wrap"}>
            {currJewelry.item.Options.map((v) => (
              <OptionChip option={v} key={_.uniqueId("jewelry-options")} />
            ))}
          </Stack>
        }
      />
    </ListItem>
  );
}
