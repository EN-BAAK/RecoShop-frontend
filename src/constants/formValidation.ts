import { ChangePasswordProps } from "@/types/forms";
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

  brandId: Yup.number()
    .required("Brand is required")
    .min(1, "Select a valid brand"),

  price: Yup.number()
    .typeError("Enter a valid number for price")
    .required("Price is required")
    .positive("Price must be positive")
    .max(100000000, "Price is too high"),

  desc: Yup.string().max(500, "Description is too long (max 500 characters)"),

  categories: Yup.array()
    .of(
      Yup.string()
        .required()
    )
    .min(1, "Select at least one category")
    .required("Categories selection is required")
});

export const editProduct = Yup.object({
  title: Yup.string()
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name is too long (max 100 characters)")
    .optional(),

  brandId: Yup.string()
    .min(1, "Select a valid brand")
    .optional(),

  price: Yup.number()
    .typeError("Enter a valid number for price")
    .positive("Price must be positive")
    .max(100000000, "Price is too high")
    .optional(),

  desc: Yup.string()
    .max(500, "Description is too long (max 500 characters)")
    .optional(),

  categories: Yup.array()
    .of(
      Yup.string()
        .required()
    )
    .min(1, "Select at least one category")
    .optional()
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

export const createBrand = Yup.object().shape({
  name: Yup.string()
    .required("Brand name is required")
    .min(2, "Brand name must be at least 2 characters")
    .max(50, "Brand name cannot exceed 50 characters"),
});

export const postComment = Yup.object({
  comment: Yup.string().min(3, 'Comment must be at least 3 characters')
})

export const postMessage = Yup.object({
  message: Yup.string().min(3, 'Message must be at least 3 characters')
})

export const changePasswordValidation = Yup.object<ChangePasswordProps>({
  oldPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Old password is required"),

  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),

  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords do not match")
    .required("Please confirm your new password"),
});

export const createGroupBranch = Yup.object({
  name: Yup.string()
    .required("Group name is required")
    .min(2, "Group name must be at least 2 characters")
    .max(50, "Group name is too long (max 50 characters)"),
});

export const editGroupBranch = Yup.object({
  name: Yup.string()
    .min(2, "Group name must be at least 2 characters")
    .max(50, "Group name is too long (max 50 characters)")
    .optional(),
});

export const createBranch = Yup.object({
  name: Yup.string()
    .required("Branch name is required")
    .min(2, "Branch name must be at least 2 characters")
    .max(100, "Branch name is too long (max 100 characters)"),

  location: Yup.string()
    .max(200, "Location is too long (max 200 characters)")
    .optional(),

  phone: Yup.string()
    .matches(
      /^[+0-9\s-]{7,20}$/,
      "Enter a valid phone number"
    )
    .optional(),

  telephone: Yup.string()
    .matches(
      /^[0-9\s-]{6,20}$/,
      "Enter a valid telephone number"
    )
    .optional(),

  facebook: Yup.string()
    .url("Enter a valid Facebook URL")
    .optional(),

  instagram: Yup.string()
    .url("Enter a valid Instagram URL")
    .optional(),

  groupId: Yup.number()
    .min(1, "Select a valid group")
    .optional(),
});

export const editBranch = Yup.object({
  name: Yup.string()
    .min(2, "Branch name must be at least 2 characters")
    .max(100, "Branch name is too long (max 100 characters)")
    .optional(),

  location: Yup.string()
    .max(200, "Location is too long (max 200 characters)")
    .optional(),

  phone: Yup.string()
    .matches(
      /^[+0-9\s-]{7,20}$/,
      "Enter a valid phone number"
    )
    .optional(),

  telephone: Yup.string()
    .matches(
      /^[0-9\s-]{6,20}$/,
      "Enter a valid telephone number"
    )
    .optional(),

  facebook: Yup.string()
    .url("Enter a valid Facebook URL")
    .optional(),

  instagram: Yup.string()
    .url("Enter a valid Instagram URL")
    .optional(),

  groupId: Yup.number()
    .min(1, "Select a valid group")
    .optional(),
});
