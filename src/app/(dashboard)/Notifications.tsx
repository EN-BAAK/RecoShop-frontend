"use client";

import * as React from "react";
import { Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationsProps } from "@/types/components";
import CustomButton from "@/components/forms/Button";

const Notifications: React.FC<NotificationsProps> = ({ notifications = [] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <CustomButton
            className="p-2"
            variant="transparent"
            icon={Bell}
          />
          {notifications.length > 0 && (
            <span className="bg-accent w-3 h-3 rounded-full border-2 border-white absolute top-1.5 right-1.5" />
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="bg-background w-80 border border-muted rounded-xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-300"
      >
        <DropdownMenuLabel className="py-3 border-b border-muted font-sans font-semibold text-foreground">
          Notifications
        </DropdownMenuLabel>

        <ScrollArea className="max-h-96">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 mb-3 mx-auto text-muted-foreground" />
              <p className="font-sans text-sm text-muted-foreground">
                No new notifications
              </p>
            </div>
          ) : (
            notifications.map((notif) => (
              <DropdownMenuItem
                key={notif.id}
                className="py-3 px-4 border-t font-sans text-foreground cursor-pointer transition duration-300 hover:bg-primary/5"
              >
                {notif.msg}
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => console.log("View all notifications")}
              className="block text-center font-sans text-sm text-primary cursor-pointer transition-colors duration-300 hover:bg-primary/5"
            >
              View all notifications
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
