import { TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import jewelriesReducer from "@/redux/features/jewelriesSlice";
import characterSearchReducer from "@/redux/features/characterSearchSlice";

export const store = configureStore({
  reducer: {
    jewelries: jewelriesReducer,
    characterSearch: characterSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
