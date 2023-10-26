import { Stack, List } from "@mui/material";

import StatsBoard from "@/app/character/[charName]/_components/engravingfit/StatsBoard";
import ListSectionWrapper from "@/app/character/[charName]/_components/engravingfit/ListSectionWrapper";
import EngravingBoard from "@/app/character/[charName]/_components/engravingfit/EngravingsBoard";
import JewelryListItem from "@/app/character/[charName]/_components/engravingfit/JewelryListItem";
import StoneBoard from "@/app/character/[charName]/_components/engravingfit/StoneBoard";

export default function EngravingFittings() {
  return (
    <Stack>
      <StatsBoard />
      <EngravingBoard />
      <List>
        <ListSectionWrapper label={"각인서"}>각인서</ListSectionWrapper>
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
    </Stack>
  );
}
