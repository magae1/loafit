export enum ITEM_OPTION_TYPES {
  SKILL = "SKILL",
  STAT = "STAT",
  ABILITY_ENGRAVE = "ABILITY_ENGRAVE",
  BRACELET_SPECIAL_EFFECTS = "BRACELET_SPECIAL_EFFECTS",
  GEM_SKILL_COOLDOWN_REDUCTION = "GEM_SKILL_COOLDOWN_REDUCTION",
  GEM_SKILL_COOLDOWN_REDUCTION_IDENTITY = "GEM_SKILL_COOLDOWN_REDUCTION_IDENTITY",
  GEM_SKILL_DAMAGE = "GEM_SKILL_DAMAGE",
  GEM_SKILL_DAMAGE_IDENTITY = "GEM_SKILL_DAMAGE_IDENTITY",
  BRACELET_RANDOM_SLOT = "BRACELET_RANDOM_SLOT",
}

export enum AUCTION_SORT_TYPES {
  BIDSTART_PRICE = "BIDSTART_PRICE",
  BUY_PRICE = "BUY_PRICE",
  EXPIREDATE = "EXPIREDATE",
  ITEM_GRADE = "ITEM_GRADE",
  ITEM_LEVEL = "ITEM_LEVEL",
  ITEM_QUALITY = "ITEM_QUALITY",
}

export enum JEWELRY_TYPES {
  NECKLACE = "목걸이",
  EARRING = "귀걸이",
  RING = "반지",
  BRACELET = "팔찌",
}
export const JEWELRY = "장신구";
export const STONE = "어빌리티 스톤";

export type TStat = {
  Type: string;
  Value: string;
  Tooltip: string[];
};

export type TTendency = {
  Type: string;
  Point: number;
  MaxPoint: number;
};

export type TArmoryProfile = {
  CharacterImage: string;
  ExpeditionLevel: number;
  PvpGradeName: string;
  TownLevel: string;
  TownName: string;
  Title: string;
  GuildMemberGrade: string;
  GuildName: string;
  UsingSkillPoint: number;
  TotalSkillPoint: number;
  Stats: TStat[] | null;
  Tendencies: TTendency[];
  ServerName: string;
  CharacterName: string;
  CharacterLevel: number;
  CharacterClassName: string;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
};

export type TArmoryEquipment = {
  Type: string;
  Name: string;
  Icon: string;
  Grade: string;
  Tooltip: string;
};

export type TArmoryAvatar = {
  Type: string;
  Name: string;
  Icon: string;
  Grade: string;
  IsSet: boolean;
  IsInner: boolean;
  Tooltip: string;
};

export type TSkillTripod = {
  Tier: number;
  Slot: number;
  Name: string;
  Icon: string;
  Level: number;
  IsSelected: boolean;
  Tooltip: string;
};

export type TSkillRune = {
  Name: string;
  Icon: string;
  Grade: string;
  Tooltip: string;
};

export type TArmorySkill = {
  Name: string;
  Icon: string;
  Level: number;
  Type: string;
  IsAwakening: boolean;
  Tripods: TSkillTripod[];
  Rune: TSkillRune[];
  Tooltip: string;
};

export type TEngraving = {
  Slot: number;
  Name: string;
  Icon: string;
  Tooltip: string;
};

export type TEngravingEffect = {
  Icon: string;
  Name: string;
  Description: string;
};

export type TArmoryEngraving = {
  Engravings: TEngraving[];
  Effects: TEngravingEffect[];
};

export type TAuctionInfo = {
  StartPrice: number;
  BuyPrice: number | null;
  BidPrice: number;
  EndDate: Date;
  BidCount: number;
  BidStartPrice: number;
  IsCompetitive: boolean;
  TradeAllowCount: number;
};

export type TItemOption = {
  Type: ITEM_OPTION_TYPES | null;
  OptionName: string;
  OptionNameTripod: string;
  Value: number;
  IsPenalty: boolean;
  ClassName: string | null;
};

export type TAuctionItem = {
  Name: string;
  Grade: string;
  Tier: number;
  Level: number | null;
  Icon: string;
  GradeQuality: number;
  Options: TItemOption[];
  AuctionInfo?: TAuctionInfo;
};

