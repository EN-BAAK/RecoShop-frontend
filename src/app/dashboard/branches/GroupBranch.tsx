import React from 'react'
import { Badge } from '@/components/ui/badge'
import { GroupBranchProps } from '@/types/components'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Edit3, MoreVertical, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/contexts/AppProvider';
import { useDeleteGroupBranch } from '@/hooks/useGroupBranch';

const GroupBranch: React.FC<GroupBranchProps> = ({ group }) => {
  const router = useRouter()
  const { mutateAsync, isPending } = useDeleteGroupBranch()
  const { showWarning } = useAppContext()

  const handleEdit = () => {
    router.push(`branches/edit/group/${group.id}`);
  };

  const handleDelete = () => {
    showWarning({
      message: `Are you sure you want to delete the branch area "${group.name}"? This action cannot be undone.`,
      btn1: "Cancel",
      btn2: "delete",
      handleBtn2: () => mutateAsync(group.id),
    });
  };

  return (
    <Badge
      className="bg-primary/10 py-0 px-3 flex items-center gap-2 rounded-full"
    >
      <span className='font-sans font-medium text-sm text-primary'>
        {group.name}
      </span>

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
    </Badge>
  )
}

export default GroupBranch