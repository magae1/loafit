import { Divider, Grid, Tooltip, Typography } from "@mui/material";
import _ from "underscore";
import { HTMLElement, TextNode, parse, Node } from "node-html-parser";

import { TStat } from "@/libs/types";

const sumStats = (stats: TStat[]) =>
  _.chain(stats)
    .map((v) => parseInt(v.Value))
    .reduce((a, b) => a + b)
    .value();

const coloredFont = (element: Node) => {
  if (element instanceof TextNode) return element.rawText;
  if (element instanceof HTMLElement && element.rawTagName === "font") {
    const color = element.rawAttrs.match(/#[0-9a-f]+/i)?.[0];
    return (
      <strong key={_.uniqueId("coloredFont")} style={{ color: color }}>
        {element.text}
      </strong>
    );
  }
  return null;
};

function StatsItem({ stat, disabled }: { stat: TStat; disabled?: boolean }) {
  const elements = stat.Tooltip.map((v) => parse(v).firstChild);
  const children = elements.map((v) => v.childNodes);

  return (
    <Tooltip
      title={
        <Typography variant={"caption"}>
          {_.chain(children)
            .flatten()
            .map((v) => coloredFont(v))
            .value()}
        </Typography>
      }
      arrow
    >
      <Typography
        variant={"subtitle2"}
        component={"p"}
        color={disabled ? "divider" : undefined}
        textAlign={"center"}
      >
        {stat.Type} {stat.Value}
      </Typography>
    </Tooltip>
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
