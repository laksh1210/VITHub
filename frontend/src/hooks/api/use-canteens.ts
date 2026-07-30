import { useQuery } from "@tanstack/react-query";
import { canteensService } from "@/services/canteens.service";
import { queryKeys } from "@/lib/query/query-keys";

export function useCanteens(buildingId?: string) {
  return useQuery({
    queryKey: queryKeys.canteens.all(buildingId),
    queryFn: () => canteensService.getAll(buildingId),
  });
}

export function useCanteen(id: string) {
  return useQuery({
    queryKey: queryKeys.canteens.detail(id),
    queryFn: () => canteensService.getById(id),
    enabled: Boolean(id),
  });
}
