import { useQuery } from "@tanstack/react-query";
import { buildingsService } from "@/services/buildings.service";
import { queryKeys } from "@/lib/query/query-keys";

export function useBuildings() {
  return useQuery({
    queryKey: queryKeys.buildings.all,
    queryFn: buildingsService.getAll,
  });
}

export function useBuilding(id: string) {
  return useQuery({
    queryKey: queryKeys.buildings.detail(id),
    queryFn: () => buildingsService.getById(id),
    enabled: Boolean(id),
  });
}
