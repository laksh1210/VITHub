import { LayoutDashboard, Map, Bot, BookOpen, Bus, Wrench, Calendar, Bell, Settings, type LucideIcon } from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
  icon?: LucideIcon;
  href: string;
  disabled?: boolean;
  badge?: string | number;
  roles?: string[]; // placeholder
  children?: NavItem[];
};

export const SIDEBAR_NAV: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    id: "map",
    label: "Campus Map",
    icon: Map,
    href: "/maps",
  },
  {
    id: "ai",
    label: "AI Assistant",
    icon: Bot,
    href: "/ai",
  },
  {
    id: "library",
    label: "Library",
    icon: BookOpen,
    href: "/library",
  },
  {
    id: "shuttles",
    label: "Shuttles",
    icon: Bus,
    href: "/shuttles",
  },
  {
    id: "maintenance",
    label: "Maintenance",
    icon: Wrench,
    href: "/maintenance",
  },
  {
    id: "events",
    label: "Events",
    icon: Calendar,
    href: "/events",
  },
  {
    id: "canteens",
    label: "Canteens",
    icon: LayoutDashboard, // Will replace with Coffee or Utensils if needed
    href: "/canteens",
  },
  {
    id: "queues",
    label: "Queues",
    icon: LayoutDashboard, // Will replace with Users or similar
    href: "/queues",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/settings",
  }
];

export const HEADER_NAV: NavItem[] = [
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    href: "/notifications",
  }
];
