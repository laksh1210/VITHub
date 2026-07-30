import { useQuery } from "@tanstack/react-query";
import { roomsService } from "@/services/rooms.service";
import { queryKeys } from "@/lib/query/query-keys";

export function useRooms(buildingId?: string) {
  return useQuery({
    queryKey: queryKeys.rooms.all(buildingId),
    queryFn: () => roomsService.getAll(buildingId),
  });
}

export function useRoom(id: string) {
  return useQuery({
    queryKey: ["rooms", "detail", id] as const,
    queryFn: () => roomsService.getById(id),
    enabled: Boolean(id),
  });
}
