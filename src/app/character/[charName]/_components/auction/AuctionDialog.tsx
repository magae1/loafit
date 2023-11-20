"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Table,
  TableContainer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import useSWR, { Fetcher } from "swr";

import { useAppSelector } from "@/redux/store";
import {
  AUCTION_SORT_TYPES,
  ExpendedRequestItems,
  TAuction,
  TDetailRequestItems,
  TRequestAuctionItems,
  TRequestItems,
  TSearchDetailOption,
} from "@/libs/types";
import AuctionTable from "./AuctionTable";
import { useCallback, useState } from "react";
import { wearingType } from "@/redux/features/wearingsSlice";
import AuctionTablePagination from "@/app/character/[charName]/_components/auction/AuctionTablePagination";
import AuctionTableHead from "@/app/character/[charName]/_components/auction/AuctionTableHead";

const detailToNormal = (options: TDetailRequestItems): TRequestItems => ({
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
});

const fetcher: Fetcher<TAuction, TRequestAuctionItems> = (options) =>
  fetch(`/api/auctions`, {
    method: "post",
    body: JSON.stringify(options),
  }).then((res) => res.json());

interface Props {
  type: keyof wearingType;
}

export default function AuctionDialog(props: Props) {
  const { type } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const options = useAppSelector(
    (state) => state.wearings.value[type].searchOption,
  );
  const commonOption = useAppSelector((state) => state.auction.value);

  const detailOptions = detailToNormal({
    SkillOptions: options.SkillOptions,
    EtcOptions: options.EtcOptions,
  });
  const individualOptions = { ...options, ...detailOptions };

  const [open, setOpen] = useState(false);
  const [expendOptions, setExpendOptions] = useState<ExpendedRequestItems>({
    Sort: AUCTION_SORT_TYPES.BUY_PRICE,
    PageNo: 1,
    SortCondition: "ASC",
  });
  const { data, isLoading, isValidating, error } = useSWR<TAuction>(
    open ? { ...individualOptions, ...expendOptions, ...commonOption } : null,
    fetcher,
    { revalidateIfStale: false, revalidateOnFocus: false },
  );
  const onClose = useCallback(() => setOpen(false), []);
  const setPageNo = useCallback(
    (n: number) =>
      setExpendOptions((prevState) => ({ ...prevState, PageNo: n })),
    [],
  );
  const setSortOptions = useCallback((type: AUCTION_SORT_TYPES | null) => {
    if (!type) return;
    setExpendOptions((prevState) => {
      const newState = { ...prevState, PageNo: 1 };
      if (prevState.Sort === type) {
        newState.SortCondition =
          prevState.SortCondition === "ASC" ? "DESC" : "ASC";
      } else {
        newState.Sort = type;
      }
      return newState;
    });
  }, []);

  return (
    <>
      <Button startIcon={<Search />} onClick={() => setOpen(true)}>
        찾기
      </Button>
      <Dialog
        open={open}
        onClose={onClose}
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
          onClick={onClose}
        >
          <Close />
        </IconButton>
        <DialogTitle sx={{ py: 1 }}>경매장</DialogTitle>
        <TableContainer>
          <Table size={"small"}>
            <AuctionTableHead
              options={expendOptions}
              setSort={setSortOptions}
            />
            <AuctionTable
              type={type}
              data={data}
              onClose={onClose}
              isLoading={isLoading || isValidating}
            />
          </Table>
        </TableContainer>
        <DialogActions>
          <AuctionTablePagination
            PageNo={expendOptions.PageNo}
            changePageNo={(v) => setPageNo(v)}
            TotalCount={data?.TotalCount}
            loading={isLoading || isValidating}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
