import emitter from "./eventBus";
import { Bell, Star } from "lucide-react";
import { toast } from "sonner";
import { getColor } from "./variables";

export function triggerNotification({
  title = "New Notification",
  description = "",
  toastMessage = "",
  color = "blue",
  icon = <Bell className="w-4 h-4" />,
}: {
  title?: string;
  description?: string;
  color?: string;
  icon?: React.ReactNode;
  toastMessage?: string;
} = {}) {
  setTimeout(() => {
    toast(title, {
      description: description,
      icon: icon,
      duration: 5000,
      style: {
        backgroundColor: getColor(color, 100),
        color: "white",
      },
    });
  }, 50);

  emitter.emit("notify", {
    description: description,
    color: color,
    title: title,
    icon: icon,
  });
}

export function triggerLatestEvents({
  title = "New Event",
  description = "",
  color = "blue",
  icon = <Star className="w-4 h-4" />,
  toastMessage = "",
}: {
  title?: string;
  description?: string;
  color?: string;
  icon?: React.ReactNode;
  toastMessage?: string;
} = {}) {
  setTimeout(() => {
    toast(title, {
      description: description,
      icon: icon,
      duration: 5000,
      style: {
        backgroundColor: getColor(color, 100),
        color: "white",
      },
    });
  }, 50);

  emitter.emit("event", {
    description: description,
    color: color,
    title: title,
    icon: icon,
  });
}
