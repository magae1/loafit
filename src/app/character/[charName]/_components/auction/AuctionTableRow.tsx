"use client";
import { useCallback, useState } from "react";
import {
  TableRow,
  TableCell,
  Collapse,
  Typography,
  List,
  Grid,
  Button,
} from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useSnackbar, VariantType } from "notistack";
import _ from "underscore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.locale("ko");
dayjs.extend(relativeTime);

import { TAuctionItem } from "@/libs/types";
import { qualityColor } from "@/libs/game-color";
import AuctionItemAuctionInfoItems from "@/components/AuctionItemAuctionInfoItems";
import ItemNameTypo from "@/components/ItemNameTypo";
import AuctionItemInfoItem from "@/components/AuctionItemInfoItem";
import { DetailsListSubheader } from "@/components/styles";
import { addOne, wearingType } from "@/redux/features/wearingsSlice";
import { useAppSelector } from "@/redux/store";

interface Props {
  type: keyof wearingType;
  item: TAuctionItem;
  onClose: () => void;
}

export default function AuctionTableRow(props: Props) {
  const { type, item, onClose } = props;
  const wearings = useAppSelector((state) => state.wearings.value);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const toast = (name: string, variant: VariantType = "error") => {
    enqueueSnackbar(`동일한 이름의 ${name}를 장착중입니다.`, { variant });
  };

  const onEquip = useCallback(() => {
    if (type === "earring1") {
      if (wearings.earring2.item?.Name === item.Name) {
        toast(wearings.earring2.codeName);
        return;
      }
    } else if (type === "earring2") {
      if (wearings.earring1.item?.Name === item.Name) {
        toast(wearings.earring1.codeName);
        return;
      }
    } else if (type === "ring1") {
      if (wearings.ring2.item?.Name === item.Name) {
        toast(wearings.ring2.codeName);
        return;
      }
    } else if (type === "ring2") {
      if (wearings.ring1.item?.Name === item.Name) {
        toast(wearings.ring1.codeName);
        return;
      }
    }
    dispatch(addOne({ type: type, item: item }));
    onClose();
  }, [item, dispatch]);

  return (
    <>
      <TableRow
        hover
        sx={{
          "& .MuiTableCell-root": { borderBottom: "unset" },
          height: "52.5px",
        }}
        onClick={() => setOpen((prevState) => !prevState)}
      >
        <TableCell sx={{ px: 1 }} align={"center"}>
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </TableCell>
        <TableCell sx={{ px: 0 }} component={"th"}>
          <ItemNameTypo item={item} fontSize={"inherit"} />
        </TableCell>
        <TableCell align={"center"}>
          {item.GradeQuality >= 0 ? (
            <Typography
              sx={{
                bgcolor: qualityColor(item.GradeQuality),
                borderRadius: "4px",
                color: "black",
              }}
            >
              {item.GradeQuality}
            </Typography>
          ) : (
            "-"
          )}
        </TableCell>
        <TableCell align={"center"}>
          {item.AuctionInfo?.BidStartPrice ?? "-"}
        </TableCell>
        <TableCell align={"center"}>
          {item.AuctionInfo?.BuyPrice ?? "-"}
        </TableCell>
        <TableCell align={"center"}>
          {item.AuctionInfo ? dayjs(item.AuctionInfo.EndDate).fromNow() : "-"}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout={"auto"} unmountOnExit>
            <List
              dense
              subheader={
                <DetailsListSubheader>아이템 세부정보</DetailsListSubheader>
              }
            >
              <AuctionItemInfoItem item={item} />
              <Grid container spacing={1} sx={{ pl: 9 }}>
                {item.Options.map((opt) => (
                  <Grid item key={_.uniqueId(`item-options`)}>
                    <Typography variant={"overline"}>
                      {`${opt.OptionName} ${opt.Value > 0 ? opt.Value : ""}`}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </List>
            <List
              dense
              subheader={<DetailsListSubheader>가격 정보</DetailsListSubheader>}
            >
              {item.AuctionInfo && (
                <AuctionItemAuctionInfoItems info={item.AuctionInfo} />
              )}
            </List>
            <Button fullWidth sx={{ mb: 1 }} onClick={onEquip}>
              장착
            </Button>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
