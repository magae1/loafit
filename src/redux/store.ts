import { TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import jewelriesReducer from "@/redux/features/jewelriesSlice";

export const store = configureStore({
  reducer: {
    jewelriesReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
