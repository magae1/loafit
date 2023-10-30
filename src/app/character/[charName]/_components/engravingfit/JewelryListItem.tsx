"use client";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import {
  ListItem,
  IconButton,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import { RemoveCircle, AddCircleOutlined, Restore } from "@mui/icons-material";
import _ from "underscore";
import { useDispatch } from "react-redux";

import QualityLabel from "@/components/QualityLabel";
import { wearingType } from "@/libs/types";
import { useAppSelector } from "@/redux/store";
import { removeOne, restoreOne } from "@/redux/features/jewelriesSlice";
import FittingListItem from "@/components/FittingListItem";

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

  const onClickSecondary = useCallback(() => {
    if (currJewelry.item) {
      dispatch(removeOne(type));
    }
  }, [dispatch, currJewelry]);

  const avatar = useMemo(() => {
    if (currJewelry.item) {
      return (
        <>
          <div style={{ position: "absolute", left: -5, top: -5 }}>
            <QualityLabel value={currJewelry.item.GradeQuality} />
          </div>
          <Avatar sx={{ bgcolor: "inherit" }}>
            <Image
              src={currJewelry.item.Icon}
              alt={`${currJewelry.item.Name} 아이콘`}
              unoptimized
              fill={true}
            />
          </Avatar>
        </>
      );
    }
    if (prevJewelry.item) {
      return (
        <Avatar>
          <IconButton
            onClick={() => {
              dispatch(restoreOne(type));
            }}
          >
            <Restore />
          </IconButton>
        </Avatar>
      );
    }
    return <Avatar>{currJewelry.codeName[0]}</Avatar>;
  }, [currJewelry, prevJewelry]);

  const isWearing = !!currJewelry.item;
  const hasPrevItem = !isWearing && !!prevJewelry.item;

  return (
    <FittingListItem
      is_none={!isWearing ? "yes" : null}
      onClick={onClickSecondary}
      sx={{ minHeight: "68px" }}
    >
      <ListItemAvatar sx={{ position: "relative" }}>{avatar}</ListItemAvatar>
      <ListItemText
        disableTypography={!!currJewelry.item}
        primary={
          isWearing && (
            <Typography>
              {currJewelry.item
                ? `[${currJewelry.item.Grade}] ${currJewelry.item.Name}`
                : currJewelry.codeName}
            </Typography>
          )
        }
        secondary={
          isWearing ? (
            <Stack
              spacing={{ xs: 0, sm: 1 }}
              direction={"row"}
              useFlexGap
              flexWrap={"wrap"}
            >
              {currJewelry.item?.Options.map((v) => (
                <Chip
                  key={_.uniqueId("jewelry-options")}
                  size={"small"}
                  label={`${v.OptionName} ${v.Value}`}
                />
              ))}
            </Stack>
          ) : (
            <Typography>
              장착 중인 {currJewelry.codeName}가 없습니다.
            </Typography>
          )
        }
      />
    </FittingListItem>
  );
}
