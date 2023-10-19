import { ListItem, Rating, Typography } from "@mui/material";
import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";

interface Props {
  name: string;
  value: number;
  isPenalty: boolean;
}

export default function EngravingListsItem(props: Props) {
  const { name, value, isPenalty } = props;

  const level = Math.round(value / 5);

  return (
    <ListItem disablePadding>
      <Typography component={"legend"}>
        {name}-{level}
      </Typography>
      <Rating
        name={`${name}-${value}`}
        value={value}
        max={15}
        icon={<RadioButtonChecked fontSize={"inherit"} />}
        emptyIcon={<RadioButtonUnchecked fontSize={"inherit"} />}
      />
    </ListItem>
  );
}
