import { UseQueryOptions, QueryKey } from "@tanstack/react-query";
import { ApiError } from "@/types/api";

const MINUTE = 1000 * 60;

export const defaultQueryOptions = {
  // Frequently changing data (e.g., live shuttle tracking)
  volatile: {
    staleTime: 10 * 1000, // 10 seconds
    gcTime: 5 * MINUTE,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  } as Omit<UseQueryOptions<unknown, ApiError, unknown, QueryKey>, "queryKey">,

  // Standard data (e.g., user profiles, standard lists)
  standard: {
    staleTime: 5 * MINUTE,
    gcTime: 30 * MINUTE,
    refetchOnWindowFocus: false,
    retry: 2,
  } as Omit<UseQueryOptions<unknown, ApiError, unknown, QueryKey>, "queryKey">,

  // Rarely changing data (e.g., building details, static categories)
  static: {
    staleTime: 24 * 60 * MINUTE, // 24 hours
    gcTime: 24 * 60 * MINUTE,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 3,
  } as Omit<UseQueryOptions<unknown, ApiError, unknown, QueryKey>, "queryKey">,
};
