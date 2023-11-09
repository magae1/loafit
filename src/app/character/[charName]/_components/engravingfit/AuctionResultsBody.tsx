import {
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import _ from "underscore";

import { TAuctionItem } from "@/libs/types";
import OptionChip from "@/components/OptionChip";
import QualityLabel from "@/components/QualityLabel";

interface Props {
  items: TAuctionItem[];
}

export default function AuctionResultBody(props: Props) {
  const { items } = props;
  return (
    <TableBody sx={{ height: "100%" }}>
      {items.map((item) => (
        <TableRow>
          <TableCell>
            <Typography>
              [{item.Grade}] {item.Name}
            </Typography>
            <Stack direction={"row"} spacing={0.5}>
              {item.Options.map((v) => (
                <OptionChip
                  key={_.uniqueId("auction-item-options")}
                  option={v}
                />
              ))}
            </Stack>
          </TableCell>
          <TableCell align={"center"}>
            <QualityLabel value={item.GradeQuality} size={48} />
          </TableCell>
          <TableCell align={"center"}>{item.AuctionInfo?.StartPrice}</TableCell>
          <TableCell align={"center"}>
            {item.AuctionInfo?.BuyPrice ?? "-"}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
