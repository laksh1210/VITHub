import { useQuery } from "@tanstack/react-query";
import { buildingsApi } from "@/lib/api/buildings";
import { queryKeys } from "@/lib/query-keys";

export function useBuildings() {
  return useQuery({
    queryKey: queryKeys.buildings.all,
    queryFn: buildingsApi.getAll,
  });
}

export function useBuilding(id: string) {
  return useQuery({
    queryKey: queryKeys.buildings.detail(id),
    queryFn: () => buildingsApi.getById(id),
    enabled: Boolean(id),
  });
}
