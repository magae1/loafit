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
  ListItemIcon,
} from "@mui/material";
import { ArrowForward, Delete, History } from "@mui/icons-material";
import _ from "underscore";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/redux/store";
import OptionChip from "@/components/OptionChip";
import AuctionItemAvatar from "@/components/AuctionItemAvatar";
import ItemNameTypo from "@/components/ItemNameTypo";
import AuctionItemInfoItem from "@/components/AuctionItemInfoItem";
import AuctionItemAuctionInfoItems from "@/components/AuctionItemAuctionInfoItems";
import ListSectionWrapper from "./ListSectionWrapper";
import SearchOptionsItem from "./SearchOptionsItem";
import { DetailsListSubheader } from "@/components/styles";
import {
  removeOne,
  restoreOne,
  wearingType,
} from "@/redux/features/wearingsSlice";
import { JEWELRY_TYPES } from "@/libs/types";
import AuctionDialog from "@/app/character/[charName]/_components/auction/AuctionDialog";
import { useMemo } from "react";

interface Props {
  type: keyof wearingType;
  codeName: JEWELRY_TYPES;
}

export default function JewelryListItem(props: Props) {
  const { type, codeName } = props;
  const dispatch = useDispatch();
  const jewelry = useAppSelector((state) => state.wearings.value[type]);

  const optionList = useMemo(() => {
    const { ItemTier, ItemGrade, ItemGradeQuality, EtcOptions } =
      jewelry.searchOption;
    return [
      `${ItemTier}티어`,
      ItemGrade && `${ItemGrade}`,
      ItemGradeQuality && `품질 ${ItemGradeQuality}이상`,
    ];
  }, [dispatch, jewelry]);

  const etcOptionList = useMemo(
    () =>
      jewelry.searchOption.EtcOptions.map(
        (opt) =>
          `${opt.EtcSub.Text} ${opt.MinValue ?? ""}~${opt.MaxValue ?? ""}`,
      ),
    [jewelry.searchOption.EtcOptions],
  );

  return (
    <>
      <ListSectionWrapper
        open={false}
        item={
          jewelry.item ? (
            <>
              <ListItemAvatar>
                <AuctionItemAvatar item={jewelry.item} />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={<ItemNameTypo item={jewelry.item} />}
                secondary={
                  <Stack
                    spacing={0.5}
                    direction={"row"}
                    useFlexGap
                    flexWrap={"wrap"}
                  >
                    {jewelry.item.Options.map((v) => (
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
                <Avatar>{codeName[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText secondary={`장착 중인 ${codeName}가 없습니다.`} />
            </>
          )
        }
      >
        <List
          subheader={
            <DetailsListSubheader>아이템 세부정보</DetailsListSubheader>
          }
        >
          {jewelry.item ? (
            <>
              <AuctionItemInfoItem item={jewelry.item} />
              <Grid container spacing={1} sx={{ pl: 9 }}>
                {jewelry.item.Options.map((opt) => (
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
              jewelry.updatedAt ? `[${dayjs(jewelry.updatedAt).fromNow()}]` : ""
            }`}</DetailsListSubheader>
          }
        >
          {jewelry.item && jewelry.item.AuctionInfo ? (
            <AuctionItemAuctionInfoItems info={jewelry.item.AuctionInfo} />
          ) : (
            <ListItem>
              <ListItemText primary={"가격 정보를 찾을 수 없습니다."} />
            </ListItem>
          )}
        </List>
        <List
          dense
          subheader={<DetailsListSubheader>아이템 찾기</DetailsListSubheader>}
        >
          <SearchOptionsItem type={type}>
            <ListItemText
              primary={etcOptionList.join(", ")}
              secondary={_.compact(optionList).join(", ")}
            />
            <ListItemIcon>
              <ArrowForward />
            </ListItemIcon>
          </SearchOptionsItem>
        </List>
        <ListItem>
          <Stack direction={"row"} spacing={1}>
            <IconButton
              disabled={!jewelry.prevItem}
              onClick={() => dispatch(restoreOne(type))}
            >
              <History />
            </IconButton>
            <IconButton
              disabled={!jewelry.item}
              onClick={() => dispatch(removeOne(type))}
            >
              <Delete />
            </IconButton>
            <AuctionDialog type={type} />
          </Stack>
        </ListItem>
      </ListSectionWrapper>
    </>
  );
}
