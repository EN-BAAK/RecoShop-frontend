"use client"

import { forwardRef } from "react";
import { LoadingPageProps } from "@/types/components";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const LoadingPage = forwardRef<HTMLDivElement, LoadingPageProps>(({ className, msg }, ref) => {
  return (
    <div className={cn(
      "h-full w-full flex flex-col items-center justify-center",
      className
    )}
      ref={ref}>
      <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin" />
      {msg &&
        <p className="mt-4 font-sans text-lg text-muted-foreground">
          {msg}
        </p>}
    </div>
  );
})

LoadingPage.displayName = "LoadingPage";

export default LoadingPage;
