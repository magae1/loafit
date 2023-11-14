import { List, Grid, ListSubheader, ListItem } from "@mui/material";

import StatsBoard from "./engravingfit/StatsBoard";
import EngravingBoard from "./engravingfit/EngravingsBoard";
import JewelryListItem from "./engravingfit/JewelryListItem";
import StoneBoard from "./engravingfit/StoneBoard";
import EngravingEquipment from "./engravingfit/EngravingEquipment";
import FittingSubheader from "./engravingfit/FittingSubheader";
import AuctionDialog from "./auction/AuctionDialog";

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
            <List subheader={<FittingSubheader label={"장신구"} />}>
              <JewelryListItem type={"necklace"} />
              <JewelryListItem type={"earring1"} />
              <JewelryListItem type={"earring2"} />
              <JewelryListItem type={"ring1"} />
              <JewelryListItem type={"ring2"} />
              <JewelryListItem type={"bracelet"} />
            </List>
            <List subheader={<FittingSubheader label={"어빌리티 스톤"} />}>
              <StoneBoard />
            </List>
            <List subheader={<ListSubheader>장착 각인</ListSubheader>}>
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
      <AuctionDialog />
    </>
  );
}
