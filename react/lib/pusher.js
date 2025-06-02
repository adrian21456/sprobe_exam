// hooks/usePusherListener.js
import { useEffect } from "react";
import Pusher from "pusher-js";
import emitter from "./eventBus";
import { Save, SquarePen, Trash2 } from "lucide-react";

export default function usePusherListener() {
  useEffect(() => {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher("1aeb2ef8234c834be464", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("my-channel");

    channel.bind("my-event", function (data) {
      console.log(data);
      if (data.message.action === "add") {
        emitter.emit("notify", {
          color: "blue",
          title: "New Record",
          description: JSON.stringify(data.message.data, null, 2),
          icon: <Save w-4 h-4 />,
        });
      }

      if (data.message.action === "edit") {
        emitter.emit("notify", {
          color: "green",
          title: "Record Update",
          description: JSON.stringify(data.message.data, null, 2),
          icon: <SquarePen w-4 h-4 />,
        });
      }

      if (data.message.action === "delete") {
        emitter.emit("notify", {
          color: "red",
          title: "Record Deletion",
          description: JSON.stringify(data.message.data, null, 2),
          icon: <Trash2 w-4 h-4 />,
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);
}
