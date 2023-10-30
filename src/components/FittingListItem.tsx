import { IconButton, ListItem, ListItemProps } from "@mui/material";
import { AddCircleOutlined, RemoveCircle } from "@mui/icons-material";

export default function FittingListItem(
  props: ListItemProps & {
    onClick: () => void;
    is_none: string | null;
  },
) {
  const { onClick, is_none } = props;
  return (
    <ListItem
      {...props}
      secondaryAction={
        <IconButton edge={"end"} aria-label={"아이템 제거"} onClick={onClick}>
          {is_none ? <AddCircleOutlined /> : <RemoveCircle />}
        </IconButton>
      }
    />
  );
}
