"use client";
import {
  ListItemText,
  ListItemAvatar,
  Stack,
  Avatar,
  List,
  ListItem,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete, History } from "@mui/icons-material";
import _ from "underscore";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";

import { wearingType } from "@/libs/types";
import { useAppSelector } from "@/redux/store";
import OptionChip from "@/components/OptionChip";
import AuctionItemAvatar from "@/components/AuctionItemAvatar";
import ItemNameTypo from "@/components/ItemNameTypo";
import ListSectionWrapper from "./ListSectionWrapper";
import AuctionItemInfoItem from "@/components/AuctionItemInfoItem";
import AuctionItemAuctionInfoItems from "@/components/AuctionItemAuctionInfoItems";
import { removeOne, restoreOne } from "@/redux/features/jewelriesSlice";
import { DetailsListSubheader } from "@/components/styles";

interface Props {
  type: keyof wearingType;
}

export default function JewelryListItem(props: Props) {
  const { type } = props;
  const dispatch = useDispatch();
  const currJewelry = useAppSelector(
    (state) => state.jewelries.value.curr[type],
  );
  const prevJewelry = useAppSelector(
    (state) => state.jewelries.value.prev[type],
  );

  return (
    <>
      <ListSectionWrapper
        open={false}
        item={
          currJewelry.item ? (
            <>
              <ListItemAvatar>
                <AuctionItemAvatar item={currJewelry.item} />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={<ItemNameTypo item={currJewelry.item} />}
                secondary={
                  <Stack
                    spacing={0.5}
                    direction={"row"}
                    useFlexGap
                    flexWrap={"wrap"}
                  >
                    {currJewelry.item.Options.map((v) => (
                      <OptionChip
                        option={v}
                        key={_.uniqueId("jewelry-options")}
                      />
                    ))}
                  </Stack>
                }
              />
            </>
          ) : (
            <>
              <ListItemAvatar>
                <Avatar>{currJewelry.codeName[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                secondary={`장착 중인 ${currJewelry.codeName}가 없습니다.`}
              />
            </>
          )
        }
      >
        <List
          dense
          subheader={
            <DetailsListSubheader>아이템 세부정보</DetailsListSubheader>
          }
        >
          {currJewelry.item ? (
            <>
              <AuctionItemInfoItem item={currJewelry.item} />
              <Grid container spacing={1} sx={{ pl: 9 }}>
                {currJewelry.item.Options.map((opt) => (
                  <Grid item key={_.uniqueId(`item-options`)}>
                    <Typography variant={"overline"}>
                      {`${opt.OptionName} ${opt.Value > 0 ? opt.Value : ""}`}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <ListItem>
              <ListItemText primary={"아이템 정보를 찾을 수 없습니다."} />
            </ListItem>
          )}
        </List>
        <List
          dense
          subheader={
            <DetailsListSubheader>{`가격 정보 ${
              currJewelry.updatedAt
                ? `[${dayjs(currJewelry.updatedAt).fromNow()}]`
                : ""
            }`}</DetailsListSubheader>
          }
        >
          {currJewelry.item && currJewelry.item.AuctionInfo ? (
            <AuctionItemAuctionInfoItems info={currJewelry.item.AuctionInfo} />
          ) : (
            <ListItem>
              <ListItemText primary={"가격 정보를 찾을 수 없습니다."} />
            </ListItem>
          )}
        </List>
        <ListItem>
          <Stack direction={"row"} spacing={1}>
            <IconButton
              disabled={!prevJewelry.item}
              onClick={() => dispatch(restoreOne(type))}
            >
              <History />
            </IconButton>
            <IconButton
              disabled={!currJewelry.item}
              onClick={() => dispatch(removeOne(type))}
            >
              <Delete />
            </IconButton>
          </Stack>
        </ListItem>
      </ListSectionWrapper>
    </>
  );
}
