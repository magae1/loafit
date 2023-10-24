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

import { TJewelry } from "@/libs/types";

interface Props {
  jewelryData: TJewelry;
}

export default function JewelryListItem(props: Props) {
  const { codeName, item } = props.jewelryData;

  const effects = item?.Options.map((v) => `${v.OptionName}: ${v.Value}`).join(
    ", ",
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
            {item ? `[${item.Grade}] ${item.Name}` : codeName}
          </Typography>
        }
        secondary={effects}
      />
    </ListItem>
  );
}
