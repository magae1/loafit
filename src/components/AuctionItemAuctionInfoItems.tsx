import { TAuctionInfo } from "@/libs/types";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import GoldPriceLabel from "@/components/GoldPriceLabel";
import { PriceWrapper } from "@/components/styles";

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
          <GoldPriceLabel price={BidStartPrice} />
        </ListItemIcon>
      </ListItem>
      <ListItem>
        <ListItemText primary={"현 입찰가"} />
        <ListItemIcon>
          <GoldPriceLabel price={StartPrice} />
        </ListItemIcon>
      </ListItem>
      <ListItem>
        <ListItemText primary={"즉시 구매가"} />
        <ListItemIcon>
          <GoldPriceLabel price={BuyPrice} />
        </ListItemIcon>
      </ListItem>
      <ListItem>
        <ListItemText primary={"구매 시 남은 거래 가능 횟수"} />
        <ListItemIcon>{TradeAllowCount}회</ListItemIcon>
      </ListItem>
    </>
  );
}
