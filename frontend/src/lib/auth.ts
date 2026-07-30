import { UserSummaryResponse } from "@/types/auth";
import { getUser } from "./auth-storage";

export function hasRole(user: UserSummaryResponse | null, role: string): boolean {
  if (!user || !user.roles) return false;
  return user.roles.includes(role);
}

export function hasAnyRole(user: UserSummaryResponse | null, roles: string[]): boolean {
  if (!user || !user.roles) return false;
  return roles.some((r) => user.roles.includes(r));
}

export function isAdmin(user: UserSummaryResponse | null = getUser()): boolean {
  return hasRole(user, "ADMIN");
}

export function isStudent(user: UserSummaryResponse | null = getUser()): boolean {
  return hasRole(user, "STUDENT");
}

export function isFaculty(user: UserSummaryResponse | null = getUser()): boolean {
  return hasRole(user, "FACULTY");
}
