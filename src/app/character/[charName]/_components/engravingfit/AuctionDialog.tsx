"use client";
import { MouseEvent } from "react";
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
  Paper,
  TablePagination,
  TableFooter,
  Box,
  Typography,
} from "@mui/material";
import {
  Close,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import useSWR, { Fetcher } from "swr";

import { useAppSelector } from "@/redux/store";
import { changePageNo, closeAuction } from "@/redux/features/auctionSlice";
import { auctionOptions } from "@/libs/data";
import { TAuction, TRequestAuctionItems } from "@/libs/types";
import AuctionResultBody from "@/app/character/[charName]/_components/engravingfit/AuctionResultsBody";
import ItemTiersInput from "@/components/auctioninputs/ItemTiersInput";
import ItemGradeQualityInput from "@/components/auctioninputs/ItemGradeQualityInput";
import ItemGradeInput from "@/components/auctioninputs/ItemGradeInput";

const fetcher: Fetcher<TAuction, TRequestAuctionItems> = (options) =>
  fetch(`/api/auctions`, {
    method: "post",
    body: JSON.stringify(options),
  }).then((res) => res.json());

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

export default function AuctionDialog() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const dispatch = useDispatch();
  const { open, options } = useAppSelector((state) => state.auction.value);
  const { data, error } = useSWR(open ? options : null, fetcher);

  const isOk = data && !error;

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
        <ItemGradeInput options={auctionOptions.ItemGrades} />
        <ItemGradeQualityInput options={auctionOptions.ItemGradeQualities} />
        <ItemTiersInput options={auctionOptions.ItemTiers} />
      </DialogActions>
      <TableContainer>
        <Table size={"small"}>
          <TableHead>
            <TableRow>
              <TableCell align={"center"}>아이템</TableCell>
              <TableCell align={"center"}>품질</TableCell>
              <TableCell align={"center"}>경매가</TableCell>
              <TableCell align={"center"}>즉시 구매가</TableCell>
            </TableRow>
          </TableHead>
          {isOk && !!data.Items ? (
            <AuctionResultBody items={data.Items} />
          ) : (
            <Typography sx={{ height: `${680}px` }}>
              아이템이 없습니다.
            </Typography>
          )}
          <TableFooter>
            <TableRow>
              {data && (
                <TablePagination
                  rowsPerPageOptions={[10]}
                  component={"div"}
                  count={data.TotalCount}
                  rowsPerPage={data.PageSize}
                  page={data.PageNo - 1}
                  onPageChange={(_, newValue) => {
                    dispatch(changePageNo(newValue + 1));
                  }}
                  ActionsComponent={TablePaginationActions}
                />
              )}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Dialog>
  );
}
