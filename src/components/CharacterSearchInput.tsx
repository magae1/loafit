"use client";
import { FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { FormControl, IconButton, OutlinedInput } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDispatch } from "react-redux";

import { addSearchInput } from "@/redux/features/characterSearchSlice";

export default function CharacterSearchInput() {
  const router = useRouter();
  const [charName, setCharName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(addSearchInput(charName));
      router.push(`/character/${charName}`, { scroll: false });
    },
    [charName],
  );

  return (
    <FormControl
      component={"form"}
      sx={{ width: "100%" }}
      onSubmit={handleSubmit}
    >
      <OutlinedInput
        placeholder="캐릭터 이름을 입력해주세요."
        value={charName}
        onChange={(e) => setCharName(e.target.value)}
        inputProps={{ "aria-label": "search character" }}
        endAdornment={
          <IconButton
            type="submit"
            sx={{ borderRadius: 1 }}
            aria-label="search button"
          >
            <Search />
          </IconButton>
        }
      />
    </FormControl>
  );
}
