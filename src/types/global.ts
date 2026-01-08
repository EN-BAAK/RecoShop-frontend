import { GOVERNORATE, ROLE, SEX } from "./variables";

export type User = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  governorate: GOVERNORATE,
  role: ROLE,
  gender: SEX
}

export type UserGlobal = Omit<User, "role"> & {
  isVerified: boolean
}

export type CachedUser = { data: User; timestamp: number } | null

export type LoginProps = {
  email: string,
  password: string
}

export type SignupProps = Omit<User, "id" | "role"> & {
  password: string
  confirmPassword: string
}

export type Category = {
  id: number
  title: string
  desc: string
}

export type CategoryCreation = Omit<Category, "id">

export type SubCategory = {
  id: number,
  title: string,
  desc: string,
  categoryId: number
}

export type SubCategoryCreation = Omit<SubCategory, "id">

export type SubCategoryGlobal = Omit<SubCategory, "categoryId"> & {
  category: string
}

export type Notification = {
  id: number,
  message: string
}

export type Product = {
  id: number,
  title: string
  brand: string
  price: number
  desc: string
  imgURL?: string
}

export type ShopProduct = {
  categories: string[],
} & Omit<Product, "imgURL">

export type ProductCreation = Omit<Product, "id" | "imgURL" | "brand"> & {
  categories: string[],
  brandId: number
}

export type ProductGlobal = Omit<Product, "imgURL"> & {
  subCategories: Omit<SubCategory, "desc" | "categoryId">[],
  category: string
}

export type VerifyAccountProps = {
  code: string
}

export type ForgotPasswordStep1 = {
  email: string
}

export type ForgotPasswordStep2 = {
  code: string,
  password: string,
  confirmPassword: string
}

export interface AccessItem {
  authorized: boolean;
  path: string;
  roles: ROLE[];
  children?: AccessItem[];
}

export type Brand = {
  id: number,
  name: string,
  imgURL?: string,
}

export type BrandCreation = Omit<Brand, "id" | "imgURL">

export interface BasketItem {
  id: number;
  quantity: number;
  title: string,
  price: number
}

export interface Bill {
  id: number
  createdAt: string
  amount: number
  products: {
    id: number
    title: string
    price: number
    quantity: number
  }[]
}

export type Comment = {
  id: number,
  name: string,
  date: Date,
  comment: string
}

export type CommentCreation = {
  comment: string
}