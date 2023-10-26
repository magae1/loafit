import _ from "underscore";
import { HTMLElement, parse } from "node-html-parser";

import {
  TArmoryEquipment,
  TItemOption,
  ITEM_OPTION_TYPES,
  TJewelry,
  TActiveEngravingEffect,
  TStone,
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

type TIndentString = {
  bPoint: number;
  contentStr: string;
  pointType: number;
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

const itemTitleParser = (v: TItemTitle): number[] => {
  const tierElement = parse(v.leftStr2).firstChild;
  const gradeQuality = v.qualityValue;
  const tier = tierElement.text.split(" ").pop();
  return [tier ? parseInt(tier) : -1, gradeQuality];
};

export const equipmentParser = (equipment: TArmoryEquipment): TJewelry => {
  const tooltipObj = JSON.parse(equipment.Tooltip);

  const titleObjects = _.chain<TItemTitle>(tooltipObj)
    .values()
    .find((v) => v.type === "ItemTitle");

  const options = _.chain(tooltipObj)
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
  };
};

const optionToCurValues = (option: TItemOption): TActiveEngravingEffect => {
  return {
    Name: option.OptionName,
    Value: option.Value,
    IsPenalty: option.IsPenalty,
  };
};

export const stoneParser = (equipment: TArmoryEquipment): TStone => {
  const data = equipmentParser(equipment);
  const stoneOptions = data.item?.Options.map((v) => optionToCurValues(v));
  return {
    currentEffects: stoneOptions ?? [],
    codeName: data.codeName,
    item: data.item,
  };
};
