"use client";
import { useState } from "react";
import {
  TableRow,
  TableCell,
  Collapse,
  Typography,
  Stack,
  ListItem,
  List,
  Grid,
} from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import _ from "underscore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.locale("ko");
dayjs.extend(relativeTime);

import { TAuctionItem } from "@/libs/types";
import OptionChip from "@/components/OptionChip";
import { qualityColor } from "@/libs/game-color";
import AuctionItemAuctionInfoItems from "@/components/AuctionItemAuctionInfoItems";
import ItemNameTypo from "@/components/ItemNameTypo";
import AuctionItemInfoItem from "@/components/AuctionItemInfoItem";
import { DetailsListSubheader } from "@/components/styles";
import EquipmentDialog from "@/app/character/[charName]/_components/auction/EquipmentsDialog";

interface Props {
  item: TAuctionItem;
}

export default function AuctionTableRow(props: Props) {
  const { item } = props;

  const [open, setOpen] = useState(false);

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
            {item.Options.map((v) => (
              <OptionChip key={_.uniqueId("auction-item-options")} option={v} />
            ))}
          </Stack>
        </TableCell>
        <TableCell align={"center"}>
          {item.GradeQuality ? (
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
          {item.AuctionInfo?.StartPrice ?? "-"}
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
            <ListItem>
              <EquipmentDialog auctionItem={item} />
            </ListItem>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
