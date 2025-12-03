import { Badge } from "@/components/ui/badge";
import { GenderBadgeProps } from "@/types/components";
import { SEX } from "@/types/variables";
import { Venus, Mars } from "lucide-react";

export const GenderBadge: React.FC<GenderBadgeProps> = ({ gender }) => {
  const config = {
    [SEX.MALE]: {
      label: "Male",
      icon: <Mars className="w-3 h-3" />,
      className: "bg-blue-600 text-white hover:bg-blue-700",
    },
    [SEX.FEMALE]: {
      label: "Female",
      icon: <Venus className="w-3 h-3" />,
      className: "bg-pink-600 text-white hover:bg-pink-700",
    },
  };

  const g = config[gender];

  return (
    <Badge className={`px-2 py-1 flex items-center gap-1 rounded-md ${g.className}`}>
      {g.icon}
      {g.label}
    </Badge>
  );
};
