import _ from "underscore";

const QUALITY_COLORS = [
  { minValue: 100, color: "#fe9600" },
  { minValue: 90, color: "#ce43fc" },
  { minValue: 70, color: "#00b5ff" },
  { minValue: 30, color: "#91fe02" },
  { minValue: 10, color: "#ffd200" },
  { minValue: 0, color: "#ff6000" },
];

export const qualityColor = (quality: number) =>
  _.chain(QUALITY_COLORS)
    .find((v) => v.minValue <= quality)
    .value()?.color;
