import { List, Grid, ListSubheader, ListItem } from "@mui/material";

import StatsBoard from "./engravingfit/StatsBoard";
import EngravingBoard from "./engravingfit/EngravingsBoard";
import JewelryListItem from "./engravingfit/JewelryListItem";
import StoneBoard from "./engravingfit/StoneBoard";
import EngravingEquipment from "./engravingfit/EngravingEquipment";
import { JEWELRY_TYPES } from "@/libs/types";
import { wearingType } from "@/redux/features/wearingsSlice";

type TWearing = {
  type: keyof wearingType;
  name: JEWELRY_TYPES;
};

const WEARINGS: TWearing[] = [
  { type: "necklace", name: JEWELRY_TYPES.NECKLACE },
  { type: "earring1", name: JEWELRY_TYPES.EARRING },
  { type: "earring2", name: JEWELRY_TYPES.EARRING },
  { type: "ring1", name: JEWELRY_TYPES.RING },
  { type: "ring2", name: JEWELRY_TYPES.RING },
  { type: "bracelet", name: JEWELRY_TYPES.BRACELET },
];

export default function EngravingFittings() {
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={5}>
          <StatsBoard />
          <EngravingBoard />
        </Grid>
        <Grid item xs={12} md>
          <List disablePadding>
            <List
              subheader={
                <ListSubheader sx={{ zIndex: 10 }}>장신구</ListSubheader>
              }
            >
              {WEARINGS.map((w) => (
                <JewelryListItem key={w.type} type={w.type} codeName={w.name} />
              ))}
            </List>
            <List
              subheader={
                <ListSubheader sx={{ zIndex: 10 }}>어빌리티 스톤</ListSubheader>
              }
            >
              <StoneBoard />
            </List>
            <List
              subheader={
                <ListSubheader sx={{ zIndex: 10 }}>장착 각인</ListSubheader>
              }
            >
              <ListItem>
                <EngravingEquipment index={0} />
              </ListItem>
              <ListItem>
                <EngravingEquipment index={1} />
              </ListItem>
            </List>
          </List>
        </Grid>
      </Grid>
    </>
  );
}
