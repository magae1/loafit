import { TAuctionInfo } from "@/libs/types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

interface Props {
  info: TAuctionInfo;
}

export default function AuctionInfoTable(props: Props) {
  const {
    StartPrice,
    BuyPrice,
    BidPrice,
    EndDate,
    BidCount,
    BidStartPrice,
    IsCompetitive,
    TradeAllowCount,
  } = props.info;

  return (
    <TableContainer component={Paper}>
      <Table size={"small"}>
        <TableBody>
          <TableRow>
            <TableCell>시작 입찰가</TableCell>
            <TableCell align={"right"}>{StartPrice}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>최고 입찰가</TableCell>
            <TableCell align={"right"}>{BidPrice}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>최소 입찰가</TableCell>
            <TableCell align={"right"}>{BidStartPrice}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>입찰 횟수</TableCell>
            <TableCell align={"right"}>{BidCount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>즉시 구매가</TableCell>
            <TableCell align={"right"}>{BuyPrice}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>남은 거래 가능횟수</TableCell>
            <TableCell align={"right"}>{TradeAllowCount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
