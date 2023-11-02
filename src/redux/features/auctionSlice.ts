import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AUCTION_SORT_TYPES,
  STONE,
  TRequestAuctionItems,
  TSearchDetailOption,
} from "@/libs/types";

type defaultStateType = {
  value: {
    open: boolean;
    options: TRequestAuctionItems;
  };
};

const defaultState: defaultStateType = {
  value: {
    open: false,
    options: {
      ItemLevelMin: 0,
      ItemLevelMax: 1700,
      ItemGradeQuality: null,
      SkillOptions: [],
      EtcOptions: [],
      Sort: AUCTION_SORT_TYPES.BUY_PRICE,
      CategoryCode: null,
      CharacterClass: null,
      ItemTier: 3,
      ItemGrade: null,
      ItemName: null,
      PageNo: 1,
      SortCondition: "ASC",
    },
  },
};

export const auctionSlice = createSlice({
  name: "auction-fitting",
  initialState: defaultState,
  reducers: {
    openAuction: (
      state,
      action: PayloadAction<{
        etcOptions: TSearchDetailOption[];
        code: number;
      }>,
    ) => {
      const { etcOptions, code } = action.payload;
      state.value.options.EtcOptions = etcOptions;
      state.value.options.CategoryCode = code;
      state.value.open = true;
    },
    closeAuction: (state) => {
      state.value.open = false;
    },
    setCharacterClass: (state, action: PayloadAction<string>) => {
      state.value.options.CharacterClass = action.payload;
    },
  },
});

export default auctionSlice.reducer;
export const { openAuction, closeAuction, setCharacterClass } =
  auctionSlice.actions;
