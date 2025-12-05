"use client";

import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { WarningProps } from "@/types/components";

const Warning: React.FC<WarningProps> = ({
  message,
  btn1 = "Cancel",
  btn2,
  styleBtn1 = "secondary",
  styleBtn2 = "destructive",
  handleBtn2,
  onClose,
}) => {
  return (
    <div className="bg-foreground/40 flex items-center justify-center fixed inset-0 z-50">
      <div className="bg-background w-full max-w-md p-5 border border-black rounded-2xl shadow-xl animate-in zoom-in">
        <div className="mb-4 pb-3 flex items-center gap-2 border-b border-black">
          <AlertTriangle className="text-yellow-500" size={40} />
          <h2 className="font-bold text-xl text-foreground">Warning</h2>
        </div>

        <p className="mb-6 px-1 text-gray-700 text-base">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className={cn(
              "py-2 flex-1 border rounded-lg shadow-sm font-medium transition duration-600 cursor-pointer",
              styleBtn1 === "secondary" &&
              "bg-gray-200 hover:bg-gray-300 text-foreground",
              styleBtn1 === "default" &&
              "bg-blue-600 hover:bg-blue-700 text-background",
              styleBtn1 === "outline" &&
              "border border-gray-400 bg-background hover:bg-gray-100 text-foreground",
              styleBtn1 === "destructive" &&
              "bg-red-600 hover:bg-red-700 text-background"
            )}
          >
            {btn1}
          </button>

          <button
            onClick={() => {
              handleBtn2();
              onClose();
            }}
            className={cn(
              "py-2 flex-1 rounded-lg border shadow-sm font-medium transition duration-600 cursor-pointer",
              styleBtn2 === "secondary" &&
              "bg-gray-200 hover:bg-gray-300 text-foreground",
              styleBtn2 === "default" &&
              "bg-blue-600 hover:bg-blue-700 text-background",
              styleBtn2 === "outline" &&
              "border border-gray-400 bg-background hover:bg-gray-100 text-foreground",
              styleBtn2 === "destructive" &&
              "bg-red-600 hover:bg-red-700 text-background"
            )}
          >
            {btn2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Warning;