export type TCharacterData = {
  ArmoryProfile: TArmoryProfile;
  ArmoryEquipment: TArmoryEquipment[] | null;
  ArmoryAvatars: TArmoryAvatar[] | null;
  ArmoryEngraving: TArmoryEngraving | null;
};

export type TActiveStat = {
  Name: string;
  Value: number;
};

export type TActiveEngraving = {
  Name: string;
  Value: number;
  IsPenalty: boolean;
};

export type TFittingItem = {
  codeName: string;
  item?: TAuctionItem;
  prevItem?: TAuctionItem;
  updatedAt?: number;
  searchOption: IIndividualRequestItems;
};

export interface TJewelry extends TFittingItem {
  prevItem?: TAuctionItem;
}

export interface TStone extends TFittingItem {
  engravings: TActiveEngraving[];
}

export type TEngravingSlot = {
  Slot: number;
  Effect: TActiveEngraving;
  isActive: boolean;
};

export type TMarketItem = {
  Id: number;
  Name: string;
  Grade: string;
  Icon: string;
  BundleCount: number;
  TradeRemainCount: number | null;
  YDayAvgPrice: number;
  RecentPrice: number;
  CurrentMinPrice: number;
};

export type TMarketList = {
  PageNo: number;
  PageSize: number;
  TotalCount: number;
  Items: TMarketItem[];
};

export type TMarketStatsInfo = {
  Date: Date;
  AvgPrice: number;
  TradeCount: number;
};

export type TMarketItemStats = {
  Name: string;
  TradeRemainCount: number | null;
  BundleCount: number;
  Stats: TMarketStatsInfo[];
  Tooltip: string;
};

export type TNotice = {
  Title: string;
  Date: Date;
  Link: string;
  Type: string;
};

export type TEtcSub = {
  Value: number;
  Text: string;
  Class: string;
};

export type TEtcOption = {
  Value: number;
  Text: string;
  EtcSubs: TEtcSub[];
};

export type TCategoryItem = {
  Code: number;
  CodeName: string;
};

export type TCategory = {
  Subs: TCategoryItem[];
  Code: number;
  CodeName: string;
};

export type TTripod = {
  Value: number;
  Text: string;
  IsGem: boolean;
};

export type TSkillOption = {
  Value: number;
  Class: string;
  Text: string;
  IsSkillGroup: boolean;
  Tripods: TTripod[];
};

export type TAuctionOption = {
  MaxItemLevel: number;
  ItemGradeQualities: number[];
  SkillOptions: TSkillOption[];
  EtcOptions: TEtcOption[];
  Categories: TCategory[];
  ItemGrades: string[];
  ItemTiers: number[];
  Classes: string[];
};

type TMinMaxValue = {
  MinValue: number | null;
  MaxValue: number | null;
};

export interface TSearchDetailOption extends TMinMaxValue {
  FirstOption: number;
  SecondOption: number | null;
}

export interface TDetailSkillOption extends TMinMaxValue {
  Value: number;
  Class: string;
  Text: string;
  IsSkillGroup: boolean;
  Tripod: TTripod;
}

export interface TDetailEtcOption extends TMinMaxValue {
  Value: number;
  Text: string;
  EtcSub: TEtcSub;
}

export type TCommonRequestItems = {
  CharacterClass: string | null;
};

type TIndividualRequestItems = {
  ItemLevelMin: number;
  ItemLevelMax: number;
  ItemGradeQuality: number | null;
  ItemTier: number;
  ItemGrade: string | null;
  ItemName: string | null;
  CategoryCode: number | null;
};

export type TDetailRequestItems = {
  SkillOptions: TDetailSkillOption[];
  EtcOptions: TDetailEtcOption[];
};

export interface IIndividualRequestItems
  extends TIndividualRequestItems,
    TDetailRequestItems {}

export type TRequestItems = {
  SkillOptions: TSearchDetailOption[];
  EtcOptions: TSearchDetailOption[];
};

export type ExpendedRequestItems = {
  Sort: AUCTION_SORT_TYPES;
  PageNo: number;
  SortCondition: "ASC" | "DESC";
};
export interface TRequestAuctionItems
  extends TCommonRequestItems,
    TIndividualRequestItems,
    TRequestItems,
    ExpendedRequestItems {}

export type TAuction = {
  PageNo: number;
  PageSize: number;
  TotalCount: number;
  Items: TAuctionItem[] | null;
};
