import { Chip, Stack } from "@mui/material";
import _ from "underscore";

import { TStat } from "@/app/_libs/types";

interface Props {
  stats: TStat[];
}

export default function StatsPaper({ stats }: Props) {
  return (
    <Stack
      spacing={1}
      direction={"row"}
      useFlexGap
      flexWrap={"wrap"}
      justifyContent={"space-evenly"}
    >
      {stats.map((v) => (
        <Chip
          key={_.uniqueId("stat-typography")}
          sx={{ borderRadius: 1 }}
          label={`${v.Type}: ${v.Value}`}
        />
      ))}
    </Stack>
  );
}
