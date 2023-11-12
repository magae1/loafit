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
import { auctionOptions } from "@/libs/data";
import { TAuction, TRequestAuctionItems } from "@/libs/types";
import ItemTiersInput from "@/components/auctioninputs/ItemTiersInput";
import ItemGradeQualityInput from "@/components/auctioninputs/ItemGradeQualityInput";
import ItemGradeInput from "@/components/auctioninputs/ItemGradeInput";
import AuctionTable from "./AuctionTable";
import AuctionTablePagination from "./AuctionTablePagination";

const fetcher: Fetcher<TAuction, TRequestAuctionItems> = (options) =>
  fetch(`/api/auctions`, {
    method: "post",
    body: JSON.stringify(options),
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
        <DialogActions>
          <ItemGradeInput options={auctionOptions.ItemGrades} />
          <ItemGradeQualityInput options={auctionOptions.ItemGradeQualities} />
          <ItemTiersInput options={auctionOptions.ItemTiers} />
        </DialogActions>
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
