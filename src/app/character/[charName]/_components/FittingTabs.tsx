"use client";
import { SyntheticEvent, useState, ReactNode, useEffect, useMemo } from "react";
import { Tab, Tabs, Container, Typography } from "@mui/material";
import _ from "underscore";
import { useDispatch } from "react-redux";

import {
  JEWELRY_TYPES,
  STONE,
  TArmoryEngraving,
  TArmoryEquipment,
  TArmoryProfile,
  TJewelry,
} from "@/libs/types";
import EngravingFittings from "@/app/character/[charName]/_components/EngravingFittings";
import {
  engravingParser,
  jewelryParser,
  stoneParser,
} from "@/libs/transformers";
import {
  initializeJewelries,
  removeAll,
} from "@/redux/features/jewelriesSlice";
import { initializeStone, removeStone } from "@/redux/features/stoneSlice";
import {
  initializeSlots,
  removeSlots,
} from "@/redux/features/engravingSlotsSlice";
import { setCharacterClass } from "@/redux/features/auctionSlice";

function FittingTabPanel(props: {
  children?: ReactNode;
  index: number;
  value: number;
}) {
  const { children, index, value } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      style={{ minHeight: "50vh" }}
    >
      {value === index && <Container>{children}</Container>}
    </div>
  );
}

interface Props {
  equipments: TArmoryEquipment[] | null;
  engraving: TArmoryEngraving | null;
  profile: TArmoryProfile;
}

export default function Fittings(props: Props) {
  const { equipments, engraving, profile } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const jewelries: TJewelry[] = useMemo(
    () =>
      _.chain(equipments)
        .filter((item) => _.contains(JEWELRY_TYPES, item.Type))
        .map((item) => jewelryParser(item))
        .value(),
    [],
  );

  const stone = useMemo(() => {
    const stoneEquipment = equipments
      ? equipments.find((v) => v.Type === STONE)
      : null;

    return stoneEquipment ? stoneParser(stoneEquipment) : null;
  }, []);

  const engravingSlots = useMemo(() => {
    return engraving
      ? engraving.Engravings.map((v) => engravingParser(v))
      : null;
  }, []);

  useEffect(() => {
    dispatch(initializeJewelries(jewelries));
    stone && dispatch(initializeStone(stone));
    engravingSlots && dispatch(initializeSlots(engravingSlots));
    dispatch(setCharacterClass(profile.CharacterClassName));
    return () => {
      dispatch(removeAll());
      dispatch(removeStone());
      dispatch(removeSlots());
    };
  }, [dispatch]);

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        variant={"fullWidth"}
        aria-label={"fitting tabs"}
      >
        <Tab label={"각인 핏"} />
        <Tab label={"보석 핏"} />
      </Tabs>
      <FittingTabPanel index={0} value={value}>
        <EngravingFittings />
      </FittingTabPanel>
      <FittingTabPanel index={1} value={value}>
        <Typography textAlign={"center"} py={{ xs: 2, sm: 4, md: 6 }}>
          공사 중
        </Typography>
      </FittingTabPanel>
    </div>
  );
}
