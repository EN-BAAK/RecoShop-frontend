"use client";

import { useEffect } from "react";
import { X, CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToastProps } from "@/types/components";

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  index,
  title,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const toastConfig = {
    SUCCESS: {
      Icon: CheckCircle2,
      bg: "bg-green-50 border border-green-200",
      icon: "text-green-600",
      titleText: "تم بنجاح",
      titleColor: "text-green-700",
      messageColor: "text-green-800",
      closeHover: "hover:bg-green-100",
    },
    ERROR: {
      Icon: XCircle,
      bg: "bg-red-50 border border-red-200",
      icon: "text-red-600",
      titleText: "حدث خطأ",
      titleColor: "text-red-700",
      messageColor: "text-red-800",
      closeHover: "hover:bg-red-100",
    },
    WARNING: {
      Icon: AlertCircle,
      bg: "bg-yellow-50 border border-yellow-200",
      icon: "text-yellow-600",
      titleText: "تحذير",
      titleColor: "text-yellow-700",
      messageColor: "text-yellow-800",
      closeHover: "hover:bg-yellow-100",
    },
    INFO: {
      Icon: Info,
      bg: "bg-blue-50 border border-blue-200",
      icon: "text-blue-600",
      titleText: "معلومة",
      titleColor: "text-blue-700",
      messageColor: "text-blue-800",
      closeHover: "hover:bg-blue-100",
    },
  }[type];

  const Icon = toastConfig.Icon;

  return (
    <div
      role="alert"
      dir="ltr"
      className={cn(
        `${toastConfig.bg}`,
        "fixed left-4 z-50 w-80 sm:w-96 p-4 rounded-2xl shadow-lg transition-all animate-in slide-in-from-top fade-in duration-300"
      )}
      style={{
        top: `${index * 90 + 16}px`,
      }}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Icon className={cn("h-6 w-6", toastConfig.icon)} />
        </div>

        <div className="flex-1">
          <h3
            className={cn(
              "font-semibold text-base leading-tight mb-1",
              toastConfig.titleColor
            )}
          >
            {title || toastConfig.titleText}
          </h3>
          <p
            className={cn(
              "text-sm leading-relaxed",
              toastConfig.messageColor
            )}
          >
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          className={cn(
            "p-1 rounded-full transition duration-300 cursor-pointer",
            toastConfig.closeHover
          )}
          aria-label="إغلاق الإشعار"
        >
          <X className={cn("h-5 w-5", toastConfig.icon)} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
