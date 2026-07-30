import { QueryClient } from "@tanstack/react-query";
import { apiLogger } from "@/utils/api";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
        retry: (failureCount, error: unknown) => {
          const apiError = error as { status?: number };
          if (apiError?.status === 401 || apiError?.status === 403 || apiError?.status === 404) {
            return false;
          }
          return failureCount < 2;
        },
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
        onError: (error: unknown) => {
          apiLogger.error("Global Mutation Error:", error);
        },
      },
    },
  });
}
