"use client";
import Image from "next/image";
import { SyntheticEvent, useMemo } from "react";
import {
  List,
  ListItem,
  Grid,
  Rating,
  Typography,
  ListItemText,
  IconButton,
  Avatar,
  ListItemAvatar,
  ListSubheader,
} from "@mui/material";
import {
  RadioButtonChecked,
  RadioButtonUnchecked,
  RemoveCircle,
  AddCircleOutlined,
} from "@mui/icons-material";
import { red, blue } from "@mui/material/colors";
import _ from "underscore";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/redux/store";
import { TActiveEngravingEffect } from "@/libs/types";
import { changeEngValue } from "@/redux/features/stoneSlice";

interface Props {
  option: TActiveEngravingEffect;
  onChangeValue: (
    e: SyntheticEvent<Element, Event>,
    value: number | null,
  ) => void;
}

function EngravingOptionItem(props: Props) {
  const { Name, Value, IsPenalty } = props.option;

  return (
    <ListItem>
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
  const stone = useAppSelector((state) => state.abilityStone.value);
  const dispatch = useDispatch();

  const StoneStates = useMemo(() => {
    if (_.isEmpty(stone.currentEffects)) {
      return null;
    }
    return stone.currentEffects.map((v, i) => (
      <EngravingOptionItem
        key={_.uniqueId("stone-engraving-rate-item")}
        option={v}
        onChangeValue={(e, value) => {
          dispatch(changeEngValue({ index: i, value: value }));
        }}
      />
    ));
  }, [stone]);

  return (
    <List>
      <ListItem
        secondaryAction={
          <IconButton>
            {stone.item ? <RemoveCircle /> : <AddCircleOutlined />}
          </IconButton>
        }
        sx={{ minHeight: "68px" }}
      >
        <ListItemAvatar>
          <Avatar>
            {stone.item ? (
              <Image
                fill
                unoptimized
                src={stone.item.Icon}
                alt={`${stone.item.Name} 아이콘`}
              />
            ) : null}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            stone.item ? `[${stone.item.Grade}] ${stone.item.Name}` : undefined
          }
          secondary={
            stone.item ? undefined : "장착 중인 어빌리티 스톤이 없습니다."
          }
        />
      </ListItem>
      <List dense>{StoneStates}</List>
    </List>
  );
}
