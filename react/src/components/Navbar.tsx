"use client";

import { LogOut, Moon, Settings, Sidebar, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "./ThemeToggle";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "@/components/ui/button";
import Notification from "./Notification";
import { LatestEvents } from "./LatestEvents";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function Navbar() {
  const { logout } = useAuth();
  const router = useRouter();
  return (
    <nav className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger>
          <Button variant="ghost" size="icon">
            <Sidebar className="h-4 w-4" />
          </Button>
        </SidebarTrigger>
        <h1 className="text-xl font-bold">
          {process.env.NEXT_PUBLIC_PROJECT_NAME}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Notification />
        <ThemeToggle />
        <LatestEvents />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>
              <User className="h-[1.2rem] w-[1.2rem]" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-[1.2rem] w-[1.2rem]" /> Settings
            </DropdownMenuItem> */}
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                router.push("/login");
              }}
            >
              <LogOut className="h-[1.2rem] w-[1.2rem]" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default Navbar;
