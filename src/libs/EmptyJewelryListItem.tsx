import { ListItem, ListItemText } from "@mui/material";
import { useAppSelector } from "@/redux/store";
import { wearingType } from "@/libs/types";

interface Props {
  type: keyof wearingType;
}

export default function EmptyJewelryListItem(props: Props) {
  const { type } = props;
  const prevJewelry = useAppSelector(
    (state) => state.jewelries.value.prev[type],
  );

  return (
    <ListItem>
      <ListItemText />
    </ListItem>
  );
}
