import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCommonRequestItems } from "@/libs/types";

type defaultStateType = {
  value: TCommonRequestItems;
};

const defaultState: defaultStateType = {
  value: {
    CharacterClass: null,
  },
};

export const auctionSlice = createSlice({
  name: "fitting-auction",
  initialState: defaultState,
  reducers: {
    setCharacterClass: (state, action: PayloadAction<string>) => {
      state.value.CharacterClass = action.payload;
    },
  },
});

export default auctionSlice.reducer;
export const { setCharacterClass } = auctionSlice.actions;
