import Image from "next/image";
import gold from "public/gold.png";
import { Typography } from "@mui/material";

interface Props {
  price: number;
}

export default function GoldPriceLabel(props: Props) {
  const { price } = props;
  return (
    <div
      style={{ display: "flex", alignItems: "center", width: "fit-content" }}
    >
      <Typography mr={0.5}>{price}</Typography>
      <Image src={gold} alt={"로스트아크 골드 이미지"} width={18} height={19} />
    </div>
  );
}
