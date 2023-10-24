"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, List } from "@mui/material";
import _ from "underscore";

import { TArmoryEquipment, TEngraving, JEWELRIES } from "@/libs/types";
import Section from "@/components/Section";
import { equipmentParser } from "@/libs/transformers";
import StatsBoard from "@/app/character/[charName]/_components/engravingfit/StatsBoard";
import JewelryListItem from "@/app/character/[charName]/_components/engravingfit/JewelryListItem";
import {
  initializeJewelries,
  removeAll,
} from "@/redux/features/jewelriesSlice";

interface Props {
  equipments: TArmoryEquipment[];
  engravings: TEngraving[];
}

export default function EngravingFittings(props: Props) {
  const { engravings, equipments } = props;
  const dispatch = useDispatch();

  const jewelries = _.chain(equipments)
    .filter((item) => _.contains(JEWELRIES, item.Type))
    .map((item) => equipmentParser(item));

  useEffect(() => {
    dispatch(initializeJewelries(jewelries.value()));
    return () => {
      dispatch(removeAll());
    };
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} sm>
        <Section name={"전투 특성"}>
          <StatsBoard />
        </Section>
      </Grid>
      <Grid item xs={12} sm={"auto"}>
        <Section name={"각인 효과"}>
          {/*{engravings.map((v) => (*/}
          {/*  <EngravingListsItem*/}
          {/*    name={v.Name}*/}
          {/*    value={v.Slot}*/}
          {/*    isPenalty={false}*/}
          {/*  />*/}
          {/*))}*/}
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
            {jewelries
              .map((item, k) => <JewelryListItem key={k} jewelryData={item} />)
              .value()}
          </List>
        </Section>
      </Grid>
    </Grid>
  );
}
