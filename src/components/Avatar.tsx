import React from "react";
import { AvatarProps } from "@/types/components";
import { colors } from "@/constants/global";

const Avatar: React.FC<AvatarProps> = ({ firstName, width = 35, height = 35 }) => {
  const initial = firstName.charAt(0).toUpperCase();
  const index1 = firstName.length % colors.length;

  const gradientClass = `${colors[index1]}`;

  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center font-sans font-bold text-background ${gradientClass}`}
      style={{ width, height }}
    >
      <p className="mb-1" style={{ fontSize: width / 2.5 }}>{initial}</p>
    </div>
  );
};

export default Avatar;
