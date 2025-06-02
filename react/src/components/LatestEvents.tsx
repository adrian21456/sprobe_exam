"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import emitter from "@/lib/eventBus";
import { triggerLatestEvents } from "@/lib/events";
import { GalleryVerticalEnd } from "lucide-react";
import { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";

function EventCard({
  color = "blue",
  icon = <GalleryVerticalEnd className="w-4 h-4" />,
  title = "Event",
  description = "",
}: {
  color?: string;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-center space-x-4 p-2 outline-2 rounded-md bg-${color}-500/10 hover:bg-${color}-500/30 transition-colors`}
    >
      <div className="flex items-center pl-2">{icon}</div>
      <div className="flex-1">
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function LatestEvents() {
  const [events, setEvents] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const handler = (data: {
      description: string;
      color: string;
      title: string;
      icon: React.ReactNode;
    }) => {
      addLatestEvent(data);
    };

    emitter.on("event", handler);

    return () => {
      emitter.off("event", handler); // cleanup
    };
  }, []);

  useEffect(() => {
    // triggerLatestEvents({ color: "red" }); // Trigger notifications every 5 seconds
  }, []);

  function addLatestEvent(data: Object) {
    setEvents((prev) => [...prev, <EventCard key={Date.now()} {...data} />]);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <GalleryVerticalEnd />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-4">
        <SheetHeader>
          <SheetTitle>Latest Events</SheetTitle>
          <SheetDescription>
            <span className="text-sm text-muted-foreground">
              {events.length === 0 ? "No" : "Showing latest "}
              {events.length !== 0 ? events.length : ""} event
              {events.length !== 1 && "s"}.
            </span>
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col space-y-4 overflow-y-auto h-full py-2 pl-1 pr-2">
          {events}
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
