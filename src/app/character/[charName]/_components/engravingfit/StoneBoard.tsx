"use client";
import { SyntheticEvent, useMemo } from "react";
import {
  List,
  ListItem,
  Grid,
  Rating,
  Typography,
  ListItemText,
  ListSubheader,
  Stack,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import {
  ArrowForward,
  Delete,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { red, blue } from "@mui/material/colors";
import _ from "underscore";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/redux/store";
import { TActiveEngraving } from "@/libs/types";
import { changeEngValue, removeOne } from "@/redux/features/wearingsSlice";
import ListSectionWrapper from "@/app/character/[charName]/_components/engravingfit/ListSectionWrapper";
import ItemNameTypo from "@/components/ItemNameTypo";
import AuctionItemInfoItem from "@/components/AuctionItemInfoItem";
import AuctionDialog from "@/app/character/[charName]/_components/auction/AuctionDialog";
import { DetailsListSubheader } from "@/components/styles";
import SearchOptionsItem from "./SearchOptionsItem";
import AuctionItemAuctionInfoItems from "@/components/AuctionItemAuctionInfoItems";

interface Props {
  option: TActiveEngraving;
  onChangeValue: (
    e: SyntheticEvent<Element, Event>,
    value: number | null,
  ) => void;
}

function EngravingOptionItem(props: Props) {
  const { Name, Value, IsPenalty } = props.option;

  return (
    <ListItem sx={{ pr: 3 }}>
      <Grid container>
        <Grid item xs>
          <Typography>{Name}</Typography>
          <Typography variant={"caption"}>
            활성 포인트: <strong>{Value}</strong>
          </Typography>
        </Grid>
        <Grid item xs={"auto"}>
          <Rating
            name={Name}
            value={Value}
            max={10}
            onChange={props.onChangeValue}
            sx={{
              "& .MuiRating-icon": { color: IsPenalty ? red[500] : blue[500] },
            }}
            icon={<RadioButtonChecked fontSize={"inherit"} />}
            emptyIcon={<RadioButtonUnchecked fontSize={"inherit"} />}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default function StoneBoard() {
  const { item, engravings, codeName, updatedAt, searchOption } =
    useAppSelector((state) => state.wearings.value.stone);
  const dispatch = useDispatch();

  const optionList = useMemo(() => {
    const { ItemTier, ItemGrade, ItemGradeQuality } = searchOption;
    return [
      `${ItemTier}티어`,
      ItemGrade && `${ItemGrade}`,
      ItemGradeQuality && `품질 ${ItemGradeQuality}이상`,
    ];
  }, [dispatch, searchOption]);

  const etcOptionList = useMemo(
    () =>
      searchOption.EtcOptions.map(
        (opt) =>
          `${opt.EtcSub.Text} ${opt.MinValue ?? ""}~${opt.MaxValue ?? ""}`,
      ),
    [searchOption.EtcOptions],
  );

  const StoneStates = useMemo(() => {
    if (_.isEmpty(item)) {
      return null;
    }
    return engravings.map((v, i) => (
      <EngravingOptionItem
        key={_.uniqueId("stone-engraving-rate-item")}
        option={v}
        onChangeValue={(e, value) => {
          dispatch(changeEngValue({ index: i, value: value }));
        }}
      />
    ));
  }, [item, engravings, dispatch]);

  return (
    <>
      <List disablePadding>
        <ListSectionWrapper
          open={false}
          item={
            item ? (
              <ListItemText primary={<ItemNameTypo item={item} />} />
            ) : (
              <ListItemText secondary={"장착 중인 어빌리티 스톤이 없습니다."} />
            )
          }
        >
          <List
            dense
            subheader={
              <ListSubheader sx={{ lineHeight: "24px" }}>
                아이템 세부정보
              </ListSubheader>
            }
          >
            {item ? (
              <>
                <AuctionItemInfoItem item={item} />
                <Grid container spacing={1} sx={{ pl: 9 }}>
                  {item.Options.map((opt) => (
                    <Grid item key={_.uniqueId(`item-options`)}>
                      <Typography variant={"overline"}>
                        {opt.OptionName}
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
              <ListSubheader sx={{ lineHeight: "24px" }}>
                가격 정보
              </ListSubheader>
            }
          >
            {item && item.AuctionInfo ? (
              <AuctionItemAuctionInfoItems info={item.AuctionInfo} />
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
            <SearchOptionsItem type={"stone"}>
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
                disabled={!item}
                onClick={() => dispatch(removeOne("stone"))}
              >
                <Delete />
              </IconButton>
              <AuctionDialog type={"stone"} />
            </Stack>
          </ListItem>
        </ListSectionWrapper>
      </List>
      <List disablePadding sx={{ pl: 2 }}>
        {StoneStates}
      </List>
    </>
  );
}
