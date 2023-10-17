"use client";
import { FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { IconButton, InputBase, Paper, useTheme } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function CharacterSearchInput() {
  const theme = useTheme();
  const router = useRouter();
  const [charName, setCharName] = useState("");

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      router.push(`/character/${charName}`, { scroll: false });
    },
    [charName]
  );

  return (
    <Paper
      component={"form"}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: theme.spacing(50),
      }}
      onSubmit={handleSubmit}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="캐릭터 이름을 입력해주세요."
        value={charName}
        onChange={(e) => setCharName(e.target.value)}
        inputProps={{ "aria-label": "search character" }}
      />
      <IconButton
        type="submit"
        sx={{ borderRadius: 1 }}
        aria-label="search button"
      >
        <Search />
      </IconButton>
    </Paper>
  );
}
