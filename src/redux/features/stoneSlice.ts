import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TAuctionItem, STONE, TStone } from "@/libs/types";
import { optionToEngraving } from "@/libs/transformers";

type stateType = {
  value: TStone;
};

const basicState = {
  engravings: [],
  codeName: STONE,
  item: null,
};

const defaultState: stateType = {
  value: basicState,
};

export const abilityStone = createSlice({
  name: "abilityStone",
  initialState: defaultState,
  reducers: {
    initializeStone: (state, action: PayloadAction<TStone>) => {
      state.value = action.payload;
    },
    addStone: (state, action: PayloadAction<TAuctionItem>) => {
      state.value.item = action.payload;
      state.value.engravings = action.payload.Options.map((opt) =>
        optionToEngraving(opt),
      );
      state.value.updatedAt = new Date().getTime();
    },
    changeEngValue: (
      state,
      action: PayloadAction<{ index: number; value: number | null }>,
    ) => {
      const { index, value } = action.payload;
      if (index < 0 || index >= state.value.engravings.length) return;
      if (!value) {
        state.value.engravings[index].Value = 0;
        return;
      }
      if (value && value >= 0 && value <= 10) {
        state.value.engravings[index].Value = value;
      }
    },
    removeStone: (state) => {
      state.value.engravings = [];
      state.value.item = null;
    },
  },
});

export default abilityStone.reducer;
export const { initializeStone, addStone, changeEngValue, removeStone } =
  abilityStone.actions;
