"use client";
import { FormEvent, useCallback, useState } from "react";
import { FormControl, IconButton, Input, InputAdornment } from "@mui/material";
import { AccountCircle, Clear } from "@mui/icons-material";
import { useDispatch } from "react-redux";

import { addSearchInput } from "@/redux/features/characterSearchSlice";
import { useRouter } from "next/navigation";

interface Props {
  width?: string | number;
}

export default function SearchBar(props: Props) {
  const { width } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");
  const onSubmitHandle = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(addSearchInput(inputValue));
      router.push(`/character/${inputValue}`);
    },
    [inputValue],
  );

  return (
    <FormControl
      sx={{ display: "flex", alignItems: "center" }}
      component={"form"}
      onSubmit={onSubmitHandle}
    >
      <Input
        type={"text"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        sx={{ width: width, fontSize: "1.2em", py: 1 }}
        startAdornment={
          <InputAdornment position={"start"}>
            <AccountCircle fontSize={"large"} />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position={"end"}>
            {inputValue && (
              <IconButton size={"small"} onClick={() => setInputValue("")}>
                <Clear />
              </IconButton>
            )}
          </InputAdornment>
        }
        placeholder={"캐릭터 이름을 입력해주세요"}
      />
    </FormControl>
  );
}
