import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AUCTION_SORT_TYPES,
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
  name: "fitting-auction",
  initialState: defaultState,
  reducers: {
    openAuction: (
      state,
      action: PayloadAction<{
        detailOptions: TSearchDetailOption[];
        code: number;
      }>,
    ) => {
      const { detailOptions, code } = action.payload;
      state.value.options.EtcOptions = detailOptions;
      state.value.options.CategoryCode = code;
      state.value.open = true;
    },
    closeAuction: (state) => {
      state.value.open = false;
    },
    setCharacterClass: (state, action: PayloadAction<string>) => {
      state.value.options.CharacterClass = action.payload;
    },
    changeItemTier: (state, action: PayloadAction<number>) => {
      state.value.options.ItemTier = action.payload;
    },
  },
});

export default auctionSlice.reducer;
export const { openAuction, changeItemTier, closeAuction, setCharacterClass } =
  auctionSlice.actions;
