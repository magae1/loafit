import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TAuctionItem, STONE, TStone } from "@/libs/types";
import { optionToEngraving } from "@/libs/transformers";

type stateType = {
  value: {
    curr: TStone;
    prev: TStone;
  };
};

const basicState = {
  engravings: [],
  codeName: STONE,
  item: null,
};

const defaultState: stateType = {
  value: {
    curr: basicState,
    prev: basicState,
  },
};

export const abilityStone = createSlice({
  name: "abilityStone",
  initialState: defaultState,
  reducers: {
    initializeStone: (state, action: PayloadAction<TStone>) => {
      state.value.curr = action.payload;
    },
    addStone: (state, action: PayloadAction<TAuctionItem>) => {
      state.value.prev.item = state.value.curr.item;
      state.value.prev.engravings = state.value.curr.engravings;
      state.value.prev.updatedAt = state.value.curr.updatedAt;

      state.value.curr.item = action.payload;
      state.value.curr.engravings = action.payload.Options.map((opt) =>
        optionToEngraving(opt),
      );
      state.value.curr.updatedAt = new Date();
    },
    changeEngValue: (
      state,
      action: PayloadAction<{ index: number; value: number | null }>,
    ) => {
      const { index, value } = action.payload;
      if (index < 0 || index >= state.value.curr.engravings.length) return;
      if (!value) {
        state.value.curr.engravings[index].Value = 0;
        return;
      }
      if (value && value >= 0 && value <= 10) {
        state.value.curr.engravings[index].Value = value;
      }
    },
    restoreStone: (state) => {
      state.value.curr.item = state.value.prev.item;
      state.value.curr.engravings = state.value.prev.engravings;
      state.value.prev.engravings = [];
      state.value.prev.item = null;
    },
    removeStone: (state) => {
      state.value.prev.item = state.value.curr.item;
      state.value.prev.engravings = state.value.curr.engravings;
      state.value.curr.engravings = [];
      state.value.curr.item = null;
    },
  },
});

export default abilityStone.reducer;
export const { initializeStone, changeEngValue, restoreStone, removeStone } =
  abilityStone.actions;
