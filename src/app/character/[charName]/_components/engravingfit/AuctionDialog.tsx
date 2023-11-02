"use client";
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/redux/store";
import { changeItemTier, closeAuction } from "@/redux/features/auctionSlice";
import { auctionOptions } from "@/libs/data";

export default function AuctionDialog() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useDispatch();
  const { open, options } = useAppSelector((state) => state.auction.value);

  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch(closeAuction());
      }}
      fullWidth={matches}
      fullScreen={!matches}
      maxWidth={"md"}
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
        <Autocomplete
          sx={{ width: "80px" }}
          value={options.ItemTier}
          onChange={(_, newValue) => dispatch(changeItemTier(newValue))}
          options={auctionOptions.ItemTiers}
          disableClearable
          getOptionLabel={(option) => `티어 ${option}`}
          renderInput={(params) => (
            <TextField {...params} variant={"standard"} size={"small"} />
          )}
        />
      </DialogActions>
      <TableContainer>
        <Table size={"small"}>
          <TableHead>
            <TableRow>
              <TableCell align={"center"} colSpan={2}>
                아이템 정보
              </TableCell>
              <TableCell align={"center"} colSpan={2}>
                가격 정보
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">이름</TableCell>
              <TableCell align="center">품질</TableCell>
              <TableCell align="center">경매가</TableCell>
              <TableCell align="center">즉시 구매가</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Dialog>
  );
}
