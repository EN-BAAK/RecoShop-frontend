import { CategoryCreation, ForgotPasswordStep1, ForgotPasswordStep2, LoginProps, ProductCreation, SignupProps, SubCategoryCreation, VerifyAccountProps } from "@/types/global";
import { GOVERNORATE, SEX } from "@/types/variables";

export const login: LoginProps = {
  email: "",
  password: ""
}

export const signup: SignupProps = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  governorate: GOVERNORATE.DAMASCUS,
  gender: SEX.MALE,
};

export const category: CategoryCreation = {
  title: "",
  desc: ""
}

export const subcategory: SubCategoryCreation = {
  title: "",
  desc: "",
  categoryId: 0
}

export const product: ProductCreation = {
  title: "",
  brand: "",
  price: 0,
  desc: "",
  categories: [],
};

export const verifyAccount: VerifyAccountProps = {
  code: ""
}

export const forgotPasswordStep1: ForgotPasswordStep1 = { email: "" };
export const forgotPasswordStep2: ForgotPasswordStep2 = {
  code: "",
  password: "",
  confirmPassword: "",
};