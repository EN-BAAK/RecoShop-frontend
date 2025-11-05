import { LoginProps, SignupProps } from "@/types/global"
import * as Yup from "yup"

export const login = Yup.object<LoginProps>({
  email: Yup.string()
    .email("البريد الإلكتروني غير صالح")
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .min(6, "كلمة المرور يجب أن تتكون من 6 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
})

export const signup = Yup.object<SignupProps>({
  firstName: Yup.string().required("الاسم الأول مطلوب"),
  lastName: Yup.string().required("الاسم الأخير مطلوب"),
  email: Yup.string()
    .email("البريد الإلكتروني غير صالح")
    .required("البريد الإلكتروني مطلوب"),
  phone: Yup.string()
    .matches(/^09\d{8}$/, "أدخل رقم موبايل سوري صالح (يبدأ بـ09)")
    .required("رقم الهاتف مطلوب"),
  password: Yup.string()
    .min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف")
    .required("كلمة المرور مطلوبة"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "كلمات المرور غير متطابقة")
    .required("تأكيد كلمة المرور مطلوب"),
  governorate: Yup.string().required("يرجى اختيار المحافظة"),
  gender: Yup.string().required("يرجى اختيار الجنس"),
});

export const createCategory = Yup.object({
  title: Yup.string()
    .required("اسم التصنيف مطلوب")
    .min(2, "اسم التصنيف يجب أن يكون حرفين على الأقل")
    .max(35, "اسم التصنيف طويل جداً"),
  desc: Yup.string()
    .max(200, "الوصف طويل جداً")
    .required("الوصف مطلوب"),
});

export const editCategory = Yup.object({
  title: Yup.string()
    .min(2, "اسم التصنيف يجب أن يكون حرفين على الأقل")
    .max(35, "اسم التصنيف طويل جداً"),
  desc: Yup.string()
    .max(200, "الوصف طويل جداً"),
});

export const createSubCategory = Yup.object({
  title: Yup.string()
    .required("اسم التصنيف الفرعي مطلوب")
    .min(2, "الاسم يجب أن يكون حرفين على الأقل")
    .max(100, "الاسم طويل جداً"),
  desc: Yup.string().max(500, "الوصف طويل جداً").required("الوصف مطلوب"),
  categoryId: Yup.number()
    .required("يجب اختيار تصنيف رئيسي")
    .min(1, "اختر تصنيفاً صالحاً"),
});

export const editSubCategory = Yup.object({
  title: Yup.string()
    .min(2, "الاسم يجب أن يكون حرفين على الأقل")
    .max(100, "الاسم طويل جداً")
    .optional(),
  desc: Yup.string().max(500, "الوصف طويل جداً").optional(),
  categoryId: Yup.number().min(1, "اختر تصنيفاً صالحاً").optional(),
});

export const createProduct = Yup.object({
  title: Yup.string()
    .required("اسم المنتج مطلوب")
    .min(3, "اسم المنتج يجب أن يحتوي على 3 أحرف على الأقل")
    .max(100, "اسم المنتج طويل جداً، الحد الأقصى 100 حرف"),

  brand: Yup.string()
    .required("العلامة التجارية مطلوبة")
    .min(2, "العلامة التجارية قصيرة جداً")
    .max(50, "العلامة التجارية طويلة جداً"),

  price: Yup.number()
    .typeError("يرجى إدخال رقم صحيح للسعر")
    .required("السعر مطلوب")
    .positive("السعر يجب أن يكون موجباً")
    .max(100000000, "السعر كبير جداً"),

  desc: Yup.string()
    .max(500, "الوصف طويل جداً (الحد الأقصى 500 حرف)"),

  categories: Yup.array()
    .of(Yup.string().required())
    .min(1, "يجب اختيار فئة واحدة على الأقل")
    .required("اختيار الفئات مطلوب"),
});

export const editProduct = Yup.object({
  title: Yup.string()
    .min(3, "اسم المنتج يجب أن يحتوي على 3 أحرف على الأقل")
    .max(100, "اسم المنتج طويل جداً، الحد الأقصى 100 حرف")
    .optional(),

  brand: Yup.string()
    .min(2, "العلامة التجارية قصيرة جداً")
    .max(50, "العلامة التجارية طويلة جداً")
    .optional(),

  price: Yup.number()
    .typeError("يرجى إدخال رقم صحيح للسعر")
    .positive("السعر يجب أن يكون موجباً")
    .max(100000000, "السعر كبير جداً")
    .optional(),

  desc: Yup.string()
    .max(500, "الوصف طويل جداً (الحد الأقصى 500 حرف)")
    .optional(),

  categories: Yup.array()
    .of(Yup.number().required())
    .min(1, "يجب اختيار فئة واحدة على الأقل")
    .optional(),
});