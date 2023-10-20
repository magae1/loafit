"use client";
import { useMemo, useState } from "react";
import { Grid, Typography, List } from "@mui/material";
import _ from "underscore";

import { TArmoryEngraving, TEngraving, TItem, TStat } from "@/libs/types";
import StatsPaper from "@/app/character/[charName]/_components/StatsPaper";
import Section from "@/components/Section";

type TJewelries = {
  Bracelet: TItem | null;
  Earring1: TItem | null;
  Earring2: TItem | null;
  Ring1: TItem | null;
  Ring2: TItem | null;
  Necklace: TItem | null;
};

interface Props {
  engravings: TArmoryEngraving;
  stats: TStat[];
  jewelries: TItem[];
}

const calcWearingJewelries = (items: TItem[]) => {};

export default function EngravingFittings(props: Props) {
  const { engravings, stats, jewelries } = props;

  console.log(_.groupBy(jewelries, (v) => v.Name.split(" ").pop() ?? ""));

  const [currentStats, setCurrentStats] = useState<TStat[]>(stats);
  const [currentEngravings, setCurrentEngravings] = useState<TEngraving[]>(
    engravings.Engravings
  );
  const [currentJewelries, setCurrentJewelries] = useState<TJewelries>();

  const engravingRatings = useMemo(() => {
    return null;
  }, [currentEngravings, currentJewelries]);

  return (
    <Grid container>
      <Grid item xs={12} sm>
        <Section name={"특성"}>
          <StatsPaper stats={currentStats} />
        </Section>
      </Grid>
      <Grid item xs={12} sm={"auto"}>
        <Section name={"각인 효과"}>
          {engravings.Effects.map((value, index) => {
            return <Typography key={index}>{value.Name}</Typography>;
          })}
        </Section>
      </Grid>
      <Grid item xs={12}>
        <Section name={"각인서"}>각인서</Section>
      </Grid>
      <Grid item xs={12}>
        <Section name={"어빌리티 스톤"}>{123}</Section>
      </Grid>
      <Grid item xs={12}>
        <Section name={"장신구"}>
          <List>
            {/*{currentJewelries.map((v) => (*/}
            {/*  <JewelryListItem jewelryData={v} key={_.uniqueId("jewelry_")} />*/}
            {/*))}*/}
          </List>
        </Section>
      </Grid>
    </Grid>
  );
}
