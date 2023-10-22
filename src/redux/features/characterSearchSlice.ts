import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "underscore";

type SearchMapType = {
  [name: string]: number;
};

type initialStateType = {
  value: SearchMapType;
};

const initialState = (): initialStateType => {
  let value = {};
  try {
    const item = localStorage.getItem("character-search-list");
    const data = item && (JSON.parse(item) as SearchMapType);
    if (data) value = data;
  } catch (e) {}
  return { value: value };
};

const characterSearches = createSlice({
  name: "characterSearch",
  initialState: initialState,
  reducers: {
    addSearchInput: (state, action: PayloadAction<string>) => {
      state.value[action.payload] = new Date().getTime();
      state.value = _.chain(state.value)
        .pairs()
        .filter((v) => {
          const [a, b] = v;
          let today = new Date();
          let targetDay = new Date();
          targetDay.setDate(today.getDate() - 7);
          return b >= targetDay.getTime();
        })
        .object()
        .value();
      localStorage.setItem(
        "character-search-list",
        JSON.stringify(state.value),
      );
    },
    removeSearchInput: (state, action: PayloadAction<string>) => {
      delete state.value[action.payload];
      localStorage.setItem(
        "character-search-list",
        JSON.stringify(state.value),
      );
    },
  },
});

export const { addSearchInput, removeSearchInput } = characterSearches.actions;
export default characterSearches.reducer;
