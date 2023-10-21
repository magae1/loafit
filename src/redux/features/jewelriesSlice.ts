import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TItem, IAuctionItem } from "@/libs/types";

type DefaultType = {
  value: jewelriesType;
};

type jewelryType = {
  label: string;
  item: IAuctionItem | null;
};

type jewelriesType = {
  necklace: jewelryType;
  earring1: jewelryType;
  earring2: jewelryType;
  ring1: jewelryType;
  ring2: jewelryType;
  bracelet: jewelryType;
};

const defaultState: DefaultType = {
  value: {
    necklace: {
      label: "목걸이",
      item: null,
    },
    earring1: {
      label: "귀걸이",
      item: null,
    },
    earring2: {
      label: "귀걸이",
      item: null,
    },
    ring1: {
      label: "반지",
      item: null,
    },
    ring2: {
      label: "반지",
      item: null,
    },
    bracelet: {
      label: "팔찌",
      item: null,
    },
  },
};

export const jewelries = createSlice({
  name: "jewelries",
  initialState: () => {
    // if (localStorage.getItem("jewelries/wearing")) {
    //   return JSON.parse(localStorage.getItem("jewelries/wearing"));
    // }
    return defaultState;
  },
  reducers: {},
});

export default jewelries.reducer;
