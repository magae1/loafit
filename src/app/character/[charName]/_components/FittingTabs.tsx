"use client";
import { SyntheticEvent, useMemo, useState, ReactNode } from "react";
import { Box, Tab, Tabs, Container } from "@mui/material";

import { TCharacterData } from "@/app/_libs/types";
import EngravingFittings from "@/app/character/[charName]/_components/EngravingFittings";
import _ from "underscore";
import { equipmentParser } from "@/app/_libs/transformers";

const JEWELRIES = ["목걸이", "귀걸이", "반지", "팔찌"];

interface Props {
  data: TCharacterData;
}

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function FittingTabPanel(props: TabPanelProps) {
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
  const { data } = props;
  const [value, setValue] = useState(0);

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const jewelries = useMemo(() => {
    return _.chain(data.ArmoryEquipment)
      .filter((v) => _.contains(JEWELRIES, v.Type))
      .map((v) => equipmentParser(v));
  }, [data]);

  return (
    <Box>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          variant={"fullWidth"}
          aria-label={"fitting tabs"}
        >
          <Tab label={"각인 핏"} />
          <Tab label={"보석 핏"} />
        </Tabs>
      </Box>
      <FittingTabPanel index={0} value={value}>
        <EngravingFittings
          engravings={data.ArmoryEngraving}
          stats={data.ArmoryProfile.Stats.slice(0, 6)}
          jewelries={jewelries.value()}
        />
      </FittingTabPanel>
      <FittingTabPanel index={1} value={value}>
        보석 맞추기
      </FittingTabPanel>
    </Box>
  );
}
