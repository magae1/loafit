import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "underscore";

import { IAuctionItem, TJewelry, JEWELRIES } from "@/libs/types";

type wearingType = {
  jewelry: TJewelry[];
  maxCount: number;
};

const JEWELRY_DATA: wearingType[] = [
  { jewelry: [], maxCount: 1 },
  { jewelry: [], maxCount: 2 },
  { jewelry: [], maxCount: 2 },
  { jewelry: [], maxCount: 1 },
];

type jewelriesType = _.Dictionary<wearingType>;

const defaultState = {
  value: _.object(JEWELRIES, JEWELRY_DATA) as jewelriesType,
};

export const jewelries = createSlice({
  name: "jewelries",
  initialState: defaultState,
  reducers: {
    initializeJewelries: (state, action: PayloadAction<TJewelry[]>) => {
      _.chain(action.payload)
        .groupBy((v) => v.codeName)
        .each((val, key) => {
          state.value[key].jewelry = val;
        });
    },
    removeAll: () => defaultState,
  },
});

export default jewelries.reducer;
export const { initializeJewelries, removeAll } = jewelries.actions;
