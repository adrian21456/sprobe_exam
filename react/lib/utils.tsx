import { clsx, type ClassValue } from "clsx";
import { Bell } from "lucide-react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
