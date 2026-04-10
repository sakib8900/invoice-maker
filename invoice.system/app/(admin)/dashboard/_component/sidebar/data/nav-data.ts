// src/config/nav-data.ts
import { FileIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface MenuItem {
  title: string;
  url?: string;
  icon?: LucideIcon;
  items?: MenuItem[];
}

export interface SidebarSection {
  label: string;
  items: MenuItem[];
}

export const NAV_DATA = [
  {
    label: "Main",
    items: [
      { title: "Invoice", href: "/invoice-maker", icon: FileIcon },
    ],
  }
];