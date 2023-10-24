"use client";
import { SyntheticEvent, useState, ReactNode } from "react";
import { Tab, Tabs, Container, Typography } from "@mui/material";

import { TCharacterData } from "@/libs/types";
import EngravingFittings from "@/app/character/[charName]/_components/EngravingFittings";

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
  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
          engravings={data.ArmoryEngraving.Engravings}
          equipments={data.ArmoryEquipment}
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
