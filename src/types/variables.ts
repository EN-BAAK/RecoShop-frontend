export type Variant = "primary" | "primary-outline" | "accent" | "accent-outline" | "danger" | "danger-outline" | "orange" | "orange-outline" | "transparent" | "transparent-outline" | "primary-gradient" | "primary-gradient-outline" | "accent-gradient" | "accent-gradient-outline";

export enum ROLE {
  ADMIN = "Admin",
  CLIENT = "Client"
}
export type Input = "text" | "color" | "number" | "password" | "email";
export type Dir = "auto" | "ltr" | "rtl";
export enum SEX {
  MALE = "Male",
  FEMALE = "Female"
}
export enum GOVERNORATE {
  DAMASCUS = "دمشق",
  RIF_DIMASHQ = "ريف دمشق",
  ALEPPO = "حلب",
  HOMS = "حمص",
  HAMA = "حماة",
  LATAKIA = "اللاذقية",
  TARTUS = "طرطوس",
  IDLIB = "إدلب",
  DEIR_EZZOR = "دير الزور",
  RAQQA = "الرقة",
  HASAKAH = "الحسكة",
  DARAA = "درعا",
  AS_SWEIDA = "السويداء",
  QUNEITRA = "القنيطرة",
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