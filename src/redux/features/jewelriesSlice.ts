import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TItem, IAuctionItem, TJewelry } from "@/libs/types";

type DefaultType = {
  value: jewelriesType;
};

type jewelriesType = {
  necklace: TJewelry;
  earring1: TJewelry;
  earring2: TJewelry;
  ring1: TJewelry;
  ring2: TJewelry;
  bracelet: TJewelry;
};

const defaultState: DefaultType = {
  value: {
    necklace: {
      type: "목걸이",
      item: null,
    },
    earring1: {
      type: "귀걸이",
      item: null,
    },
    earring2: {
      type: "귀걸이",
      item: null,
    },
    ring1: {
      type: "반지",
      item: null,
    },
    ring2: {
      type: "반지",
      item: null,
    },
    bracelet: {
      type: "팔찌",
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
