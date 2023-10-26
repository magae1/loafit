import { Box, CircularProgress } from "@mui/material";
import _ from "underscore";

const QUALITY_COLORS = [
  { minValue: 100, color: "#fe9600" },
  { minValue: 90, color: "#ce43fc" },
  { minValue: 70, color: "#00b5ff" },
  { minValue: 30, color: "#91fe02" },
  { minValue: 10, color: "#ffd200" },
  { minValue: 0, color: "#ff6000" },
];

export default function QualityLabel({ value }: { value: number }) {
  if (value < 0) return null;

  const qualityColor = _.chain(QUALITY_COLORS)
    .find((v) => v.minValue <= value)
    .value()?.color;

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant={"determinate"}
        sx={{ color: qualityColor }}
        size={50}
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
