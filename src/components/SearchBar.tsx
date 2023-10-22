"use client";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import {
  Box,
  IconButton,
  useAutocomplete,
  useMediaQuery,
  useTheme,
  Card,
  Typography,
} from "@mui/material";
import { Search as SearchIcon, Cancel, History } from "@mui/icons-material";
import _ from "underscore";
import { useDispatch } from "react-redux";

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  Listbox,
} from "@/components/styles";
import { useAppSelector } from "@/redux/store";
import { addSearchInput } from "@/redux/features/characterSearchSlice";
import dayjs from "dayjs";

export default function SearchBar() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const recentSearchList = useAppSelector(
    (state) => state.characterSearch.value,
  );
  const [inputValue, setInputValue] = useState("");

  const recentSearches = useMemo(() => {
    return _.chain(recentSearchList)
      .pairs()
      .sortBy((v) => {
        const [a, b] = v;
        return -b;
      })
      .map((v) => ({ name: v[0], searchAt: v[1] }))
      .value();
  }, [recentSearchList]);

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: recentSearches,
    getOptionLabel: (option) => {
      if (typeof option === "string") return option;
      return option.name;
    },
    inputValue: inputValue,
    onInputChange: (event, value) => setInputValue(value),
    freeSolo: true,
  });
  if (isSmall)
    return (
      <IconButton>
        <SearchIcon />
      </IconButton>
    );

  return (
    <Search {...getRootProps()}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        inputProps={{ ...getInputProps() }}
        components={{ Root: "form" }}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addSearchInput(inputValue));
          router.push(`/character/${inputValue}`);
        }}
      />
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof recentSearches).map((option, index) => (
            <li
              {...getOptionProps({ option, index })}
              key={_.uniqueId("autocomplete-list")}
            >
              <Typography>
                <History />
                {option.name}
              </Typography>
            </li>
          ))}
        </Listbox>
      ) : null}
    </Search>
  );
}
