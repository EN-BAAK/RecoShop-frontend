import React from "react";
import { Loader2 } from "lucide-react";
import { LoadingPageProps } from "@/types/components";
import { cn } from "@/lib/utils";

const LoadingPage: React.FC<LoadingPageProps> = ({ className, msg }) => {
  return (
    <div className={cn(
      "h-full w-full flex flex-col items-center justify-center",
      className
    )}>
      <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin" />
      {msg &&
        <p className="mt-4 font-sans text-lg text-muted-foreground">
          {msg}
        </p>}
    </div>
  );
};

export default LoadingPage;
