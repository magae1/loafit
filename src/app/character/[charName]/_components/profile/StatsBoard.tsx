import { Divider, Grid, Tooltip, Typography } from "@mui/material";
import _ from "underscore";
import { parse } from "node-html-parser";

import { TStat } from "@/libs/types";

const sumStats = (stats: TStat[]) =>
  _.chain(stats)
    .map((v) => parseInt(v.Value))
    .reduce((a, b) => a + b)
    .value();

function StatsItem({ stat, disabled }: { stat: TStat; disabled?: boolean }) {
  const elements = parse(stat.Tooltip.join("\n"));
  return (
    <div style={{ flexGrow: 1 }}>
      <Tooltip title={elements.text} arrow>
        <Typography
          variant={"subtitle2"}
          color={disabled ? "divider" : undefined}
          textAlign={"center"}
        >
          {stat.Type} {stat.Value}
        </Typography>
      </Tooltip>
    </div>
  );
}

export default function StatsBoard({ data }: { data: TStat[] }) {
  const minValue = 100;
  const mainStats = data.slice(0, 6);
  const subStats = data.slice(6, 8);

  return (
    <>
      <Divider>
        <Typography variant={"overline"}>
          전투 특성 [합:
          {sumStats(mainStats)}]
        </Typography>
      </Divider>
      <div style={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 1, sm: 2 }} columns={{ xs: 8, sm: 12 }}>
          {mainStats.slice(0, 6).map((item) => (
            <Grid item key={_.uniqueId("profile-stats")} xs={4}>
              <StatsItem
                stat={item}
                disabled={minValue > parseInt(item.Value)}
              />
            </Grid>
          ))}
          {subStats.map((item) => (
            <Grid item key={_.uniqueId("profile-stats")} xs={8} sm={6}>
              <StatsItem stat={item} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
