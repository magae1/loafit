"use client";
import { ReactNode, useCallback, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import _ from "underscore";

import ItemGradeInput from "@/components/auctioninputs/ItemGradeInput";
import { auctionOptions } from "@/libs/data";
import ItemGradeQualityInput from "@/components/auctioninputs/ItemGradeQualityInput";
import ItemTiersInput from "@/components/auctioninputs/ItemTiersInput";
import {
  wearingType,
  changeSearchOption,
} from "@/redux/features/wearingsSlice";
import { useAppSelector } from "@/redux/store";
import { TDetailEtcOption } from "@/libs/types";
import EtcOptionInput from "@/components/auctioninputs/EtcOptionInput";

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
  const [etcOptions, setEtcOptions] = useState<TDetailEtcOption[]>([]);

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
          EtcOptions: etcOptions,
        },
      }),
    );
  };

  const onDeleteOption = useCallback(
    (idx: number) => setEtcOptions((prevState) => prevState.toSpliced(idx, 1)),
    [],
  );

  const onAddOption = useCallback(
    (opt: TDetailEtcOption) =>
      setEtcOptions((prevState) => {
        const newState = [...prevState];
        newState.push(opt);
        return newState;
      }),
    [],
  );

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
            <Grid item xs={12}>
              <EtcOptionInput
                options={auctionOptions.EtcOptions}
                onAdd={onAddOption}
              >
                <List dense>
                  {_.isEmpty(etcOptions) ? (
                    <ListItem>기타 옵션이 설정되지 않았습니다.</ListItem>
                  ) : (
                    etcOptions.map((opt, idx) => (
                      <ListItem key={_.uniqueId("etc-options")}>
                        <ListItemText
                          primary={`${opt.EtcSub.Text} ${opt.MinValue ?? " "}~${
                            opt.MaxValue ?? " "
                          }`}
                          secondary={opt.Text}
                        />
                        <ListItemIcon>
                          <IconButton onClick={() => onDeleteOption(idx)}>
                            <Delete />
                          </IconButton>
                        </ListItemIcon>
                      </ListItem>
                    ))
                  )}
                </List>
              </EtcOptionInput>
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
