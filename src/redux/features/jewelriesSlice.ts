import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "underscore";

import {
  TJewelry,
  TAuctionItem,
  JEWELRY_TYPES,
  wearingType,
} from "@/libs/types";

type stateType = {
  value: {
    prev: wearingType;
    curr: wearingType;
  };
};

const basicValue = {
  necklace: {
    codeName: JEWELRY_TYPES.NECKLACE,
    item: null,
  },
  earring1: {
    codeName: JEWELRY_TYPES.EARRING,
    item: null,
  },
  earring2: {
    codeName: JEWELRY_TYPES.EARRING,
    item: null,
  },
  ring1: {
    codeName: JEWELRY_TYPES.RING,
    item: null,
  },
  ring2: {
    codeName: JEWELRY_TYPES.RING,
    item: null,
  },
  bracelet: {
    codeName: JEWELRY_TYPES.BRACELET,
    item: null,
  },
};

const defaultState: stateType = {
  value: { prev: basicValue, curr: basicValue },
};

export const jewelries = createSlice({
  name: "jewelries",
  initialState: defaultState,
  reducers: {
    initializeJewelries: (state, action: PayloadAction<TJewelry[]>) => {
      _.each(action.payload, (v) => {
        const targetKey = _.findKey(
          state.value.curr,
          (val) => val.codeName === v.codeName && _.isNull(val.item),
        );
        if (targetKey) {
          state.value.curr[targetKey] = v;
        }
      });
    },
    addOne: (
      state,
      action: PayloadAction<{ type: keyof wearingType; item: TAuctionItem }>,
    ) => {
      state.value.prev[action.payload.type] =
        state.value.curr[action.payload.type];
      state.value.curr[action.payload.type].item = action.payload.item;
      state.value.curr[action.payload.type].updatedAt = new Date();
    },
    removeOne: (state, action: PayloadAction<keyof wearingType>) => {
      const type = action.payload;
      state.value.prev[type] = {
        codeName: state.value.curr[type].codeName,
        item: state.value.curr[type].item,
      };
      state.value.curr[type] = basicValue[type];
    },
    restoreOne: (state, action: PayloadAction<keyof wearingType>) => {
      state.value.curr[action.payload] = state.value.prev[action.payload];
      state.value.prev[action.payload] =
        defaultState.value.prev[action.payload];
    },
    removeAll: (state) => {
      state.value.prev = state.value.curr;

      _.each(state.value.curr, (v, k) => {
        v["item"] = null;
      });
    },
  },
});

export default jewelries.reducer;
export const { initializeJewelries, restoreOne, removeOne, removeAll } =
  jewelries.actions;
