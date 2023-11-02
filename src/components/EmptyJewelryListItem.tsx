import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { AddCircleOutlined, Restore } from "@mui/icons-material";

import { JEWELRY_TYPES, STONE, TAuctionItem } from "@/libs/types";

interface Props {
  prev_item: TAuctionItem | null;
  codeName: JEWELRY_TYPES | typeof STONE;
  onAdd?: () => void;
  onRestore: () => void;
}

export default function EmptyJewelryListItem(props: Props) {
  const { prev_item, codeName, onAdd, onRestore } = props;

  return (
    <ListItem
      sx={{ py: 2 }}
      secondaryAction={
        <IconButton edge={"end"} onClick={onAdd}>
          <AddCircleOutlined />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          {prev_item ? (
            <IconButton onClick={onRestore}>
              <Restore />
            </IconButton>
          ) : (
            codeName[0]
          )}
        </Avatar>
      </ListItemAvatar>
      <ListItemText secondary={`장착 중인 ${codeName}가(이) 없습니다.`} />
    </ListItem>
  );
}
