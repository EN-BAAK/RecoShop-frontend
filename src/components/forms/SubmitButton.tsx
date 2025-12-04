"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SubmitButtonProps } from "@/types/forms"

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  isDirty,
  isValid,
  label = "Send",
  submittingLabel = "Sending...",
  disabledLabel = "Please fill out the form",
  className = "",
  variant = "primary",
  onClick,
}) => {
  const disabled = isSubmitting || !isDirty || !isValid

  let buttonLabel = label
  if (isSubmitting) buttonLabel = submittingLabel
  else if (disabled) buttonLabel = disabledLabel

  const variantClasses = {
    "primary": "bg-primary text-background hover:bg-primary/90",
    "primary-outline": "border border-primary text-primary hover:bg-primary hover:text-background",
    "accent": "bg-accent text-background hover:bg-accent/90",
    "accent-outline": "border border-accent text-accent hover:bg-accent hover:text-background",
    "danger": "bg-danger text-background hover:bg-danger/90",
    "danger-outline": "border border-danger text-danger hover:bg-danger hover:text-background",
    "orange": "bg-orange-600 text-background hover:bg-orange-500",
    "orange-outline": "border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-background",
    "transparent": "bg-transparent text-foreground hover:text-foreground/70",
    "transparent-outline": "border border-foreground/40 text-background hover:border-foreground hover:text-background",
    "primary-gradient":
      "bg-gradient-to-r from-primary to-green-600 text-background hover:opacity-90",
    "primary-gradient-outline":
      "border border-primary text-primary hover:bg-gradient-to-r hover:from-primary hover:to-green-600 hover:text-background",
    "accent-gradient":
      "bg-gradient-to-r from-accent to-red-600 text-background hover:opacity-90",
    "accent-gradient-outline":
      "border border-accent text-accent hover:bg-gradient-to-r hover:from-accent hover:to-red-600 hover:text-background",
  }[variant];

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
