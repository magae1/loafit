import { Typography, TypographyProps } from "@mui/material";

import { GRADE_COLORS } from "@/libs/data";
import { TAuctionItem } from "@/libs/types";

interface Props extends TypographyProps {
  item: TAuctionItem;
}

export default function ItemNameTypo(props: Props) {
  const { item } = props;
  return (
    <Typography {...props}>
      <b
        style={{
          color: GRADE_COLORS.find((i) => item.Grade === i.name)?.color,
        }}
      >
        {`[${item.Grade}]`}
      </b>{" "}
      {item.Name}
    </Typography>
  );
}
