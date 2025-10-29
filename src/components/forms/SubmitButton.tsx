"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SubmitButtonProps } from "@/types/forms"

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  isDirty,
  isValid,
  label = "إرسال",
  submittingLabel = "جارٍ الإرسال...",
  disabledLabel = "يرجى تعبئة النموذج",
  className = "",
  variant = "primary",
  onClick,
}) => {
  const disabled = isSubmitting || !isDirty || !isValid

  let buttonLabel = label
  if (isSubmitting) buttonLabel = submittingLabel
  else if (disabled) buttonLabel = disabledLabel

  const variantClasses = {
    primary: "bg-primary text-background hover:bg-primary/90",
    accent: "bg-accent text-background hover:bg-accent/90",
    danger: "bg-danger text-background hover:bg-danger/90",
    orange: "bg-orange-600 text-background hover:bg-orange-100",
    "primary-gradient": "bg-gradient-to-r from-primary to-green-600 text-white hover:opacity-90",
    "accent-gradient": "bg-gradient-to-r from-accent to-red-600 text-white hover:opacity-90",
  }[variant]

  return (
    <Button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "w-full py-6 transition cursor-pointer",
        variantClasses,
        className
      )}
    >
      {buttonLabel}
    </Button>
  )
}

export default SubmitButton
