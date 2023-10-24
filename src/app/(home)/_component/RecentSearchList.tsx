"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Chip, Typography } from "@mui/material";
import _ from "underscore";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/redux/store";
import { CustomScrollBarBox } from "@/components/styles";
import {
  addSearchInput,
  removeSearchInput,
} from "@/redux/features/characterSearchSlice";

const str =
  '{\r\n  "Element_000": {\r\n    "type": "NameTagBox",\r\n    "value": "<P ALIGN=\'CENTER\'><FONT COLOR=\'#E3C7A1\'>준엄한 비상의 돌 IV</FONT></P>"\r\n  },\r\n  "Element_001": {\r\n    "type": "ItemTitle",\r\n    "value": {\r\n      "bEquip": 0,\r\n      "leftStr0": "<FONT SIZE=\'12\'><FONT COLOR=\'#E3C7A1\'>고대 어빌리티 스톤</FONT></FONT>",\r\n      "leftStr2": "<FONT SIZE=\'14\'>아이템 티어 3</FONT>",\r\n      "qualityValue": -1,\r\n      "rightStr0": "<FONT SIZE=\'12\'><FONT COLOR=\'#FFD200\'>장착중</FONT></FONT>",\r\n      "slotData": {\r\n        "advBookIcon": 0,\r\n        "battleItemTypeIcon": 0,\r\n        "cardIcon": false,\r\n        "friendship": 0,\r\n        "iconGrade": 6,\r\n        "iconPath": "https://cdn-lostark.game.onstove.com/efui_iconatlas/ability/ability_257.png",\r\n        "imagePath": "",\r\n        "islandIcon": 0,\r\n        "rtString": "",\r\n        "seal": false,\r\n        "temporary": 0,\r\n        "town": 0,\r\n        "trash": 0\r\n      }\r\n    }\r\n  },\r\n  "Element_002": {\r\n    "type": "SingleTextBox",\r\n    "value": "<FONT SIZE=\'12\'>캐릭터 귀속됨</FONT>"\r\n  },\r\n  "Element_003": {\r\n    "type": "MultiTextBox",\r\n    "value": "|<font color=\'#C24B46\'>거래 불가</font>"\r\n  },\r\n  "Element_004": {\r\n    "type": "ItemPartBox",\r\n    "value": {\r\n      "Element_000": "<FONT COLOR=\'#A9D0F5\'>기본 효과</FONT>",\r\n      "Element_001": "체력 +21326"\r\n    }\r\n  },\r\n  "Element_005": {\r\n    "type": "ItemPartBox",\r\n    "value": {\r\n      "Element_000": "<FONT COLOR=\'#A9D0F5\'>세공 단계 보너스</FONT>",\r\n      "Element_001": "체력 +3201"\r\n    }\r\n  },\r\n  "Element_006": {\r\n    "type": "IndentStringGroup",\r\n    "value": {\r\n      "Element_000": {\r\n        "contentStr": {\r\n          "Element_000": {\r\n            "bPoint": 0,\r\n            "contentStr": "[<FONT COLOR=\'#FFFFAC\'>원한</FONT>] 활성도 +9<BR>",\r\n            "pointType": 2\r\n          },\r\n          "Element_001": {\r\n            "bPoint": 0,\r\n            "contentStr": "[<FONT COLOR=\'#FFFFAC\'>아드레날린</FONT>] 활성도 +7<BR>",\r\n            "pointType": 2\r\n          },\r\n          "Element_002": {\r\n            "bPoint": 0,\r\n            "contentStr": "[<FONT COLOR=\'#FE2E2E\'>공격력 감소</FONT>] 활성도 +2<BR>",\r\n            "pointType": 2\r\n          }\r\n        },\r\n        "topStr": "<FONT SIZE=\'12\' COLOR=\'#A9D0F5\'>무작위 각인 효과</FONT>"\r\n      }\r\n    }\r\n  },\r\n  "Element_007": {\r\n    "type": "SingleTextBox",\r\n    "value": "<FONT COLOR=\'#E2C87A\'><FONT SIZE=\'12\'>푸른 기운과 붉은 기운이 희미하게 뒤섞여 신묘한 느낌이 난다. 자세히 보고 싶지만 더 만졌다가는 부서져 버릴 것 같다.<br><br><FONT COLOR=\'#FFFFAC\'>어빌리티 스톤 세공사에게 세공 완료 후 장착 가능합니다.</FONT></FONT></FONT>"\r\n  },\r\n  "Element_008": {\r\n    "type": "SingleTextBox",\r\n    "value": "<FONT SIZE=\'12\'><FONT COLOR=\'#C24B46\'>판매불가</FONT></FONT>"\r\n  },\r\n  "Element_009": {\r\n    "type": "SingleTextBox",\r\n    "value": "<Font color=\'#5FD3F1\'>[대도시] 어빌리티 스톤 세공사 - 스톤 승급</font>"\r\n  }\r\n}';

export default function RecentSearchList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const recentSearchList = useAppSelector(
    (state) => state.characterSearch.value,
  );
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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ paddingLeft: 15, paddingRight: 5 }}>
      <Typography variant={"overline"} lineHeight={0.5} gutterBottom>
        최근 검색어
      </Typography>
      <CustomScrollBarBox
        component={"ul"}
        sx={{ listStyle: "none", m: 0, p: 0 }}
      >
        {mounted &&
          recentSearches.map((item) => (
            <li key={_.uniqueId("recent-search-chips")} style={{ margin: 4 }}>
              <Chip
                label={item.name}
                onClick={() => {
                  dispatch(addSearchInput(item.name));
                  router.push(`/character/${item.name}`);
                }}
                onDelete={() => dispatch(removeSearchInput(item.name))}
              />
            </li>
          ))}
      </CustomScrollBarBox>
    </div>
  );
}
