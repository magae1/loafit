import { Box, Typography } from "@mui/material";
import { TArmoryProfile } from "@/app/_libs/types";

interface props {
  profileData: TArmoryProfile;
}

export default function ProfilePaper({ profileData }: props) {
  return (
    <Box>
      <Typography>{profileData.CharacterClassName}</Typography>
      <Typography>{profileData.CharacterName}</Typography>
    </Box>
  );
}
