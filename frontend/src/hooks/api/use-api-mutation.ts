import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ApiError } from "@/types/api";

export function useApiMutation<TData, TVariables, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, ApiError, TVariables, TContext>, "mutationFn">
) {
  return useMutation<TData, ApiError, TVariables, TContext>({
    mutationFn,
    ...options,
  });
}
