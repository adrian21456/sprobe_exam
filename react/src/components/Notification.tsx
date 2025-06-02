"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, Circle } from "lucide-react";
import Divider from "./ui/divider";
import { cn } from "@/lib/utils";
import colorVariants from "@/lib/variables";
import { useState, useEffect } from "react";
import emitter from "@/lib/eventBus";
import { triggerNotification } from "@/lib/events";
import { JSX } from "react/jsx-runtime";
import usePusherListener from "@/lib/pusher";

function NotificationCard({
  color = "blue",
  icon = <Bell className="w-4 h-4" />,
  title = "Notification",
  description = "",
}: {
  color?: string;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
}) {
  const colors = colorVariants({ hover: true });
  const current = colors[color] ?? [];

  return (
    <div
      className={cn(
        "flex items-center space-x-4 outline-1 rounded-md p-2",
        ...current
      )}
    >
      <div className="flex items-center pl-2">{icon}</div>
      <div className="flex-1">
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function Notification() {
  const [notifications, setNotifications] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const handler = (data: {
      description: string;
      color: string;
      title: string;
      icon: React.ReactNode;
    }) => {
      addNotification(data);
    };

    emitter.on("notify", handler);

    return () => {
      emitter.off("notify", handler); // cleanup
    };
  }, []);

  usePusherListener();

  useEffect(() => {}, []);

  function addNotification(data: Object) {
    setNotifications((prev) => [
      ...prev,
      <NotificationCard key={Date.now()} {...data} />,
    ]);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex mr-1">
          <Bell className="h-4 w-4" />
          {notifications.length > 0 && (
            <Circle className="w-2 fill-red-500 text-red-500 ml-2 absolute top-4" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-100" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Notifications</h4>
            <p className="text-sm text-muted-foreground">
              You have {notifications.length != 0 ? notifications.length : "no"}{" "}
              notification
              {notifications.length != 1 && "s"}.
            </p>
          </div>
          <Divider size={0}></Divider>
          <div className="flex gap-2 flex-col h-100 overflow-auto p-1">
            {notifications}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Notification;
