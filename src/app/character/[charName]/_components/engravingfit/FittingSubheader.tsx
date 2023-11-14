"use client";
import { useCallback, useMemo, useRef } from "react";
import { ListSubheader, Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import _ from "underscore";

import { openAuction } from "@/redux/features/auctionSlice";
import { auctionOptions } from "@/libs/data";
import { STONE, JEWELRY, TCategoryItem } from "@/libs/types";

interface Props {
  label: typeof JEWELRY | typeof STONE;
}

export default function FittingSubheader(props: Props) {
  const { label } = props;
  const dispatch = useDispatch();
  const category = useRef(
    auctionOptions.Categories.find((i) => i.CodeName === label),
  );

  const options = useMemo(() => {
    const cate = category.current;
    if (cate) {
      return _.flatten([
        {
          Code: cate.Code,
          CodeName: `${cate.CodeName} -  전체`,
        } as TCategoryItem,
        cate.Subs,
      ]);
    }
    return undefined;
  }, [label]);

  const onClick = useCallback(() => {
    if (!category.current) return;
    dispatch(
      openAuction({
        categoryOptions: options,
        categoryItem: {
          Code: category.current.Code,
          CodeName: `${category.current.CodeName} - 전체`,
        } as TCategoryItem,
      }),
    );
  }, [dispatch]);

  return (
    <ListSubheader sx={{ zIndex: 2 }}>
      {label}
      <Button
        sx={{ position: "absolute", top: "6px", right: 0 }}
        onClick={onClick}
        endIcon={<ArrowForward />}
      >
        경매장 검색
      </Button>
    </ListSubheader>
  );
}
