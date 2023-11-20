import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import _ from "underscore";

import { AUCTION_SORT_TYPES, ExpendedRequestItems } from "@/libs/types";

type HeadType = {
  label: string;
  sortType: AUCTION_SORT_TYPES | null;
  align: "center" | "left";
  colSpan?: number;
};

const Heads: HeadType[] = [
  { label: "아이템 정보", sortType: null, align: "center", colSpan: 2 },
  { label: "품질", sortType: AUCTION_SORT_TYPES.ITEM_QUALITY, align: "center" },
  {
    label: "입찰가",
    sortType: AUCTION_SORT_TYPES.BIDSTART_PRICE,
    align: "center",
  },
  { label: "즉구가", sortType: AUCTION_SORT_TYPES.BUY_PRICE, align: "center" },
  {
    label: "마감시간",
    sortType: AUCTION_SORT_TYPES.EXPIREDATE,
    align: "center",
  },
];

interface Props {
  options: ExpendedRequestItems;
  setSort: (type: AUCTION_SORT_TYPES | null) => void;
}

export default function AuctionTableHead(props: Props) {
  const { options, setSort } = props;
  return (
    <TableHead>
      <TableRow>
        {Heads.map((h) => (
          <TableCell
            key={_.uniqueId("auction-table-heads")}
            colSpan={h.colSpan}
            align={h.align}
            padding={"normal"}
          >
            {h.sortType ? (
              <TableSortLabel
                onClick={() => setSort(h.sortType)}
                active={options.Sort === h.sortType}
                direction={options.SortCondition === "ASC" ? "asc" : "desc"}
              >
                {h.label}
                {options.Sort === h.sortType ? (
                  <Box component="span" sx={visuallyHidden}>
                    {options.SortCondition === "ASC"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              h.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
