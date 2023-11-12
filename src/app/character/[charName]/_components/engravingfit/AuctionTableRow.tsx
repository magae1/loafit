"use client";
import Image from "next/image";
import { useState } from "react";
import {
  TableRow,
  TableCell,
  Collapse,
  Typography,
  Stack,
  Button,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
} from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import _ from "underscore";
import { useDispatch } from "react-redux";
import { useSnackbar, VariantType } from "notistack";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.locale("ko");
dayjs.extend(relativeTime);

import { TAuctionItem } from "@/libs/types";
import OptionChip from "@/components/OptionChip";
import { qualityColor } from "@/libs/game-color";
import { useAppSelector } from "@/redux/store";
import { closeAuction } from "@/redux/features/auctionSlice";
import { addOne } from "@/redux/features/jewelriesSlice";
import { addStone } from "@/redux/features/stoneSlice";
import AuctionInfoTable from "@/components/AuctionInfoTable";
import ItemNameTypo from "@/components/ItemNameTypo";

export default function AuctionTableRow({ item }: { item: TAuctionItem }) {
  const dispatch = useDispatch();
  const type = useAppSelector((state) => state.auction.value.type);
  const jewelries = useAppSelector((state) => state.jewelries.value.curr);
  const { enqueueSnackbar } = useSnackbar();
  const { Icon, Name, Grade, Tier, GradeQuality, Level, Options, AuctionInfo } =
    item;
  const secondaryList = [
    Tier && `${Tier}티어`,
    Grade && `${Grade}`,
    GradeQuality && `품${GradeQuality}`,
    Level && `Lv.${Level}`,
  ];

  const [open, setOpen] = useState(false);

  const toast = (name: string, variant: VariantType = "error") => {
    enqueueSnackbar(`동일한 이름의 ${name}를 장착중입니다.`, { variant });
  };

  const equipItem = () => {
    if (!type) return;

    if (type === "어빌리티 스톤") {
      dispatch(addStone(item));
      dispatch(closeAuction());
      return;
    }

    if (type === "earring1" && jewelries.earring2.item) {
      if (jewelries.earring2.item.Name === item.Name) {
        toast(jewelries.earring2.codeName);
        return;
      }
    } else if (type === "earring2" && jewelries.earring1.item) {
      if (jewelries.earring1.item.Name === item.Name) {
        toast(jewelries.earring1.codeName);
        return;
      }
    } else if (type === "ring1" && jewelries.ring2.item) {
      if (jewelries.ring2.item.Name === item.Name) {
        toast(jewelries.ring2.codeName);
        return;
      }
    } else if (type === "ring2" && jewelries.ring1.item) {
      if (jewelries.ring1.item.Name === item.Name) {
        toast(jewelries.ring1.codeName);
        return;
      }
    }

    dispatch(addOne({ type: type, item: item }));
    dispatch(closeAuction());
  };

  return (
    <>
      <TableRow
        hover
        sx={{ "& .MuiTableCell-root": { borderBottom: "unset" } }}
        onClick={() => setOpen((prevState) => !prevState)}
      >
        <TableCell sx={{ px: 1 }} align={"center"}>
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </TableCell>
        <TableCell sx={{ px: 0 }} component={"th"}>
          <ItemNameTypo item={item} fontSize={"inherit"} />
          <Stack direction={"row"} spacing={0.5}>
            {Options.map((v) => (
              <OptionChip key={_.uniqueId("auction-item-options")} option={v} />
            ))}
          </Stack>
        </TableCell>
        <TableCell align={"center"}>
          {GradeQuality ? (
            <Typography
              sx={{
                bgcolor: qualityColor(GradeQuality),
                borderRadius: "4px",
              }}
            >
              {GradeQuality}
            </Typography>
          ) : (
            "-"
          )}
        </TableCell>
        <TableCell align={"center"}>{AuctionInfo?.StartPrice ?? "-"}</TableCell>
        <TableCell align={"center"}>{AuctionInfo?.BuyPrice ?? "-"}</TableCell>
        <TableCell align={"center"}>
          {AuctionInfo ? dayjs(AuctionInfo.EndDate).fromNow() : "-"}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout={"auto"} unmountOnExit>
            <List>
              <ListItem
                dense
                secondaryAction={<Button onClick={equipItem}>장착</Button>}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "inherit" }}>
                    <Image src={Icon} alt={`${Name} 아이콘`} unoptimized fill />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={Name}
                  secondary={_.compact(secondaryList).join(" | ")}
                />
              </ListItem>
              <li style={{ paddingLeft: "65px" }}>
                {AuctionInfo && <AuctionInfoTable info={AuctionInfo} />}
              </li>
            </List>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
