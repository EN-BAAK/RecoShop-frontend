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
