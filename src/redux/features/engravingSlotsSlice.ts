import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TEngravingSlot } from "@/libs/types";

type stateType = {
  value: TEngravingSlot[];
};

const defaultState: stateType = {
  value: [
    {
      Slot: 0,
      Effect: { Name: "", Value: 0, IsPenalty: false },
      isActive: false,
    },
    {
      Slot: 1,
      Effect: { Name: "", Value: 0, IsPenalty: false },
      isActive: false,
    },
  ],
};

export const engravingSlots = createSlice({
  name: "engravingSlots",
  initialState: defaultState,
  reducers: {
    initializeSlots: (state, action: PayloadAction<TEngravingSlot[]>) => {
      const slot0 = action.payload.find((v) => v.Slot == 0);
      const slot1 = action.payload.find((v) => v.Slot == 1);
      if (slot0) {
        state.value[0] = slot0;
      }
      if (slot1) {
        state.value[1] = slot1;
      }
    },
    changeName: (
      state,
      action: PayloadAction<{ slotIndex: number; name: string | null }>,
    ) => {
      const { slotIndex, name } = action.payload;
      if (slotIndex >= 0 && slotIndex < state.value.length) {
        if (name === null) state.value[slotIndex].isActive = false;
        else {
          state.value[slotIndex].isActive = true;
          state.value[slotIndex].Effect.Name = name;
        }
      }
    },
    changeValue: (
      state,
      action: PayloadAction<{ slotIndex: number; value: number }>,
    ) => {
      const { slotIndex, value } = action.payload;
      if (slotIndex >= 0 && slotIndex < state.value.length) {
        if (value == 0) state.value[slotIndex].isActive = false;
        else state.value[slotIndex].isActive = true;
        state.value[slotIndex].Effect.Value = value;
      }
    },
    removeSlots: (state) => {
      state.value = defaultState.value;
    },
  },
});

export default engravingSlots.reducer;
export const { initializeSlots, changeValue, changeName, removeSlots } =
  engravingSlots.actions;
