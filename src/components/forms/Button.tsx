import React from "react"
import { cn } from "@/lib/utils"
import { CustomButtonProps } from "@/types/forms"

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  className = "",
  variant = "primary",
  onClick,
  icon: Icon,
  iconClassName = "",
  disabled = false
}) => {
  const variantClasses = {
    primary: "bg-primary text-background hover:bg-primary/90",
    "primary-outline": "border border-primary bg-transparent text-primary hover:bg-primary/10",

    accent: "bg-accent text-background hover:bg-accent/90",
    "accent-outline": "border border-accent bg-transparent text-accent hover:bg-accent/10",

    danger: "bg-danger text-background hover:bg-danger/90",
    "danger-outline": "border border-danger bg-transparent text-danger hover:bg-danger/10",

    orange: "bg-orange-600 text-background hover:bg-orange-500",
    "orange-outline": "border border-orange-600 bg-transparent text-orange-600 hover:bg-orange-600/10",

    transparent: "bg-transparent text-foreground hover:text-foreground/75",
    "transparent-outline": "border border-foreground/40 bg-transparent text-foreground hover:bg-foreground/5",

    "primary-gradient": "bg-gradient-to-r from-primary to-green-600 text-white hover:opacity-90",
    "primary-gradient-outline": "border border-primary bg-transparent text-primary hover:bg-primary/10",

    "accent-gradient": "bg-gradient-to-r from-accent to-red-600 text-white hover:opacity-90",
    "accent-gradient-outline": "border border-accent bg-transparent text-accent hover:bg-accent/10",
  }[variant]

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "w-full px-3 py-2 flex items-center justify-center gap-2 rounded-xl transition cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses,
        className
      )}
    >
      {Icon && <Icon className={cn("w-5 h-5", iconClassName)} />}
      {label && <span>{label}</span>}
    </button>
  )
}

export default CustomButton
