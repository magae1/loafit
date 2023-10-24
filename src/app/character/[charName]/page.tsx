import { Grid, Stack, Typography, Divider } from "@mui/material";

import { TCharacterData } from "@/libs/types";
import FittingTabs from "@/app/character/[charName]/_components/FittingTabs";
import BoardItemWrapper from "@/app/character/[charName]/_components/profile/BoardItemWrapper";
import EngravingEffectsBoard from "@/app/character/[charName]/_components/profile/EngravingEffectsBoard";
import StatsBoard from "@/app/character/[charName]/_components/profile/StatsBoard";

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
          backgroundPositionY: "66px",
          backgroundColor: "#15181d",
          backgroundAttachment: "fixed",
          zIndex: -100,
        }}
      >
        <Grid container>
          <Grid item xs={5}>
            <Stack
              bgcolor={"background.paper"}
              sx={{ px: 1, py: 2, m: 1, opacity: 0.8 }}
            >
              <Typography component={"div"} variant={"subtitle2"}>
                {charData.ArmoryProfile.Title}
              </Typography>
              <Typography component={"div"} variant={"h4"}>
                {charData.ArmoryProfile.CharacterName}
              </Typography>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Typography variant={"button"} gutterBottom>
                  {charData.ArmoryProfile.CharacterClassName}
                </Typography>
              </div>
              <Divider>
                <Typography variant={"button"}>캐릭터/아이템 레벨</Typography>
              </Divider>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant={"h6"}
                  gutterBottom
                >{`Lv. ${charData.ArmoryProfile.CharacterLevel}`}</Typography>
                <Typography
                  variant={"h6"}
                  gutterBottom
                >{`Lv. ${charData.ArmoryProfile.ItemAvgLevel}`}</Typography>
              </div>
              <BoardItemWrapper>
                <StatsBoard data={charData.ArmoryProfile.Stats} />
                <EngravingEffectsBoard
                  data={charData.ArmoryEngraving.Effects}
                />
              </BoardItemWrapper>
            </Stack>
          </Grid>
        </Grid>
      </div>
      <FittingTabs data={charData} />
    </div>
  );
}
