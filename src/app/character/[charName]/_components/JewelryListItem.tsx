import Image from "next/image";
import {
  ListItem,
  IconButton,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Delete, Folder } from "@mui/icons-material";

import { TJewelry } from "@/app/_libs/types";

interface Props {
  jewelryData: TJewelry;
}

enum WEARING_JEWELRY_TYPES {
  Bracelet = "팔찌",
  Earring1 = "귀걸이1",
  Earring2 = "귀걸이2",
  Ring1 = "반지1",
  Ring2 = "반지2",
  Necklace = "목걸이",
}

export default function JewelryListItem(props: Props) {
  const { type, item } = props.jewelryData;

  const effects = item?.Options.map((v) => `${v.OptionName}: ${v.Value}`).join(
    ", "
  );

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <Delete />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "inherit" }}>
          {item ? (
            <Image src={item.Icon} alt={`${item.Name} 아이콘`} fill={true} />
          ) : (
            <Folder />
          )}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <Typography noWrap={true}>
            {item ? `[${item.Grade}] ${item.Name}` : type}
          </Typography>
        }
        secondary={effects}
      />
    </ListItem>
  );
}
