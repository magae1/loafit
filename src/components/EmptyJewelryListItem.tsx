import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Restore } from "@mui/icons-material";

import { TAuctionItem } from "@/libs/types";
import JewelrySearchOptions from "@/components/JewelrySearchOptions";

interface Props {
  prev_item: TAuctionItem | null;
  codeName: string;
  onRestore: () => void;
}

export default function EmptyJewelryListItem(props: Props) {
  const { prev_item, codeName, onRestore } = props;

  return (
    <>
      <ListItem sx={{ py: 2 }}>
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
      <JewelrySearchOptions codeName={codeName} />
    </>
  );
}
