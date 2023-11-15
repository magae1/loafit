import _ from "underscore";
import { parse } from "node-html-parser";

import {
  TArmoryEquipment,
  TItemOption,
  ITEM_OPTION_TYPES,
  TJewelry,
  TActiveEngraving,
  TStone,
  TEngraving,
  TEngravingSlot,
  TFittingItem,
  TActiveStat,
} from "@/libs/types";
import { basicOptions } from "@/libs/data";

type TItemPartBox = {
  Element_000: string;
  Element_001: string;
};

type TItemTitle = {
  bEquip: number;
  leftStr0: string;
  leftStr1: string;
  leftStr2: string;
  qualityValue: number;
};

type TIndentString = {
  bPoint: number;
  contentStr: string;
  pointType: number;
};

type TEngraveSkillTitle = {
  forceMiddleText: string;
  leftText: string;
  name: string;
  rightText: string;
  slotData: {
    iconGrade: number;
    iconPath: string;
    imagePath: string;
  };
};

const indentStringParser = (v: TIndentString[]): (TItemOption | null)[] =>
  v.map((item, i) => {
    const element = parse(item.contentStr);
    const text = element.text.trim();

    const name = text.match(/\[([가-힣| ])+]/i)?.[0];
    const value = text.match(/\+[0-9]+/i)?.[0];

    if (!name || !value) return null;

    return {
      Type: ITEM_OPTION_TYPES.ABILITY_ENGRAVE,
      OptionName: name.slice(1, -1),
      OptionNameTripod: "",
      Value: parseInt(value),
      IsPenalty: i === v.length - 1,
      ClassName: null,
    };
  });

const itemPartBoxParser = (v: TItemPartBox): TItemOption[] => {
  const element = parse(v.Element_000).firstChild;
  const type = element.text;
  if (type === "추가 효과") {
    return _.chain(v.Element_001.split("<BR>"))
      .map((v) => {
        const [name, value] = v.split(" ");
        return {
          Type: ITEM_OPTION_TYPES.STAT,
          OptionName: name,
          OptionNameTripod: "",
          Value: parseInt(value),
          IsPenalty: false,
          ClassName: null,
        };
      })
      .value();
  } else if (type === "팔찌 효과") {
    const element1 = parse(v.Element_001);
    return _.chain(element1.text.match(/[가-힣]* \+[0-9]+/g))
      .map((v) => {
        const [name, value] = v.split(" ");
        return {
          Type: ITEM_OPTION_TYPES.STAT,
          OptionName: name,
          OptionNameTripod: "",
          Value: parseInt(value),
          IsPenalty: false,
          ClassName: null,
        };
      })
      .value();
  }
  return [];
};

const singleTextBoxParser = (v: TEngraveSkillTitle): number => {
  const pointElement = parse(v.leftText);
  return parseInt(pointElement.text.split(" ").pop() ?? "0");
};

const itemTitleParser = (v: TItemTitle): number[] => {
  const tierElement = parse(v.leftStr2).firstChild;
  const gradeQuality = v.qualityValue;
  const tier = tierElement.text.split(" ").pop();
  return [tier ? parseInt(tier) : -1, gradeQuality];
};

const equipmentParser = (equipment: TArmoryEquipment): TFittingItem => {
  const tooltipObj = JSON.parse(equipment.Tooltip);

  const titleObjects = _.chain<TItemTitle>(tooltipObj)
    .values()
    .find((v) => v.type === "ItemTitle");

  const options = _.chain<TItemOption[]>(tooltipObj)
    .values()
    .groupBy((v) => v.type)
    .map((i, key) => {
      if (key === "ItemPartBox") {
        return i.map((v) => itemPartBoxParser(v.value));
      } else if (key === "IndentStringGroup") {
        return i.map((v) =>
          indentStringParser(_.values(v.value.Element_000.contentStr)),
        );
      }
      return null;
    })
    .flatten()
    .compact();

  const [tier, quality] = itemTitleParser(titleObjects.value().value);

  return {
    codeName: equipment.Type,
    item: {
      Name: equipment.Name,
      Grade: equipment.Grade,
      Icon: equipment.Icon,
      Tier: tier,
      GradeQuality: quality,
      Level: null,
      Options: options.value(),
    },
    searchOption: basicOptions,
  };
};

export const optionToEngraving = (option: TItemOption): TActiveEngraving => {
  return {
    Name: option.OptionName,
    Value: option.Value,
    IsPenalty: option.IsPenalty,
  };
};

const optionToStat = (option: TItemOption): TActiveStat => {
  return {
    Name: option.OptionName,
    Value: option.Value,
  };
};

export const stoneParser = (equipment: TArmoryEquipment): TStone => {
  const data = equipmentParser(equipment);
  const engravings = data.item?.Options.map(
    (v): TActiveEngraving => optionToEngraving(v),
  );
  return {
    ...data,
    engravings: engravings ?? [],
  };
};

export const jewelryParser = (equipment: TArmoryEquipment): TJewelry => {
  const data = equipmentParser(equipment);
  return {
    ...data,
  };
};

export const engravingParser = (engraving: TEngraving): TEngravingSlot => {
  const tooltipObj = JSON.parse(engraving.Tooltip);
  const value = singleTextBoxParser(tooltipObj.Element_001.value);

  return {
    Slot: engraving.Slot,
    Effect: {
      Name: engraving.Name,
      Value: value,
      IsPenalty: false,
    },
    isActive: true,
  };
};
