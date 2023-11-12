"use client";
import { useCallback, useMemo, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";
import _ from "underscore";
import { useDispatch } from "react-redux";

import {
  STONE,
  TCategoryItem,
  TSearchDetailOption,
  wearingType,
} from "@/libs/types";
import { openAuction } from "@/redux/features/auctionSlice";
import { auctionOptions } from "@/libs/data";
import AuctionEtcOptionDialog from "@/components/AuctionEtcOptionDialog";

interface Props {
  type: keyof wearingType | typeof STONE;
  codeName: string;
}

export type option = {
  firstName: string;
  secondName: string;
  searchOption: TSearchDetailOption;
};

export default function JewelrySearchOptionList(props: Props) {
  const { type, codeName } = props;
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [detailOptions, setDetailOptions] = useState<option[]>([]);

  const code: number = useMemo(() => {
    return _.chain(auctionOptions.Categories)
      .map((v) => [
        v.Subs,
        { Code: v.Code, CodeName: v.CodeName } as TCategoryItem,
      ])
      .compact()
      .flatten()
      .find((v) => v.CodeName === codeName)
      .get("Code")
      .value();
  }, [codeName]);

  const addOption = useCallback((opt: option) => {
    setDetailOptions((prevState) => {
      const newState = [...prevState];
      newState.push(opt);
      return newState;
    });
  }, []);

  const deleteOption = useCallback(
    (idx: number) => {
      if (0 <= idx && idx < detailOptions.length) {
        setDetailOptions((prevState) => {
          return prevState.toSpliced(idx, 1);
        });
      }
    },
    [detailOptions],
  );

  return (
    <>
      <List
        dense
        subheader={
          <ListSubheader sx={{ lineHeight: "24px" }}>
            검색 세부 옵션
          </ListSubheader>
        }
      >
        {detailOptions.length > 0 ? (
          detailOptions.map((opt, i) => (
            <ListItem
              sx={{ ml: 3 }}
              disableGutters
              key={_.uniqueId("detail-option-list-items")}
            >
              <ListItemAvatar sx={{ minWidth: "40px" }}>
                <IconButton onClick={() => deleteOption(i)}>
                  <RemoveCircle />
                </IconButton>
              </ListItemAvatar>
              <ListItemText
                primary={`${opt.firstName}: ${opt.secondName} ${
                  opt.searchOption.MinValue
                    ? `최소 ${opt.searchOption.MinValue}`
                    : ""
                } ${
                  opt.searchOption.MaxValue
                    ? `최대 ${opt.searchOption.MaxValue}`
                    : ""
                }`}
              />
            </ListItem>
          ))
        ) : (
          <ListItem sx={{ ml: 3 }}>
            <ListItemText secondary={"옵션이 없습니다."} />
          </ListItem>
        )}
        <ListItem>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button fullWidth onClick={() => setOpenDialog(true)}>
                세부 옵션 추가
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                onClick={() => {
                  dispatch(
                    openAuction({
                      type: type,
                      code: code,
                      detailOptions: detailOptions.map(
                        (opt) => opt.searchOption,
                      ),
                    }),
                  );
                }}
              >
                경매장 검색
              </Button>
            </Grid>
          </Grid>
        </ListItem>
      </List>
      <AuctionEtcOptionDialog
        open={openDialog}
        addOption={addOption}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
}
