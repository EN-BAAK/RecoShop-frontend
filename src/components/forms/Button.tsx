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
    accent: "bg-accent text-background hover:bg-accent/90",
    danger: "bg-danger text-background hover:bg-danger/90",
    orange: "bg-orange-600 text-background hover:bg-orange-500",
    transparent: "bg-transparent text-foreground hover:text-foreground/75",
    "primary-gradient": "bg-gradient-to-r from-primary to-green-600 text-white hover:opacity-90",
    "accent-gradient": "bg-gradient-to-r from-accent to-red-600 text-white hover:opacity-90",
  }[variant]

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "w-full py-2 px-3 flex items-center justify-center gap-2 rounded-xl transition duration-300 cursor-pointer",
        variantClasses,
        className
      )}
    >
      {Icon && <Icon className={cn("h-5 w-5", iconClassName)} />}
      {label && <span>{label}</span>}
    </button>
  )
}

export default CustomButton
