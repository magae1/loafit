"use client";
import { SyntheticEvent, useMemo, useState, ReactNode } from "react";
import { Tab, Tabs, Container, useTheme, Typography } from "@mui/material";
import _ from "underscore";

import { TCharacterData } from "@/libs/types";
import { equipmentParser } from "@/libs/transformers";
import EngravingFittings from "@/app/character/[charName]/_components/EngravingFittings";

const JEWELRIES = ["목걸이", "귀걸이", "반지", "팔찌"];

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
  const { data } = props;
  const theme = useTheme();
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
        <EngravingFittings
          engravings={data.ArmoryEngraving}
          stats={data.ArmoryProfile.Stats.slice(0, 6)}
          jewelries={jewelries.value()}
        />
      </FittingTabPanel>
      <FittingTabPanel index={1} value={value}>
        <Typography textAlign={"center"} py={{ xs: 2, sm: 4, md: 6 }}>
          공사 중
        </Typography>
      </FittingTabPanel>
    </div>
  );
}
