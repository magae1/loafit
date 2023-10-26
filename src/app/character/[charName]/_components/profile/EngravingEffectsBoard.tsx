import { TEngravingEffect } from "@/libs/types";
import {
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import _ from "underscore";

interface Props {
  data: TEngravingEffect[];
}

function EffectsListItem({ effect }: { effect: TEngravingEffect }) {
  return (
    <ListItem sx={{ px: 0 }}>
      <ListItemAvatar>
        <Avatar src={effect.Icon} alt={effect.Name} />
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <Tooltip
            title={
              <Typography variant={"caption"}>{effect.Description}</Typography>
            }
            arrow
          >
            <Typography variant={"subtitle1"} component={"span"}>
              {effect.Name}
            </Typography>
          </Tooltip>
        }
      />
    </ListItem>
  );
}

export default function EngravingEffectsBoard(props: Props) {
  const { data } = props;
  return (
    <>
      <Divider>
        <Typography variant={"overline"}>각인 효과</Typography>
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
