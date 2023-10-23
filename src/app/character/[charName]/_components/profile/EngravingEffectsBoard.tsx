import { TEngravingEffect } from "@/libs/types";
import {
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import _ from "underscore";

interface Props {
  data: TEngravingEffect[];
}

function EffectsListItem({ effect }: { effect: TEngravingEffect }) {
  return (
    <ListItem disablePadding>
      <ListItemAvatar>
        <Avatar src={effect.Icon} alt={effect.Name} />
      </ListItemAvatar>
      <ListItemText primary={effect.Name} secondary={effect.Description} />
    </ListItem>
  );
}

export default function EngravingEffectsBoard(props: Props) {
  const { data } = props;
  return (
    <>
      <Divider>
        <Typography variant={"button"}>각인 효과</Typography>
      </Divider>
      <div style={{ flexGrow: 1 }}>
        <List dense disablePadding>
          {data.map((item) => (
            <EffectsListItem
              key={_.uniqueId("profile-engraving-effect-item")}
              effect={item}
            />
          ))}
        </List>
      </div>
    </>
  );
}
