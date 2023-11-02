import Image from "next/image";
import { Avatar, ListItemAvatar } from "@mui/material";

import { TAuctionItem } from "@/libs/types";
import QualityLabel from "@/components/QualityLabel";

interface Props {
  item: TAuctionItem;
}

export default function AuctionItemAvatar(props: Props) {
  const { Icon, GradeQuality, Name } = props.item;

  const isUnRatedQuality = GradeQuality < 0;

  return (
    <ListItemAvatar
      sx={{ position: isUnRatedQuality ? undefined : "relative" }}
    >
      {!isUnRatedQuality && (
        <div style={{ position: "absolute", left: -5, top: -5 }}>
          <QualityLabel value={GradeQuality} />
        </div>
      )}
      <Avatar sx={{ bgcolor: "inherit" }}>
        <Image src={Icon} alt={`${Name} 아이콘`} unoptimized fill />
      </Avatar>
    </ListItemAvatar>
  );
}
