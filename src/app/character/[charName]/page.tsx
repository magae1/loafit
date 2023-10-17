import { Stack } from "@mui/material";

import { TCharacterData } from "@/app/_libs/types";
import ProfilePaper from "@/app/character/[charName]/_components/ProfilePaper";
import Fittings from "@/app/character/[charName]/_components/Fittings";

async function getCharData(characterName: string) {
  const res = await fetch(
    `${process.env.LOA_URL}/armories/characters/${characterName}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.LOA_JWT}`,
      },
    }
  );

  if (!res.ok) throw new Error("⚠️데이터를 불러올 수 없습니다.⚠️");
  return res.json();
}

export default async function Page({
  params,
}: {
  params: { charName: string };
}) {
  const { charName } = params;
  const charData: TCharacterData = await getCharData(charName);

  return (
    <Stack my={2} spacing={1}>
      <ProfilePaper profileData={charData.ArmoryProfile} />
      <Fittings data={charData} />
    </Stack>
  );
}
