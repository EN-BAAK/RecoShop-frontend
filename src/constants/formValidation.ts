import { LoginProps, SignupProps } from "@/types/global"
import * as Yup from "yup"

export const login = Yup.object<LoginProps>({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
})

export const signup = Yup.object<SignupProps>({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^09\d{8}$/, "Enter a valid Syrian phone number (starting with 09)")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Password confirmation is required"),
  governorate: Yup.string().required("Please select a governorate"),
  gender: Yup.string().required("Please select a gender"),
});

export const createCategory = Yup.object({
  title: Yup.string()
    .required("Category name is required")
    .min(2, "Category name must be at least 2 characters")
    .max(35, "Category name is too long"),
  desc: Yup.string()
    .max(200, "Description is too long")
    .required("Description is required"),
});

export const editCategory = Yup.object({
  title: Yup.string()
    .min(2, "Category name must be at least 2 characters")
    .max(35, "Category name is too long"),
  desc: Yup.string().max(200, "Description is too long"),
});

export const createSubCategory = Yup.object({
  title: Yup.string()
    .required("Subcategory name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  desc: Yup.string()
    .max(500, "Description is too long")
    .required("Description is required"),
  categoryId: Yup.number()
    .required("A parent category must be selected")
    .min(1, "Select a valid category"),
});

export const editSubCategory = Yup.object({
  title: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .optional(),
  desc: Yup.string()
    .max(500, "Description is too long")
    .optional(),
  categoryId: Yup.number()
    .min(1, "Select a valid category")
    .optional(),
});

export const createProduct = Yup.object({
  title: Yup.string()
    .required("Product name is required")
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name is too long (max 100 characters)"),

  brand: Yup.string()
    .required("Brand is required")
    .min(2, "Brand name is too short")
    .max(50, "Brand name is too long"),

  price: Yup.number()
    .typeError("Enter a valid number for price")
    .required("Price is required")
    .positive("Price must be positive")
    .max(100000000, "Price is too high"),

  desc: Yup.string().max(500, "Description is too long (max 500 characters)"),

  // categories: Yup.array()
  //   .of(Yup.string().required())
  //   .min(1, "Select at least one category")
  //   .required("Categories selection is required"),
  categoryId: Yup.number()
    .min(1, "Select a valid category")
    .optional(),
});

export const editProduct = Yup.object({
  title: Yup.string()
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name is too long (max 100 characters)")
    .optional(),

  brand: Yup.string()
    .min(2, "Brand name is too short")
    .max(50, "Brand name is too long")
    .optional(),

  price: Yup.number()
    .typeError("Enter a valid number for price")
    .positive("Price must be positive")
    .max(100000000, "Price is too high")
    .optional(),

  desc: Yup.string()
    .max(500, "Description is too long (max 500 characters)")
    .optional(),

  // categories: Yup.array()
  //   .of(Yup.number().required())
  //   .min(1, "Select at least one category")
  //   .optional(),
  categoryId: Yup.number()
    .min(1, "Select a valid category")
    .optional(),
});

export const verifyAccount = Yup.object({
  code: Yup.string()
    .required("Verification code is required")
    .length(6, "Verification code must be exactly 6 characters"),
});

export const forgotPasswordStep1 = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
});

export const forgotPasswordStep2 = Yup.object({
  code: Yup.string()
    .required("Verification code is required")
    .length(6, "Verification code must be exactly 6 characters"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});
