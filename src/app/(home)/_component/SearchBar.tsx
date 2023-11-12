"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
} from "@mui/material";
import { AccountCircle, Clear } from "@mui/icons-material";
import {
  NumInputAdornment,
  StyledInput,
  StyledInputRoot,
} from "@/components/styles";

interface Props {
  width?: string | number;
}

export default function SearchBar(props: Props) {
  const { width } = props;
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");
  const onSubmitHandle = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
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
      <InputBase
        type={"text"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        sx={{ width: width, fontSize: "1.2em" }}
        components={{ Root: StyledInputRoot, Input: StyledInput }}
        endAdornment={
          inputValue && (
            <InputAdornment position={"end"}>
              <IconButton onClick={() => setInputValue("")}>
                <Clear />
              </IconButton>
            </InputAdornment>
          )
        }
        placeholder={"캐릭터 이름을 입력해주세요"}
      />
    </FormControl>
  );
}
