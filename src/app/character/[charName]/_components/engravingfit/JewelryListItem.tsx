"use client";
import { useState } from "react";
import {
  ListItem,
  IconButton,
  ListItemText,
  ListItemAvatar,
  Stack,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import _ from "underscore";
import { useDispatch } from "react-redux";

import { wearingType } from "@/libs/types";
import { useAppSelector } from "@/redux/store";
import { removeOne, restoreOne } from "@/redux/features/jewelriesSlice";
import EmptyJewelryListItem from "./EmptyJewelryListItem";
import OptionChip from "@/components/OptionChip";
import AuctionItemAvatar from "@/components/AuctionItemAvatar";
import ItemNameTypo from "@/components/ItemNameTypo";

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
  const [open, setOpen] = useState(false);

  if (!currJewelry.item) {
    return (
      <EmptyJewelryListItem
        prev_item={prevJewelry.item}
        type={type}
        codeName={currJewelry.codeName}
        open={open}
        onOpen={() => setOpen((prevState) => !prevState)}
        onRestore={() => {
          dispatch(restoreOne(type));
        }}
      />
    );
  }

  return (
    <>
      <ListItem
        disablePadding
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
        <ListItemButton onClick={() => setOpen((prevState) => !prevState)}>
          <ListItemAvatar>
            <AuctionItemAvatar item={currJewelry.item} />
          </ListItemAvatar>
          <ListItemText
            disableTypography
            primary={<ItemNameTypo item={currJewelry.item} />}
            secondary={
              <Stack
                spacing={0.5}
                direction={"row"}
                useFlexGap
                flexWrap={"wrap"}
              >
                {currJewelry.item.Options.map((v) => (
                  <OptionChip option={v} key={_.uniqueId("jewelry-options")} />
                ))}
              </Stack>
            }
          />
        </ListItemButton>
      </ListItem>
      <Collapse in={open}>
        <ListItem>
          <ListItemText inset secondary={"경매장 정보가 없습니다."} />
        </ListItem>
      </Collapse>
    </>
  );
}
