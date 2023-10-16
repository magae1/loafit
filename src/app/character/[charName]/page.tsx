import { Box, Typography } from "@mui/material";

import { TArmoryEquipment, TArmoryProfile } from "@/app/_libs/types";
import Image from "next/image";

const TYPES = ["귀걸이", "목걸이", "반지"];

async function getEquipments(characterName: string) {
  const res = await fetch(
    `${process.env.LOA_URL}/armories/characters/${characterName}/profiles`,
    {
      headers: {
        Authorization: `Bearer ${process.env.LOA_JWT}`,
      },
    }
  );

  if (!res.ok) throw new Error("⚠️데이터를 불러올 수 없습니다.⚠️");

  const data: TArmoryProfile = await res.json();
  return data;
}

export default async function Page({
  params,
}: {
  params: { charName: string };
}) {
  const { charName } = params;
  const charData: TArmoryProfile = await getEquipments(charName);

  return (
    <Box>
      <Image
        src={charData.CharacterImage}
        alt={`${charData.CharacterName} 이미지`}
        width={300}
        height={400}
      />
    </Box>
  );
}
