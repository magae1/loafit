import { TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import jewelriesReducer from "@/redux/features/jewelriesSlice";
import characterSearchReducer from "@/redux/features/characterSearchSlice";
import abilityStone from "@/redux/features/stoneSlice";

export const store = configureStore({
  reducer: {
    jewelries: jewelriesReducer,
    characterSearch: characterSearchReducer,
    abilityStone: abilityStone,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
