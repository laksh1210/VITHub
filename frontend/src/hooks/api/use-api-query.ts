import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";
import { ApiError } from "@/types/api";
import { defaultQueryOptions } from "@/lib/query/query-options";

export function useApiQuery<TData, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  queryFn: (context: { signal: AbortSignal }) => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, ApiError, TData, TQueryKey>, "queryKey" | "queryFn"> & {
    type?: keyof typeof defaultQueryOptions;
  }
) {
  const { type = "standard", ...restOptions } = options || {};
  const defaults = defaultQueryOptions[type] as Partial<UseQueryOptions<TData, ApiError, TData, TQueryKey>>;

  return useQuery<TData, ApiError, TData, TQueryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      return queryFn({ signal });
    },
    ...defaults,
    ...restOptions,
  });
}
