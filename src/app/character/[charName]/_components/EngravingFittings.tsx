"use client";
import { useState } from "react";
import { Grid, Typography, Stack, Divider, Box } from "@mui/material";
import _ from "underscore";

import { TArmoryEngraving, TEngraving, TItem, TStat } from "@/app/_libs/types";
import EquipmentItem from "@/app/character/[charName]/_components/EquipmentItem";
import StatsPaper from "@/app/character/[charName]/_components/StatsPaper";
import FittingSection from "@/app/character/[charName]/_components/FittingSection";

type TJewelries = {
  bracelet: TItem | null;
  earring1: TItem | null;
  earring2: TItem | null;
  ring1: TItem | null;
  ring2: TItem | null;
  necklace: TItem | null;
};

interface Props {
  engravings: TArmoryEngraving;
  stats: TStat[];
  jewelries: TItem[];
}
export default function EngravingFittings(props: Props) {
  const { engravings, stats, jewelries } = props;

  const [currentStats, setCurrentStats] = useState<TStat[]>(stats);
  const [currentEngravings, setCurrentEngravings] = useState<TEngraving[]>(
    engravings.Engravings
  );
  const [currentJewelries, setCurrentJewelries] = useState<TJewelries>(null);

  return (
    <Stack spacing={1}>
      <Grid container spacing={1} direction={"row"}>
        <Grid item xs>
          <StatsPaper stats={currentStats} />
        </Grid>
        <Grid item xs={"auto"}>
          <Box>
            {engravings.Effects.map((value, index) => {
              return <Typography key={index}>{value.Name}</Typography>;
            })}
          </Box>
        </Grid>
      </Grid>
      <FittingSection name={"각인서"}>{}</FittingSection>
      <FittingSection name={"어빌리티 스톤"}>{123}</FittingSection>
      <FittingSection name={"장신구"}>
        <Stack spacing={1}>
          {jewelries.map((v, index) => (
            <EquipmentItem itemData={v} key={index} />
          ))}
        </Stack>
      </FittingSection>
    </Stack>
  );
}
