import {
  Skeleton,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import _ from "underscore";

import AuctionTableRow from "./AuctionTableRow";
import { TAuction } from "@/libs/types";
import { wearingType } from "@/redux/features/wearingsSlice";

interface Props {
  data?: TAuction;
  type: keyof wearingType;
  isLoading: boolean;
  onClose: () => void;
}

export default function AuctionTable(props: Props) {
  const { data, type, isLoading, onClose } = props;

  if (!data) {
    if (isLoading) {
      return (
        <TableBody>
          {_.range(10).map(() => (
            <TableRow
              key={_.uniqueId("table-row-skeleton")}
              sx={{ height: "54.5px" }}
            >
              <TableCell sx={{ px: 1 }} align={"center"}>
                <KeyboardArrowDown />
              </TableCell>
              <TableCell sx={{ px: 0 }} component={"th"}>
                <Skeleton variant={"text"} width={185} />
              </TableCell>
              <TableCell align={"center"}>
                <Skeleton width={36} height={24} />
              </TableCell>
              <TableCell align={"center"}>
                <Skeleton variant={"text"} />
              </TableCell>
              <TableCell align={"center"}>
                <Skeleton variant={"text"} />
              </TableCell>
              <TableCell align={"center"}>
                <Skeleton variant={"text"} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      );
    }
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={6} sx={{ height: 525 }}>
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
            <TableCell colSpan={6} sx={{ height: 525 }}>
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
          <AuctionTableRow
            key={_.uniqueId("action-table-row")}
            type={type}
            item={item}
            onClose={onClose}
          />
        ))}
        <TableRow sx={{ height: 52.5 * (10 - data.Items.length) }} />
      </TableBody>
    );
  }
}
