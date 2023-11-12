import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Collapse,
  ListItemButton,
} from "@mui/material";
import { Restore } from "@mui/icons-material";

import { TAuctionItem, wearingType } from "@/libs/types";
import JewelrySearchOptionList from "./JewelrySearchOptionList";

interface Props {
  type: keyof wearingType;
  prev_item: TAuctionItem | null;
  codeName: string;
  open: boolean;
  onOpen: () => void;
  onRestore: () => void;
}

export default function EmptyJewelryListItem(props: Props) {
  const { type, prev_item, codeName, open, onOpen, onRestore } = props;
  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          prev_item && (
            <IconButton edge={"end"} onClick={onRestore}>
              <Restore />
            </IconButton>
          )
        }
      >
        <ListItemButton sx={{ minHeight: "76px" }} onClick={onOpen}>
          <ListItemAvatar>
            <Avatar>{codeName[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText secondary={`장착 중인 ${codeName}가(이) 없습니다.`} />
        </ListItemButton>
      </ListItem>
      <Collapse in={open}>
        <JewelrySearchOptionList type={type} codeName={codeName} />
      </Collapse>
    </>
  );
}
