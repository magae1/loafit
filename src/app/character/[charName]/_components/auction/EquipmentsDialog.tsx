"use client";
import { useCallback, useState } from "react";
import {
  Button,
  List,
  Dialog,
  DialogTitle,
  ListItemText,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useDispatch } from "react-redux";
import _ from "underscore";
import { useSnackbar, VariantType } from "notistack";

import { TAuctionItem, wearingType } from "@/libs/types";
import { addOne, WEARINGS } from "@/redux/features/jewelriesSlice";
import { useAppSelector } from "@/redux/store";
import AuctionItemInfoItem from "@/components/AuctionItemInfoItem";
import { closeAuction } from "@/redux/features/auctionSlice";

interface Props {
  auctionItem: TAuctionItem;
}

export default function EquipmentDialog(props: Props) {
  const { auctionItem } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { curr, prev } = useAppSelector((state) => state.jewelries.value);
  const [open, setOpen] = useState(false);

  const toast = (name: string, variant: VariantType = "error") => {
    enqueueSnackbar(`동일한 이름의 ${name}를 장착중입니다.`, { variant });
  };

  const onEquip = useCallback(
    (type: keyof wearingType) => {
      const codeName = curr[type].codeName;
      if (auctionItem.Name.split(" ").pop() !== codeName) {
        enqueueSnackbar("다른 부위에 장착할 수 없습니다.", {
          variant: "error",
        });
        return;
      }

      if (type === "earring1") {
        if (curr.earring2.item?.Name === auctionItem.Name) {
          toast(codeName);
          return;
        }
      } else if (type === "earring2") {
        if (curr.earring1.item?.Name === auctionItem.Name) {
          toast(codeName);
          return;
        }
      } else if (type === "ring1") {
        if (curr.ring2.item?.Name === auctionItem.Name) {
          toast(codeName);
          return;
        }
      } else if (type === "ring2") {
        if (curr.ring1.item?.Name === auctionItem.Name) {
          toast(codeName);
          return;
        }
      }
      dispatch(addOne({ type: type, item: auctionItem }));
      setOpen(false);
      dispatch(closeAuction());
    },
    [auctionItem, dispatch, curr],
  );

  return (
    <>
      <Button fullWidth onClick={() => setOpen(true)}>
        장착
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>장착 부위</DialogTitle>
        <List dense sx={{ pt: 0, minWidth: "285px" }}>
          {WEARINGS.map((w) => {
            const item = curr[w.type].item;
            return (
              <ListItemButton
                key={_.uniqueId("equipment-items")}
                onClick={() => onEquip(w.type)}
              >
                {item ? (
                  <AuctionItemInfoItem item={item} />
                ) : (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{w.name[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={w.name} />
                  </ListItem>
                )}
              </ListItemButton>
            );
          })}
        </List>
      </Dialog>
    </>
  );
}
