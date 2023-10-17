import { Box, Rating, Typography } from "@mui/material";
import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";

interface Props {
  name: string;
  value: number;
}

export default function EngravingRating(props: Props) {
  const { name, value } = props;

  const level = Math.round(value / 5);

  return (
    <Box>
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
    </Box>
  );
}
