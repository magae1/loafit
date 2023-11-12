import { TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import jewelriesReducer from "@/redux/features/jewelriesSlice";
import abilityStoneReducer from "@/redux/features/stoneSlice";
import engravingSlotsReducer from "@/redux/features/engravingSlotsSlice";
import auctionReducer from "@/redux/features/auctionSlice";

export const store = configureStore({
  reducer: {
    jewelries: jewelriesReducer,
    abilityStone: abilityStoneReducer,
    engravingSlots: engravingSlotsReducer,
    auction: auctionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
