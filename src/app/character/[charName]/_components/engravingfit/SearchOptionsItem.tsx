"use client";
import { ReactNode, useCallback, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { useDispatch } from "react-redux";

import ItemGradeInput from "@/components/auctioninputs/ItemGradeInput";
import { auctionOptions } from "@/libs/data";
import ItemGradeQualityInput from "@/components/auctioninputs/ItemGradeQualityInput";
import ItemTiersInput from "@/components/auctioninputs/ItemTiersInput";
import {
  wearingType,
  changeSearchOption,
} from "@/redux/features/wearingsSlice";
import { useAppSelector } from "@/redux/store";

interface Props {
  type: keyof wearingType;
  children: ReactNode;
}

export default function SearchOptionsItem(props: Props) {
  const { type, children } = props;
  const dispatch = useDispatch();
  const options = useAppSelector(
    (state) => state.wearings.value[type].searchOption,
  );
  const [open, setOpen] = useState(false);
  const [itemGradeQuality, setItemGradeQuality] = useState<number | null>(null);
  const [itemTier, setItemTier] = useState(3);
  const [itemGrade, setItemGrade] = useState<string | null>(null);

  const onClose = useCallback(() => setOpen(false), []);
  const onSave = () => {
    onClose();
    dispatch(
      changeSearchOption({
        type: type,
        options: {
          ...options,
          ItemTier: itemTier,
          ItemGradeQuality: itemGradeQuality,
          ItemGrade: itemGrade,
        },
      }),
    );
  };

  return (
    <>
      <ListItem>
        <ListItemButton disableGutters onClick={() => setOpen(true)}>
          {children}
        </ListItemButton>
      </ListItem>
      <Dialog open={open} onClose={onClose} maxWidth={"xs"}>
        <DialogTitle>검색 옵션 설정</DialogTitle>
        <DialogContent>
          <Grid container columnSpacing={2} rowSpacing={1}>
            <Grid item xs={4}>
              <ItemTiersInput
                value={itemTier}
                setValue={(v) => setItemTier(v)}
                options={auctionOptions.ItemTiers}
              />
            </Grid>
            <Grid item xs={8}>
              <ItemGradeInput
                grade={itemGrade}
                setGrade={(v) => setItemGrade(v)}
                options={auctionOptions.ItemGrades}
              />
            </Grid>
            <Grid item xs={5}>
              <ItemGradeQualityInput
                quality={itemGradeQuality}
                setQuality={(v) => setItemGradeQuality(v)}
                options={auctionOptions.ItemGradeQualities}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant={"outlined"} autoFocus onClick={onSave}>
            적용
          </Button>
          <Button variant={"outlined"} onClick={onClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
