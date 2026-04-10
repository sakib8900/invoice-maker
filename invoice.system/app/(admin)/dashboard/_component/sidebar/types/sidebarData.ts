import type { LucideIcon } from "lucide-react";

// Recursive menu item type - supports unlimited nesting
export interface MenuItemType {
  title: string;
  url?: string;
  icon?: LucideIcon;
  items?: MenuItemType[];
}

// Section container
export interface SidebarSection {
  label: string;
  items: MenuItemType[];
}

// Type aliases for backward compatibility
export type SidebarMenuItemType = MenuItemType;
export type SubMenuItemType = MenuItemType;
export type NestedMenuItemType = MenuItemType;
export type DeepNestedMenuItemType = MenuItemType;
export type MenuItemTypeWithChildren = MenuItemType;