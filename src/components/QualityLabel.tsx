import { Box, CircularProgress, CircularProgressProps } from "@mui/material";
import _ from "underscore";

import { QUALITY_COLORS } from "@/libs/data";

export default function QualityLabel(
  props: CircularProgressProps & { value: number },
) {
  const { value, size } = props;
  if (value < 0) return null;

  const qualityColor = _.chain(QUALITY_COLORS)
    .find((v) => v.minValue <= value)
    .value()?.color;

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant={"determinate"}
        sx={{ color: qualityColor }}
        size={size}
        value={value}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <strong
          style={{
            display: "inline-box",
            zIndex: 100,
            color: qualityColor,
            textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
          }}
        >
          {value}
        </strong>
      </Box>
    </Box>
  );
}
