"use client";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { SWRConfig, Fetcher } from "swr";

import { useAppSelector } from "@/redux/store";
import { closeAuction } from "@/redux/features/auctionSlice";
import {
  TAuction,
  TDetailRequestAuctionItems,
  TRequestAuctionItems,
  TSearchDetailOption,
} from "@/libs/types";
import AuctionTable from "./AuctionTable";
import AuctionTablePagination from "./AuctionTablePagination";
import AuctionTableOptionInputs from "./AuctionTableOptionInputs";
import { useState } from "react";

const detailToNormal = (
  options: TDetailRequestAuctionItems,
): TRequestAuctionItems => ({
  ItemLevelMin: options.ItemLevelMin,
  ItemLevelMax: options.ItemLevelMax,
  ItemGradeQuality: options.ItemGradeQuality,
  SkillOptions: options.SkillOptions.map(
    (opt): TSearchDetailOption => ({
      FirstOption: opt.Value,
      SecondOption: opt.Tripod ? opt.Tripod.Value : null,
      MinValue: opt.MinValue,
      MaxValue: opt.MaxValue,
    }),
  ),
  EtcOptions: options.EtcOptions.map(
    (opt): TSearchDetailOption => ({
      FirstOption: opt.Value,
      SecondOption: opt.EtcSub ? opt.EtcSub.Value : null,
      MinValue: opt.MinValue,
      MaxValue: opt.MaxValue,
    }),
  ),
  Sort: options.Sort,
  CategoryCode: options.Category ? options.Category.Code : null,
  CharacterClass: options.CharacterClass,
  ItemTier: options.ItemTier,
  ItemGrade: options.ItemGrade,
  ItemName: options.ItemName,
  PageNo: options.PageNo,
  SortCondition: options.SortCondition,
});

const fetcher: Fetcher<TAuction, TDetailRequestAuctionItems> = (options) =>
  fetch(`/api/auctions`, {
    method: "post",
    body: JSON.stringify(detailToNormal(options)),
  }).then((res) => res.json());

export default function AuctionDialog() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const open = useAppSelector((state) => state.auction.value.open);

  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        fetcher: fetcher,
      }}
    >
      <Dialog
        open={open}
        onClose={() => {
          dispatch(closeAuction());
        }}
        fullWidth={matches}
        fullScreen={!matches}
        maxWidth={"sm"}
        aria-labelledby={"경매장 검색 결과 모달"}
      >
        <IconButton
          aria-label={"닫기"}
          sx={{
            position: "absolute",
            right: 0,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={() => {
            dispatch(closeAuction());
          }}
        >
          <Close />
        </IconButton>
        <DialogTitle sx={{ py: 1 }}>경매장</DialogTitle>
        <AuctionTableOptionInputs />
        <TableContainer>
          <Table size={"small"}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align={"center"}>아이템 정보</TableCell>
                <TableCell align={"center"}>품질</TableCell>
                <TableCell align={"center"}>입찰가</TableCell>
                <TableCell align={"center"}>즉구가</TableCell>
                <TableCell align={"center"}>마감</TableCell>
              </TableRow>
            </TableHead>
            <AuctionTable />
          </Table>
        </TableContainer>
        <DialogActions>
          <AuctionTablePagination />
        </DialogActions>
      </Dialog>
    </SWRConfig>
  );
}
