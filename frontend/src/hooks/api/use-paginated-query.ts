import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";
import { ApiError, PaginatedResponse } from "@/types/api";
import { defaultQueryOptions } from "@/lib/query/query-options";

export function usePaginatedQuery<TData, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  queryFn: (context: { signal: AbortSignal; pageParam?: number }) => Promise<PaginatedResponse<TData>>,
  options?: Omit<UseQueryOptions<PaginatedResponse<TData>, ApiError, PaginatedResponse<TData>, TQueryKey>, "queryKey" | "queryFn"> & {
    type?: keyof typeof defaultQueryOptions;
  }
) {
  const { type = "standard", ...restOptions } = options || {};
  const defaults = defaultQueryOptions[type] as Partial<UseQueryOptions<PaginatedResponse<TData>, ApiError, PaginatedResponse<TData>, TQueryKey>>;

  return useQuery<PaginatedResponse<TData>, ApiError, PaginatedResponse<TData>, TQueryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      return queryFn({ signal });
    },
    ...defaults,
    ...restOptions,
  });
}
