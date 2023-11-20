"use client";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { yellow } from "@mui/material/colors";
import _ from "underscore";

import { useAppSelector } from "@/redux/store";
import { CustomLabel } from "@/components/styles";
import GoldPriceLabel from "@/components/GoldPriceLabel";

export default function GoldBoard() {
  const jewelries = useAppSelector((state) => state.wearings.value);

  const goldList = _.chain(jewelries)
    .values()
    .map((v) => v.item?.AuctionInfo)
    .compact()
    .value();

  return (
    <div>
      <CustomLabel sx={{ borderColor: yellow[500] }}>총 소요 골드</CustomLabel>
      <List dense>
        <ListItem disablePadding sx={{ ml: 1 }}>
          <ListItemText primary={"총 입찰가"} />
          <ListItemIcon>
            <GoldPriceLabel
              price={goldList.reduce(
                (previousValue, currentValue) =>
                  previousValue + currentValue.BidStartPrice,
                0,
              )}
            />
          </ListItemIcon>
        </ListItem>
        <ListItem disablePadding sx={{ ml: 1 }}>
          <ListItemText primary={"총 즉시 구매가"} />
          <ListItemIcon>
            <GoldPriceLabel
              price={goldList.reduce(
                (previousValue, currentValue) =>
                  previousValue + currentValue.BuyPrice,
                0,
              )}
            />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );
}
