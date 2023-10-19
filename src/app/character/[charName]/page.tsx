import { Box, Stack, Typography } from "@mui/material";

import { TCharacterData } from "@/app/_libs/types";
import FittingTabs from "@/app/character/[charName]/_components/FittingTabs";

interface Props {
  params: { charName: string };
}

export async function generateMetadata({ params }: { charName: string }) {
  const charaName = decodeURI(params.charName);
  return {
    title: `로아핏 유저 검색 - ${charaName}`,
  };
}

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

export default async function Page(props: Props) {
  const { charName } = props.params;

  const charData: TCharacterData = await getCharData(charName);

  return (
    <Stack my={2} spacing={1}>
      <Box>
        <Typography>{charData.ArmoryProfile.CharacterClassName}</Typography>
        <Typography>{charData.ArmoryProfile.CharacterName}</Typography>
      </Box>
      <Box>
        <FittingTabs data={charData} />
      </Box>
    </Stack>
  );
}
