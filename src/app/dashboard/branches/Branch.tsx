"use client";

import { MapPin, Phone, Facebook, Instagram, MoreVertical, Edit3, Trash2, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BranchProps } from "@/types/components";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/AppProvider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { handleCall } from "@/lib/helpers";
import { useDeleteBranch } from "@/hooks/useBranch";

const BranchItem: React.FC<BranchProps> = ({ branch }) => {
  const router = useRouter();
  const { mutateAsync, isPending } = useDeleteBranch()
  const { showWarning } = useAppContext()

  const handleEdit = () => {
    router.push(`branches/edit/branch/${branch.id}`);
  };

  const handleDelete = () => {
    showWarning({
      message: `Are you sure you want to delete the branch "${branch.name}"? This action cannot be undone.`,
      btn1: "Cancel",
      btn2: "delete",
      handleBtn2: () => mutateAsync(branch.id),
    });
  };

  return (
    <div className="bg-background p-4 flex flex-col gap-3 border border-muted rounded-xl shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-sans font-semibold text-lg text-foreground">
            {branch.name}
          </h3>

          <Badge>{branch.group}</Badge>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="bg-transparent h-8 w-8 flex justify-center items-center rounded-full cursor-pointer transition duration-300 hover:bg-muted"
              aria-label="options"
              variant="ghost"
              size="icon"
            >
              <MoreVertical className="w-5 h-5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="bg-background w-40 font-sans">
            <DropdownMenuLabel className="mb-1 px-1">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuItem
              onClick={handleEdit}
              className="group flex items-center gap-2 font-sans text-orange-600 cursor-pointer transition duration-300 hover:text-background focus:bg-orange-600"
            >
              <Edit3 className="h-4 w-4 transition duration-300 group-hover:text-background" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              disabled={isPending}
              className="group flex items-center gap-2 font-sans text-danger cursor-pointer transition duration-300 hover:text-background disabled:opacity-50 focus:bg-danger/90"
            >
              <Trash2 className="h-4 w-4 transition duration-300 group-hover:text-background" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {branch.location && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{branch.location}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-3 text-sm">
        {branch.phone && (
          <button
            type="button"
            onClick={() => handleCall(branch.phone!)}
            className="flex items-center gap-1 text-orange-500 cursor-pointer hover:underline"
          >
            <Phone className="w-4 h-4" />
            <span>{branch.phone}</span>
          </button>
        )}

        {branch.telephone && (
          <button
            type="button"
            onClick={() => handleCall(branch.phone!)}
            className="flex items-center gap-1 text-gray-500 cursor-pointer hover:underline"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{branch.telephone}</span>
          </button>
        )}

        {branch.facebook && (
          <a
            href={branch.facebook}
            target="_blank"
            className="flex items-center gap-1 text-blue-500 hover:underline"
          >
            <Facebook className="w-4 h-4" />
            Facebook
          </a>
        )}

        {branch.instagram && (
          <a
            href={branch.instagram}
            target="_blank"
            className="flex items-center gap-1 text-accent hover:underline"
          >
            <Instagram className="w-4 h-4" />
            Instagram
          </a>
        )}
      </div>
    </div>
  );
};

export default BranchItem;
