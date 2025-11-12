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
    "primary": "bg-primary text-white hover:bg-primary/90",
    "primary-outline": "border border-primary text-primary hover:bg-primary hover:text-white",
    "accent": "bg-accent text-white hover:bg-accent/90",
    "accent-outline": "border border-accent text-accent hover:bg-accent hover:text-white",
    "danger": "bg-danger text-white hover:bg-danger/90",
    "danger-outline": "border border-danger text-danger hover:bg-danger hover:text-white",
    "orange": "bg-orange-600 text-white hover:bg-orange-500",
    "orange-outline": "border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white",
    "transparent": "bg-transparent text-foreground hover:text-foreground/70",
    "transparent-outline": "border border-foreground/40 text-foreground hover:border-foreground hover:text-foreground",
    "primary-gradient":
      "bg-gradient-to-r from-primary to-green-600 text-white hover:opacity-90",
    "primary-gradient-outline":
      "border border-primary text-primary hover:bg-gradient-to-r hover:from-primary hover:to-green-600 hover:text-white",
    "accent-gradient":
      "bg-gradient-to-r from-accent to-red-600 text-white hover:opacity-90",
    "accent-gradient-outline":
      "border border-accent text-accent hover:bg-gradient-to-r hover:from-accent hover:to-red-600 hover:text-white",
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
