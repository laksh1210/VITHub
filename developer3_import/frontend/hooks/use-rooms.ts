import { useQuery } from "@tanstack/react-query";
import { roomsApi } from "@/lib/api/rooms";
import { queryKeys } from "@/lib/query-keys";

export function useRooms(buildingId?: string) {
  return useQuery({
    queryKey: queryKeys.rooms.all(buildingId),
    queryFn: () => roomsApi.getAll(buildingId),
  });
}

export function useRoom(id: string) {
  return useQuery({
    queryKey: queryKeys.rooms.detail(id),
    queryFn: () => roomsApi.getById(id),
    enabled: Boolean(id),
  });
}
