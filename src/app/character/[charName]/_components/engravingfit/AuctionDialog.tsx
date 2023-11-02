"use client";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
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

import { useAppSelector } from "@/redux/store";
import { closeAuction } from "@/redux/features/auctionSlice";
import AuctionSearchInputs from "@/components/AuctionSearchInputs";

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
      aria-labelledby={"경매장 검색 모달"}
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
      <DialogContent>
        <TableContainer>
          <Table size={"small"}>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  Country
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  Details
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <DialogContentText>
          You can set my maximum width and whether to adapt or not.
        </DialogContentText>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "fit-content",
          }}
        >
          <AuctionSearchInputs />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
