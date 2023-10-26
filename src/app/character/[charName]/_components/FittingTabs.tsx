"use client";
import { useParams } from "next/navigation";
import { SyntheticEvent, useState, ReactNode, useEffect, useMemo } from "react";
import { Tab, Tabs, Container, Typography } from "@mui/material";
import _ from "underscore";
import { useDispatch } from "react-redux";

import { JEWELRY_TYPES, STONE, TCharacterData } from "@/libs/types";
import EngravingFittings from "@/app/character/[charName]/_components/EngravingFittings";
import { addSearchInput } from "@/redux/features/characterSearchSlice";
import { equipmentParser, stoneParser } from "@/libs/transformers";
import {
  initializeJewelries,
  removeAll,
} from "@/redux/features/jewelriesSlice";
import { initializeStone, removeStone } from "@/redux/features/stoneSlice";

interface Props {
  data: TCharacterData;
}

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
    >
      {value === index && <Container>{children}</Container>}
    </div>
  );
}

export default function Fittings(props: Props) {
  const { ArmoryEquipment } = props.data;
  const params = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const jewelries = useMemo(() => {
    return _.chain(ArmoryEquipment)
      .filter((item) => _.contains(JEWELRY_TYPES, item.Type))
      .map((item) => equipmentParser(item))
      .value();
  }, []);

  const stone = useMemo(() => {
    const stoneData = _.find(ArmoryEquipment, (v) => v.Type === STONE);
    return stoneData ? stoneParser(stoneData) : null;
  }, []);

  useEffect(() => {
    dispatch(initializeJewelries(jewelries));
    stone && dispatch(initializeStone(stone));
    return () => {
      dispatch(removeAll());
      dispatch(removeStone());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(addSearchInput(decodeURI(params.charName as string)));
  }, [params]);

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
