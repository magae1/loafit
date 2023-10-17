import { Paper } from "@mui/material";

interface Props {
  icon: string;
  name: string;
  value: number;
  level: number;
}

export default function EngravingState(props: Props) {
  const { name, value, level } = props;

  return <Paper></Paper>;
}
