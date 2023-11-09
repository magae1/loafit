"use client";
import { useMemo } from "react";
import {
  ListItem,
  IconButton,
  ListItemText,
  ListItemAvatar,
  Typography,
  Stack,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import _ from "underscore";
import { useDispatch } from "react-redux";

import { TCategoryItem, wearingType } from "@/libs/types";
import { useAppSelector } from "@/redux/store";
import { removeOne, restoreOne } from "@/redux/features/jewelriesSlice";
import EmptyJewelryListItem from "./EmptyJewelryListItem";
import OptionChip from "@/components/OptionChip";
import AuctionItemAvatar from "@/components/AuctionItemAvatar";
import { auctionOptions } from "@/libs/data";
import { openAuction } from "@/redux/features/auctionSlice";

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

  const code: number = useMemo(() => {
    return _.chain(auctionOptions.Categories)
      .map((v) => [
        v.Subs,
        { Code: v.Code, CodeName: v.CodeName } as TCategoryItem,
      ])
      .compact()
      .flatten()
      .find((v) => v.CodeName === currJewelry.codeName)
      .get("Code")
      .value();
  }, [currJewelry.codeName]);

  if (!currJewelry.item) {
    return (
      <EmptyJewelryListItem
        prev_item={prevJewelry.item}
        codeName={currJewelry.codeName}
        onOpenAuction={() => {
          dispatch(openAuction(code));
        }}
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
          <Delete />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <AuctionItemAvatar item={currJewelry.item} />
      </ListItemAvatar>
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
