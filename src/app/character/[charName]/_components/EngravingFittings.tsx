import { List, Grid, Divider } from "@mui/material";

import StatsBoard from "@/app/character/[charName]/_components/engravingfit/StatsBoard";
import ListSectionWrapper from "@/app/character/[charName]/_components/engravingfit/ListSectionWrapper";
import EngravingBoard from "@/app/character/[charName]/_components/engravingfit/EngravingsBoard";
import JewelryListItem from "@/app/character/[charName]/_components/engravingfit/JewelryListItem";
import StoneBoard from "@/app/character/[charName]/_components/engravingfit/StoneBoard";
import EngravingSlider from "@/app/character/[charName]/_components/engravingfit/EngravingSlider";
import AuctionDialog from "@/app/character/[charName]/_components/engravingfit/AuctionDialog";

export default function EngravingFittings() {
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={"auto"}>
          <StatsBoard />
          <EngravingBoard />
        </Grid>
        <Grid item xs={12} md>
          <ListSectionWrapper label={"장신구"}>
            <List disablePadding>
              <JewelryListItem type={"necklace"} />
              <Divider />
              <JewelryListItem type={"earring1"} />
              <Divider />
              <JewelryListItem type={"earring2"} />
              <Divider />
              <JewelryListItem type={"ring1"} />
              <Divider />
              <JewelryListItem type={"ring2"} />
              <Divider />
              <JewelryListItem type={"bracelet"} />
            </List>
          </ListSectionWrapper>
          <ListSectionWrapper label={"어빌리티 스톤"}>
            <StoneBoard />
          </ListSectionWrapper>
          <ListSectionWrapper label={"각인서"}>
            <Grid container spacing={2} pl={4} py={1}>
              <Grid item xs={12}>
                <EngravingSlider index={0} />
              </Grid>
              <Grid item xs={12}>
                <EngravingSlider index={1} />
              </Grid>
            </Grid>
          </ListSectionWrapper>
        </Grid>
      </Grid>
      <AuctionDialog />
    </>
  );
}
