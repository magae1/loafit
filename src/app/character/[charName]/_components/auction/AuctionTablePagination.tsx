"use client";
import { IconButton, Typography } from "@mui/material";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";
import useSWR from "swr";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/redux/store";
import { changePageNo } from "@/redux/features/auctionSlice";
import { TAuction } from "@/libs/types";

export default function AuctionTablePagination() {
  const dispatch = useDispatch();
  const options = useAppSelector((state) => state.auction.value.options);
  const { data, isLoading, isValidating } = useSWR<TAuction>(options);

  const loading = !data || isLoading || isValidating;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <IconButton
        onClick={() => {
          dispatch(changePageNo(1));
        }}
        disabled={options.PageNo === 1 || loading}
        aria-label={"첫 페이지"}
      >
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={() => {
          dispatch(changePageNo(options.PageNo - 1));
        }}
        disabled={options.PageNo === 1 || loading}
        aria-label={"이전 페이지"}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <Typography variant={"button"}>{options.PageNo}</Typography>
      <IconButton
        onClick={() => {
          dispatch(changePageNo(options.PageNo + 1));
        }}
        disabled={
          !data || data.PageNo >= Math.floor(data.TotalCount / 10) || loading
        }
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={() => {
          data && dispatch(changePageNo(Math.floor(data.TotalCount / 10)));
        }}
        disabled={
          !data || data.PageNo >= Math.floor(data.TotalCount / 10) || loading
        }
        aria-label={"마지막 페이지"}
      >
        <LastPage />
      </IconButton>
    </div>
  );
}
