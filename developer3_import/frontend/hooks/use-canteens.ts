import { useQuery } from "@tanstack/react-query";
import { canteensApi } from "@/lib/api/canteens";
import { queryKeys } from "@/lib/query-keys";

export function useCanteens(buildingId?: string) {
  return useQuery({
    queryKey: queryKeys.canteens.all(buildingId),
    queryFn: () => canteensApi.getAll(buildingId),
  });
}

export function useCanteen(id: string) {
  return useQuery({
    queryKey: queryKeys.canteens.detail(id),
    queryFn: () => canteensApi.getById(id),
    enabled: Boolean(id),
  });
}
