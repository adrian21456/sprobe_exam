"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModTable, ModTableAction, ModTableHeader } from "./ui/mods";
import { useEffect, useState } from "react";

const pre = [
  {
    // id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    // id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    // id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    // id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    // id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
];

const menus = [
  {
    label: "Test Action",
    icon: <Star />,
    event: (row: any) => {
      console.log(row);
    },
  },
];

export const columns = [
  ...ModTableAction({
    menus: menus,
  }),
  ...ModTableHeader({
    id: "status",
  }),
  ...ModTableHeader({
    id: "email",
  }),
  ...ModTableHeader({
    id: "amount",
    type: "number",
  }),
];

export function DataTableDemo() {
  const [data, setData] = useState(pre);

  useEffect(() => {
    // const interval = setInterval(() => {
    //   setData((prevData) => [
    //     ...prevData,
    //     {
    //       amount: 721,
    //       status: "failessd",
    //       email: "carmella@example.coms",
    //     },
    //   ]);
    // }, 5000);
    // return () => clearInterval(interval); // cleanup
  }, []);
  return <ModTable data={data} columns={columns} />;
}
