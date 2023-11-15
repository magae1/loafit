import { TAuctionInfo } from "@/libs/types";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import dayjs from "dayjs";

import GoldPriceLabel from "@/components/GoldPriceLabel";

interface Props {
  info: TAuctionInfo;
}

export default function AuctionItemAuctionInfoItems(props: Props) {
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
    <>
      <ListItem>
        <ListItemText primary={"시작 입찰가"} />
        <ListItemIcon>
          <GoldPriceLabel price={StartPrice} />
        </ListItemIcon>
      </ListItem>
      <ListItem>
        <ListItemText primary={"현 입찰가"} />
        <ListItemIcon>
          <GoldPriceLabel price={BidStartPrice} />
        </ListItemIcon>
      </ListItem>
      <ListItem>
        <ListItemText primary={"즉시 구매가"} />
        <ListItemIcon>
          <GoldPriceLabel price={BuyPrice} />
        </ListItemIcon>
      </ListItem>
      <ListItem>
        <ListItemText primary={"입찰 횟수"} />
        <ListItemIcon>{BidCount}회</ListItemIcon>
      </ListItem>
      <ListItem>
        <ListItemText primary={"마감 일시"} />
        <ListItemIcon>{dayjs(EndDate).format("YY.MM.DD A hh:mm")}</ListItemIcon>
      </ListItem>
      <ListItem>
        <ListItemText primary={"구매 시 남은 거래 가능 횟수"} />
        <ListItemIcon>{TradeAllowCount}회</ListItemIcon>
      </ListItem>
    </>
  );
}
