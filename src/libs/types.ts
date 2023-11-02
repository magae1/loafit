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
  Stats: TStat[];
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
  BuyPrice: number;
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
  ArmoryEquipment: TArmoryEquipment[];
  ArmoryAvatars: TArmoryAvatar[];
  ArmoryEngraving: TArmoryEngraving;
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
  item: TAuctionItem | null;
};

export interface TJewelry extends TFittingItem {}

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

export type wearingType = {
  necklace: TJewelry;
  earring1: TJewelry;
  earring2: TJewelry;
  ring1: TJewelry;
  ring2: TJewelry;
  bracelet: TJewelry;
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

export type TSearchDetailOption = {
  FirstOption: number;
  SecondOption: number | null;
  MinValue: number | null;
  MaxValue: number | null;
};

export type TRequestAuctionItems = {
  ItemLevelMin: number;
  ItemLevelMax: number;
  ItemGradeQuality: number | null;
  SkillOptions: TSearchDetailOption[];
  EtcOptions: TSearchDetailOption[];
  Sort: AUCTION_SORT_TYPES;
  CategoryCode: number | null;
  CharacterClass: string | null;
  ItemTier: number;
  ItemGrade: string | null;
  ItemName: string | null;
  PageNo: number;
  SortCondition: "ASC" | "DESC";
};
