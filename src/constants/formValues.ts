import { CategoryCreation, LoginProps, SignupProps, SubCategoryCreation } from "@/types/global";
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