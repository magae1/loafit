import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "underscore";

import {
  TJewelry,
  TAuctionItem,
  JEWELRY_TYPES,
  STONE,
  TStone,
  TActiveEngraving,
  IIndividualRequestItems,
} from "@/libs/types";
import { basicOptions } from "@/libs/data";

export type wearingType = {
  necklace: TJewelry;
  earring1: TJewelry;
  earring2: TJewelry;
  ring1: TJewelry;
  ring2: TJewelry;
  bracelet: TJewelry;
  stone: TStone;
};

type stateType = {
  value: wearingType;
};

const basicValue = {
  necklace: {
    codeName: JEWELRY_TYPES.NECKLACE,
    searchOption: {
      ...basicOptions,
      CategoryCode: 200010,
    },
  },
  earring1: {
    codeName: JEWELRY_TYPES.EARRING,
    searchOption: {
      ...basicOptions,
      CategoryCode: 200020,
    },
  },
  earring2: {
    codeName: JEWELRY_TYPES.EARRING,
    searchOption: {
      ...basicOptions,
      CategoryCode: 200020,
    },
  },
  ring1: {
    codeName: JEWELRY_TYPES.RING,
    searchOption: {
      ...basicOptions,
      CategoryCode: 200030,
    },
  },
  ring2: {
    codeName: JEWELRY_TYPES.RING,
    searchOption: {
      ...basicOptions,
      CategoryCode: 200030,
    },
  },
  bracelet: {
    codeName: JEWELRY_TYPES.BRACELET,
    searchOption: {
      ...basicOptions,
      CategoryCode: 200040,
    },
  },
  stone: {
    codeName: STONE,
    searchOption: {
      ...basicOptions,
      CategoryCode: 30000,
      ItemGrade: "유물",
    },
    engravings: [],
  },
};

const defaultState: stateType = {
  value: basicValue,
};

export const wearings = createSlice({
  name: "jewelries",
  initialState: defaultState,
  reducers: {
    initialize: (
      state,
      action: PayloadAction<{ jewelries: TJewelry[]; stone: TStone | null }>,
    ) => {
      const { jewelries, stone } = action.payload;
      _.each(jewelries, (v) => {
        const targetKey = _.findKey(
          state.value,
          (val) => val.codeName === v.codeName && _.isUndefined(val.item),
        );
        if (targetKey) {
          state.value[targetKey].item = v.item;
        }
      });
      if (stone) {
        state.value.stone.item = stone.item;
        state.value.stone.engravings = stone.engravings;
      }
    },
    addOne: (
      state,
      action: PayloadAction<{ type: keyof wearingType; item: TAuctionItem }>,
    ) => {
      const { type, item } = action.payload;
      state.value[type].prevItem = state.value[type].item;
      state.value[type].item = item;
      state.value[type].updatedAt = new Date().getTime();
      if (type === "stone") {
        state.value.stone.engravings = item.Options.map(
          (opt): TActiveEngraving => ({
            Name: opt.OptionName,
            Value: 0,
            IsPenalty: opt.IsPenalty,
          }),
        );
      }
    },
    changeSearchOption: (
      state,
      action: PayloadAction<{
        type: keyof wearingType;
        options: IIndividualRequestItems;
      }>,
    ) => {
      const { type, options } = action.payload;
      state.value[type].searchOption = options;
    },
    changeEngValue: (
      state,
      action: PayloadAction<{ index: number; value: number | null }>,
    ) => {
      const { index, value } = action.payload;
      if (index < 0 || index >= state.value.stone.engravings.length) return;
      if (!value) {
        state.value.stone.engravings[index].Value = 0;
        return;
      }
      if (value && value >= 0 && value <= 10) {
        state.value.stone.engravings[index].Value = value;
      }
    },
    removeOne: (state, action: PayloadAction<keyof wearingType>) => {
      const type = action.payload;
      state.value[type].prevItem = state.value[type].item;
      state.value[type].item = undefined;
      if (type === "stone") {
        state.value.stone.engravings = [];
      }
    },
    restoreOne: (state, action: PayloadAction<keyof wearingType>) => {
      const type = action.payload;
      state.value[type].item = state.value[type].prevItem;
      state.value[type].prevItem = undefined;
      if (state.value.stone.item && type === "stone") {
        state.value.stone.engravings = state.value.stone.item.Options.map(
          (opt): TActiveEngraving => ({
            Name: opt.OptionName,
            Value: 0,
            IsPenalty: opt.IsPenalty,
          }),
        );
      }
    },
    removeAll: (state) => {
      state.value = basicValue;
    },
  },
});

export default wearings.reducer;
export const {
  initialize,
  addOne,
  changeEngValue,
  changeSearchOption,
  removeOne,
  restoreOne,
  removeAll,
} = wearings.actions;
