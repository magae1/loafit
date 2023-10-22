import _ from "underscore";
import { parse } from "node-html-parser";

import {
  TArmoryEquipment,
  TItem,
  TItemOption,
  ITEM_OPTION_TYPES,
} from "@/libs/types";

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
    return _.chain(parse(v.Element_001).text.match(/[가-힣]* \+[0-9]+/g))
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

const itemTitleParser = (v: TItemTitle): number[] => {
  const tierElement = parse(v.leftStr2).firstChild;
  const gradeQuality = v.qualityValue;
  const tier = tierElement.text.split(" ").pop();
  return [tier ? parseInt(tier) : -1, gradeQuality];
};

export const equipmentParser = (equipment: TArmoryEquipment): TItem => {
  const tooltipObj = JSON.parse(equipment.Tooltip);
  const options = _.chain(tooltipObj)
    .values()
    .filter((v) => v.type === "ItemPartBox")
    .map((v) => itemPartBoxParser(v.value))
    .flatten()
    .compact();

  const titleObjects = _.chain<TItemTitle>(tooltipObj)
    .values()
    .find((v) => v.type === "ItemTitle");

  const [tier, quality] = itemTitleParser(titleObjects.value().value);

  return {
    Name: equipment.Name,
    Grade: equipment.Grade,
    Icon: equipment.Icon,
    Tier: tier,
    GradeQuality: quality,
    Level: null,
    Options: options.value(),
  };
};
