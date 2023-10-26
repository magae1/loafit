import { TArmoryProfile } from "@/libs/types";
import { Divider, Typography } from "@mui/material";

interface Props {
  data: TArmoryProfile;
}

export default function BasicProfileBoard(props: Props) {
  const {
    Title,
    CharacterName,
    CharacterClassName,
    CharacterLevel,
    ServerName,
    ItemAvgLevel,
  } = props.data;

  return (
    <>
      <Typography component={"div"} variant={"subtitle2"}>
        {Title}
      </Typography>
      <Typography component={"div"} variant={"h4"}>
        {CharacterName}
      </Typography>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Typography variant={"button"} gutterBottom>
          {`${ServerName}/${CharacterClassName}`}
        </Typography>
      </div>
      <Divider>
        <Typography variant={"overline"}>캐릭터/아이템 레벨</Typography>
      </Divider>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant={"h6"}
          gutterBottom
        >{`Lv. ${CharacterLevel}`}</Typography>
        <Typography
          variant={"h6"}
          gutterBottom
        >{`Lv. ${ItemAvgLevel}`}</Typography>
      </div>
    </>
  );
}
