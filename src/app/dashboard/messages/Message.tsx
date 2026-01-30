"use client";

import { MoreVertical, Trash2, Eye, Phone, Mail, AudioWaveform, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { handleCall } from "@/lib/helpers";
import { useAppContext } from "@/contexts/AppProvider";
import { MessageProps } from "@/types/components";
import { useDeleteMessage } from "@/hooks/useMessage";

const MessageItem: React.FC<MessageProps> = ({ message }) => {
  const { showWarning } = useAppContext();
  const { mutateAsync, isPending } = useDeleteMessage()

  const handleDelete = () => {
    showWarning({
      message: "Are you sure you want to delete this message?",
      btn1: "Cancel",
      btn2: "Delete",
      handleBtn2: async () => {
        await mutateAsync(message.id)
        console.log("delete", message.id);
      },
    });
  };

  return (
    <div className="bg-background p-4 flex flex-col gap-3 border border-muted rounded-xl shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-sans font-semibold text-lg text-foreground">
            {message.subject || "No subject"}
          </h3>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="bg-transparent h-8 w-8 flex justify-center items-center rounded-full cursor-pointer transition duration-300 hover:bg-muted"
              aria-label="Options"
              variant="ghost"
              disabled={isPending}
            >
              <MoreVertical className="w-5 h-5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="bg-background w-40 font-sans">
            <DropdownMenuLabel className="mb-1 px-1">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />

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

      <p className="text-sm text-foreground line-clamp-3">
        {message.msg}
      </p>

      <div className="flex items-center">
        <div className="pt-2 flex flex-wrap gap-3 flex-1 border-muted text-sm border-t">
          <div className="flex items-center gap-1 text-sky-600">
            <Mail className="w-4 h-4" />
            <span>{message.email}</span>
          </div>

          {message.phone && (
            <button
              onClick={() => handleCall(message.phone!)}
              className="flex items-center gap-1 text-emerald-600 cursor-pointer transition hover:underline"
            >
              <Phone className="w-4 h-4" />
              {message.phone}
            </button>
          )}
        </div>

        <p className="m-0 text-sm text-muted-foreground">
          {new Date(message.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
