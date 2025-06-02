"use client";
import {
  Archive,
  Calendar,
  ChevronDown,
  Files,
  Flag,
  Group,
  Home,
  Inbox,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarSeparator,
  SidebarFooter,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex justify-left items-center p-2 gap-2">
          <LayoutDashboard className="h-6 w-6" />
          {open && (
            <h1 className="text-lg font-bold">
              {process.env.NEXT_PUBLIC_PROJECT_NAME}
            </h1>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard">
                    <Home />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/department">
                    <Flag />
                    <span>Departments</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/employee">
                    <Users />
                    <span>Employees</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/file">
                    <Files />
                    <span>Files</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/employee_file">
                    <Archive />
                    <span>Employee Files</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/family">
                    <Group />
                    <span>Family</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <Collapsible defaultOpen={true} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <Settings />
                        <span>Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuButton asChild>
                          <a href="#">
                            <Settings />
                            <span>Settings 1</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuButton asChild>
                          <a href="#">
                            <Settings />
                            <span>Settings 2</span>
                          </a>
                        </SidebarMenuButton>
                        <SidebarMenuBadge className="bg-red-500 p-1 text-xs text-white rounded">
                          24
                        </SidebarMenuBadge>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Help
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <Home /> Home
                      </a>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction>
                          <MoreHorizontal />
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="right"
                        align="start"
                        sideOffset={18}
                        className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-3 rounded-md shadow-lg gap-1 flex flex-col"
                      >
                        <DropdownMenuItem>
                          <span>Edit Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span>Delete Project</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible> */}
      </SidebarContent>

      {open && (
        <SidebarFooter>
          <SidebarSeparator className="ml-0" />
          <div className="flex text-xs p-2 justify-center">
            Created by Stalkra 2026
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}

export default AppSidebar;
