export type Variant = "primary" | "primary-outline" | "accent" | "accent-outline" | "danger" | "danger-outline" | "orange" | "orange-outline" | "transparent" | "transparent-outline" | "primary-gradient" | "primary-gradient-outline" | "accent-gradient" | "accent-gradient-outline";

export enum ROLE {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  MANAGER = "MANAGER"
}
export type Input = "text" | "color" | "number" | "password" | "email";
export type Dir = "auto" | "ltr" | "rtl";
export enum SEX {
  MALE = "Male",
  FEMALE = "Female"
}
export enum GOVERNORATE {
  DAMASCUS = "Damascus",
  RIF_DIMASHQ = "Rural Damascus",
  ALEPPO = "Aleppo",
  HOMS = "Homs",
  HAMA = "Hama",
  LATAKIA = "Latakia",
  TARTUS = "Tartus",
  IDLIB = "Idlib",
  DEIR_EZZOR = "Deir ez-Zor",
  RAQQA = "Raqqa",
  HASAKAH = "Al-Hasakah",
  DARAA = "Daraa",
  AS_SWEIDA = "As-Suwayda",
  QUNEITRA = "Quneitra",
}

export interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}
export type SelectOption = {
  key: string;
  value: string;
}
export type Notification = {
  id: number,
  msg: string
}