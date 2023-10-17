import { Box, Card, Grid, Typography, Stack, Chip } from "@mui/material";
import Image from "next/image";
import { TItem } from "@/app/_libs/types";

interface Props {
  itemData: TItem;
}

export default function EquipmentItem({ itemData }: Props) {
  const { Icon, Name, Grade, GradeQuality, Tier, Level, Options } = itemData;

  return (
    <Card sx={{ p: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={"auto"}>
          <Image src={Icon} alt={`${Name}의 아이콘`} width={50} height={50} />
        </Grid>
        <Grid item xs>
          <Grid item container>
            <Grid item>
              <Typography>{Name}</Typography>
              <Stack direction={"row"}>
                {GradeQuality >= 0 && (
                  <Chip size={"small"} label={`품 ${GradeQuality}`} />
                )}
                {Options.map((v, i) => (
                  <Chip
                    key={i}
                    size={"small"}
                    label={`${v.OptionName[0]} ${v.Value}`}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
