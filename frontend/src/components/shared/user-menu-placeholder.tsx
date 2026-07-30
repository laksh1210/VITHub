"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/contexts/auth-context";
import { useAuth } from "@/hooks/use-auth";
import { ROUTES } from "@/constants/routes";

export function UserMenuPlaceholder() {
  const { user } = useAuthContext();
  const { logout } = useAuth();
  const router = useRouter();

  const getInitials = (name: string) => {
    if (!name) return 'ST';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const displayName = user?.fullName || "Student Name";
  const displayEmail = user?.email || "student@vitbhopal.ac.in";
  const initials = getInitials(displayName);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative h-8 w-8 rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-opacity hover:opacity-80 cursor-pointer">
        <Avatar className="h-8 w-8 bg-[#6C63FF]/10">
          <AvatarImage src="" alt={`@${user?.username || 'student'}`} />
          <AvatarFallback className="bg-gradient-to-tr from-[#6C63FF] to-[#A78BFA] text-white text-xs font-bold">{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">{displayEmail}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-destructive focus:text-destructive">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
