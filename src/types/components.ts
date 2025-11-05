import { Category, ProductGlobal, SubCategoryGlobal, User } from "./global";
import { Notification, Variant } from "./variables";

export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
  title?: string
};

export type ToastProps = {
  onClose: () => void;
  index: number
} & ToastMessage;

export type Warning = {
  message: string;
  btn1?: string;
  btn2: string;
  styleBtn1?: Variant;
  styleBtn2?: Variant;
  handleBtn2: () => void;
};

export type WarningProps = {
  onClose: () => void
} & Warning

export type CommonParentProps = {
  readonly children: React.ReactNode
}

export type ErrorPageProps = {
  msg?: string,
  action: () => void
}

export type EmptyElementProps = {
  title?: string,
  desc?: string
  button?: {
    action: () => void
    msg: string
  }
}

export type CategoryProps = {
  category: Category
}

export interface AvatarProps {
  firstName: string;
  width?: number,
  height?: number
}

export interface NotificationsProps {
  notifications: Notification[]
}

export type SubCategoryProps = {
  subCategory: SubCategoryGlobal
}

export type ProductProps = {
  product: ProductGlobal
}

export type UserProps = {
  user: User
}