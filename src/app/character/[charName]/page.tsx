import { Grid, Stack } from "@mui/material";

import { TCharacterData } from "@/libs/types";
import FittingTabs from "@/app/character/[charName]/_components/FittingTabs";
import BoardItemWrapper from "@/app/character/[charName]/_components/profile/BoardItemWrapper";
import EngravingEffectsBoard from "@/app/character/[charName]/_components/profile/EngravingEffectsBoard";
import StatsBoard from "@/app/character/[charName]/_components/profile/StatsBoard";
import BasicProfileBoard from "@/app/character/[charName]/_components/profile/BasicProfileBoard";

interface Props {
  params: { charName: string };
}

export async function generateMetadata({ params }: Props) {
  const charaName = decodeURI(params.charName);
  return {
    title: `${charaName} - 로아핏`,
  };
}

async function getCharData(characterName: string) {
  const res = await fetch(
    `${process.env.LOA_URL}/armories/characters/${characterName}`,
    {
      next: {
        revalidate: 15,
      },
      headers: {
        Authorization: `Bearer ${process.env.LOA_JWT}`,
      },
    },
  );

  if (!res.ok) throw new Error("⚠️데이터를 불러올 수 없습니다.⚠️");

  return res.json();
}

export default async function Page(props: Props) {
  const { charName } = props.params;

  const charData: TCharacterData | null = await getCharData(charName);

  if (!charData) throw new Error("유저를 찾을 수 없습니다.");

  return (
    <div style={{ flexGrow: 1 }}>
      <div
        style={{
          width: "inherit",
          backgroundImage: `url(${
            charData.ArmoryProfile.CharacterImage ?? ""
          })`,
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "center",
          backgroundPositionY: "48px",
          backgroundColor: "#15181d",
          backgroundAttachment: "fixed",
        }}
      >
        <Grid container>
          <Grid item xs={5}>
            <Stack
              bgcolor={"background.paper"}
              sx={{ px: 1, pt: 2, m: 1, opacity: 0.8 }}
            >
              <BasicProfileBoard data={charData.ArmoryProfile} />
              <BoardItemWrapper>
                {charData.ArmoryProfile.Stats && (
                  <StatsBoard data={charData.ArmoryProfile.Stats} />
                )}
                {charData.ArmoryEngraving && (
                  <EngravingEffectsBoard
                    data={charData.ArmoryEngraving?.Effects}
                  />
                )}
              </BoardItemWrapper>
            </Stack>
          </Grid>
        </Grid>
      </div>
      <FittingTabs
        profile={charData.ArmoryProfile}
        equipments={charData.ArmoryEquipment}
        engraving={charData.ArmoryEngraving}
      />
    </div>
  );
}
