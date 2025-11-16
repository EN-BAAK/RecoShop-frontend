"use client";

import React from "react";
import { Field, ErrorMessage, type FieldProps } from "formik";
import TextError from "./TextError";
import { SelectorFieldProps } from "@/types/forms";
import { cn } from "@/lib/utils";

const SelectorField: React.FC<SelectorFieldProps> = ({
  name,
  options,
  label,
  styles,
  labelStyle,
  innerDivStyle,
  inputClasses = "",
  Icon,
  iconStyle,
  dir = "ltr",
  required = false,
  disabled = false,
}) => {
  return (
    <div className={`${styles || ""}`}>
      {label && (
        <label
          htmlFor={name}
          className={cn("mb-2", labelStyle)}
        >
          {label}:
        </label>
      )}

      <div className={cn("relative", innerDivStyle)}>
        {Icon && (
          <span
            className={cn(
              "flex items-center absolute inset-y-0",
              dir === "rtl" ? "right-3" : "left-3",
              iconStyle
            )}
          >
            {Icon}
          </span>
        )}

        <Field name={name}>
          {({ field }: FieldProps) => (
            <select
              id={name}
              {...field}
              disabled={disabled}
              required={required}
              className={cn(
                Icon && (dir === "rtl" ? "pr-10" : "pl-10"),
                inputClasses
              )}
            >
              <option value="">Select</option>
              {options.map((option) => (
                <option key={`${name}-${option.value}`} value={option.value}>
                  {option.key}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>

      <ErrorMessage name={name}>
        {(msg) => <TextError msg={msg} />}
      </ErrorMessage>
    </div>
  );
};

export default SelectorField;
