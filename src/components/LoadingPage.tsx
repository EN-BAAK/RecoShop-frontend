import React from "react";
import { Loader2 } from "lucide-react";

const LoadingPage: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Loader2 className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
      <p className="font-sans text-lg text-muted-foreground">
        Loading...
      </p>
    </div>
  );
};

export default LoadingPage;
