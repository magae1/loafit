import { Stack, List, Grid } from "@mui/material";

import StatsBoard from "@/app/character/[charName]/_components/engravingfit/StatsBoard";
import ListSectionWrapper from "@/app/character/[charName]/_components/engravingfit/ListSectionWrapper";
import EngravingBoard from "@/app/character/[charName]/_components/engravingfit/EngravingsBoard";
import JewelryListItem from "@/app/character/[charName]/_components/engravingfit/JewelryListItem";
import StoneBoard from "@/app/character/[charName]/_components/engravingfit/StoneBoard";
import EngravingSlider from "@/app/character/[charName]/_components/engravingfit/EngravingSlider";

export default function EngravingFittings() {
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <StatsBoard />
        <EngravingBoard />
      </Grid>
      <Grid item xs={12} sm={6}>
        <List>
          <ListSectionWrapper label={"각인서"}>
            <Grid container spacing={2} px={3} pt={2}>
              <Grid item xs={12} sm>
                <EngravingSlider index={0} />
              </Grid>
              <Grid item xs={12} sm>
                <EngravingSlider index={1} />
              </Grid>
            </Grid>
          </ListSectionWrapper>
          <ListSectionWrapper label={"어빌리티 스톤"}>
            <StoneBoard />
          </ListSectionWrapper>
          <ListSectionWrapper label={"장신구"}>
            <List>
              <JewelryListItem type={"necklace"} />
              <JewelryListItem type={"earring1"} />
              <JewelryListItem type={"earring2"} />
              <JewelryListItem type={"ring1"} />
              <JewelryListItem type={"ring2"} />
              <JewelryListItem type={"bracelet"} />
            </List>
          </ListSectionWrapper>
        </List>
      </Grid>
    </Grid>
  );
}
