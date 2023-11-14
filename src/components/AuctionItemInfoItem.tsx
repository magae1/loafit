import Image from "next/image";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import _ from "underscore";

import { TAuctionItem } from "@/libs/types";

export default function AuctionItemInfoItem({ item }: { item: TAuctionItem }) {
  const { Icon, Name, Grade, Tier, GradeQuality, Level } = item;

  const secondaryList = [
    Tier && `${Tier}티어`,
    Grade && `${Grade}`,
    GradeQuality && GradeQuality >= 0 && `품질${GradeQuality}`,
    Level && `Lv.${Level}`,
  ];

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "inherit" }}>
            <Image src={Icon} alt={`${Name} 아이콘`} unoptimized fill />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={Name}
          secondary={_.compact(secondaryList).join(" | ")}
        />
      </ListItem>
    </>
  );
}
