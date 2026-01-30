import { LucideIcon } from "lucide-react";
import { Bill, BranchGlobal, Brand, Category, GroupBranch, Message, ProductGlobal, ShopProduct, SubCategoryGlobal, UserGlobal } from "./global";
import { Notification, SEX, Variant } from "./variables";

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

export type LoadingPageProps = {
  className?: string,
  msg?: string
}

export type ErrorPageProps = {
  msg?: string,
  className?: string,
  action: () => void
}

export type EmptyElementProps = {
  title?: string,
  className?: string,
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

export type DashboardProductProps = {
  product: ProductGlobal
}

export type UserProps = {
  user: UserGlobal
}

export type ProductImageProps = {
  id: number,
  imageStyle?: string,
  title: string,
}

export type DashboardBrandImagProps = {
  id: number,
  imageStyle?: string,
  title: string,
}

export type ShopBrandImagProps = {
  imageStyle?: string,
  title: string,
}

export type BrandProps = {
  brand: Brand
}

export type GenderBadgeProps = {
  gender: SEX
}

export type ShopProductProps = {
  product: ShopProduct,
  dir?: "vertical" | "horizontal"
}

export type ShopProductSection = {
  category: string
}

export type PaginationProps = {
  currentPage: number,
  totalPages: number,
  isLoading?: boolean,
  handleSetCurrentPageFunc: (page: number) => void
}

export type ShopProductDetailsProps = {
  product: ShopProduct
}

export type ProductRatingProps = {
  average: number,
  count: number,
  productId: number
}

export type ProductCommentsProps = {
  productId: number,

}

export type ShopRelatedProductsProps = {
  id: number
}

export interface BillProps {
  bill: Bill
}

export interface DatePickerButtonProps {
  date: string | undefined
  onDateChange: (date: string | undefined) => void
  placeholder: string
}

export type StatCardProps = {
  title: string
  value: number | undefined
  Icon: LucideIcon
  IconClassName?: string
  isLoading?: boolean,
  gradientFrom?: string
  gradientTo?: string,
}

export type UsersNumberProps = {
  total: number,
  title: string,
  gradientFrom: string
  gradientTo: string,
  color: string,
  isAdmin?: boolean
}

export type SectionHolderProps = {
  title: string,
  desc?: string,
  sectionStyle?: string
  decoration?: boolean
} & CommonParentProps

export interface BranchProps {
  branch: BranchGlobal;
}

export interface GroupBranchProps {
  group: GroupBranch;
}

export interface HeroBranchCardProps {
  branch: BranchGlobal;
  side: "right" | "left"
}

export interface MessageProps {
  message: Message
}