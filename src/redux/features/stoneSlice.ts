import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAuctionItem, STONE, TStone } from "@/libs/types";

type stateType = {
  value: TStone;
};

const defaultState: stateType = {
  value: {
    currentEffects: [],
    codeName: STONE,
    item: null,
  },
};

export const abilityStone = createSlice({
  name: "abilityStone",
  initialState: defaultState,
  reducers: {
    initializeStone: (state, action: PayloadAction<TStone>) => {
      state.value = action.payload;
    },
    changeStone: (state, action: PayloadAction<IAuctionItem>) => {
      state.value.currentEffects = action.payload.Options.map((v) => ({
        Name: v.OptionName,
        Value: 0,
        IsPenalty: v.IsPenalty,
      }));
      state.value.item = action.payload;
    },
    changeEngValue: (
      state,
      action: PayloadAction<{ index: number; value: number | null }>,
    ) => {
      const { index, value } = action.payload;
      if (index < 0 || index >= state.value.currentEffects.length) return;
      if (!value) {
        state.value.currentEffects[index].Value = 0;
        return;
      }
      if (value && value >= 0 && value <= 10) {
        state.value.currentEffects[index].Value = value;
      }
    },
    removeStone: (state) => {
      state.value.currentEffects = [];
      state.value.item = null;
    },
  },
});

export default abilityStone.reducer;
export const { initializeStone, changeStone, changeEngValue, removeStone } =
  abilityStone.actions;
