import { useInfiniteQuery, UseInfiniteQueryOptions, QueryKey, InfiniteData } from "@tanstack/react-query";
import { ApiError, PaginatedResponse } from "@/types/api";

export function useInfiniteApiQuery<TData, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  queryFn: (context: { signal: AbortSignal; pageParam: number }) => Promise<PaginatedResponse<TData>>,
  options?: Omit<UseInfiniteQueryOptions<PaginatedResponse<TData>, ApiError, InfiniteData<PaginatedResponse<TData>>, TQueryKey, number>, "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"> & {
    initialPageParam?: number;
  }
) {
  return useInfiniteQuery<PaginatedResponse<TData>, ApiError, InfiniteData<PaginatedResponse<TData>>, TQueryKey, number>({
    queryKey,
    queryFn: async ({ signal, pageParam }) => {
      return queryFn({ signal, pageParam: pageParam as number });
    },
    initialPageParam: options?.initialPageParam ?? 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.metadata.hasNext) {
        return lastPage.metadata.page + 1;
      }
      return undefined;
    },
    ...options,
  });
}
