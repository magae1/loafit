"use client";
import {
  Skeleton,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import _ from "underscore";
import useSWR from "swr";

import AuctionTableRow from "./AuctionTableRow";
import { useAppSelector } from "@/redux/store";
import { TAuction } from "@/libs/types";

export default function AuctionTable() {
  const options = useAppSelector((state) => state.auction.value.options);
  const { data, isLoading, isValidating, error } = useSWR<TAuction>(options);

  if (!data) {
    if (isLoading || isValidating) {
      return _.range(10).map(() => (
        <TableRow key={_.uniqueId("table-row-skeleton")}>
          <TableCell sx={{ px: 1 }} />
          <TableCell sx={{ px: 0 }}>
            <Skeleton width={225} height={45} />
          </TableCell>
          <TableCell>
            <Skeleton height={36} />
          </TableCell>
          <TableCell>
            <Skeleton variant={"text"} />
          </TableCell>
          <TableCell>
            <Skeleton variant={"text"} />
          </TableCell>
          <TableCell>
            <Skeleton variant={"text"} />
          </TableCell>
        </TableRow>
      ));
    }
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={6} sx={{ height: 570 }}>
            <Typography textAlign={"center"}>잘못된 요청입니다.</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  } else {
    if (!data.Items) {
      return (
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} sx={{ height: 570 }}>
              <Typography textAlign={"center"}>
                해당하는 아이템이 없습니다.
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }
    return (
      <TableBody>
        {data.Items.map((item) => (
          <AuctionTableRow key={_.uniqueId("action-table-row")} item={item} />
        ))}
        <TableRow sx={{ height: 57 * (10 - data.Items.length) }} />
      </TableBody>
    );
  }
}
