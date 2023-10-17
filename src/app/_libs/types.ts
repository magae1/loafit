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
  Type: string;
  OptionName: string;
  OptionNameTripod: string;
  Value: number;
  IsPenalty: boolean;
  ClassName: string | null;
};

export type TItem = {
  Name: string;
  Grade: string;
  Tier: number;
  Level: number | null;
  Icon: string;
  GradeQuality: number;
  Options: TItemOption[];
};

export interface IAuctionItem extends TItem {
  AuctionInfo: TAuctionInfo;
}

export type TCharacterData = {
  ArmoryProfile: TArmoryProfile;
  ArmoryEquipment: TArmoryEquipment[];
  ArmoryAvatars: TArmoryAvatar[];
  ArmoryEngraving: TArmoryEngraving;
};
