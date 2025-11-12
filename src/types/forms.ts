import { Input, SelectOption, Variant } from "./variables";
import { Dir } from "fs";
import { LucideIcon } from "lucide-react"

export type SubmitButtonProps = {
  isSubmitting: boolean
  isDirty: boolean
  isValid: boolean
  label?: string
  submittingLabel?: string
  disabledLabel?: string
  className?: string
  onClick?: () => void
  variant?: Variant
}

export interface BaseFieldProps {
  name: string;
  label?: string;
  styles?: string;
  labelStyle?: string;
  innerDivStyle?: string;
  Icon?: React.ReactNode;
  iconStyle?: string;
  required?: boolean
  dir?: Dir;
  disabled?: boolean;
}

export interface OtpInputProps {
  name: string;
  length: number;
  numericOnly?: boolean;
  boxSize?: string;
  className?: string;
}

export interface BaseInputProps {
  styles?: string;
  placeholder?: string
}

export interface CheckBoxFieldProps extends BaseFieldProps {
  inputClasses?: string,
}

export interface InputFieldProps extends BaseFieldProps {
  type: Input;
  inputMode?: "numeric" | "";
  placeholder?: string;
  autoComplete?: "on" | "off";
}

export interface TextAreaFieldProps extends BaseFieldProps {
  placeholder?: string;
  dir?: Dir;
}

export interface SelectorFieldProps extends BaseFieldProps {
  options: SelectOption[];
  inputClasses?: string;
}

export interface FileInputFieldProps extends BaseFieldProps {
  accept?: string;
}

export type TextErrorProps = {
  msg: string;
};

export type SelectImageFieldProps = {
  value?: File;
  setValue: React.Dispatch<React.SetStateAction<File | undefined>>;
  label?: string;
  className?: string;
  currentImage?: string | null;
};

export type SelectorProps = {
  data: SelectOption[],
  setFunction: (value: string) => void
} & BaseInputProps

export interface CustomButtonProps {
  label?: string
  className?: string
  variant?: Variant
  onClick?: () => void
  icon?: LucideIcon
  iconClassName?: string,
  disabled?: boolean
}

export interface MultiSelectorFieldProps extends BaseFieldProps {
  maxSelection?: number;
  options: SelectOption[]
}