import { TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import wearingsReducer from "@/redux/features/wearingsSlice";
import engravingSlotsReducer from "@/redux/features/engravingSlotsSlice";
import auctionReducer from "@/redux/features/auctionSlice";

export const store = configureStore({
  reducer: {
    wearings: wearingsReducer,
    engravingSlots: engravingSlotsReducer,
    auction: auctionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
