import Image from "next/image";
import React from "react";
import { EmptyElementProps } from "@/types/components";
import { PlusCircle } from "lucide-react";
import CustomButton from "./forms/Button";

const EmptyElement: React.FC<EmptyElementProps> = ({ title = "No data yet", desc, button }) => {
  return (
    <div className="h-full w-full flex items-center justify-center text-center">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <Image
          src="/no-data.png"
          alt="Empty"
          width={240}
          height={240}
          loading="lazy"
        />

        <h2 className="pb-2 border-b-2 border-main/40 font-heading capitalize font-semibold text-xl md:text-2xl text-orange-600">
          {title}
        </h2>

        {desc && (
          <p className="font-sans text-muted-foreground">
            {desc}
          </p>
        )}

        {button &&
          <CustomButton label={button.msg} onClick={button.action} icon={PlusCircle} variant="orange" />
        }
      </div>
    </div>
  );
};

export default EmptyElement;
