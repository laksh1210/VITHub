import { apiClient, unwrap } from "./client";
import type { ApiResponse } from "@/lib/types/common";
import type { EventResponse, EventStatus } from "@/lib/types/event";

/**
 * Consumer for EventController. Phase 6 remains read-only and uses only the
 * existing event APIs exposed by the backend.
 */
export const eventsApi = {
  getAll: (): Promise<EventResponse[]> =>
    unwrap(apiClient.get<ApiResponse<EventResponse[]>>("/events")),

  getUpcoming: (): Promise<EventResponse[]> =>
    unwrap(apiClient.get<ApiResponse<EventResponse[]>>("/events/upcoming")),

  getByStatus: (status: EventStatus): Promise<EventResponse[]> =>
    unwrap(apiClient.get<ApiResponse<EventResponse[]>>(`/events/status/${status}`)),

  getByCategory: (category: string): Promise<EventResponse[]> =>
    unwrap(apiClient.get<ApiResponse<EventResponse[]>>(`/events/category/${category}`)),

  getByBuilding: (buildingId: string): Promise<EventResponse[]> =>
    unwrap(apiClient.get<ApiResponse<EventResponse[]>>(`/events/building/${buildingId}`)),

  getByRoom: (roomId: string): Promise<EventResponse[]> =>
    unwrap(apiClient.get<ApiResponse<EventResponse[]>>(`/events/room/${roomId}`)),

  getByDateRange: (start: string, end: string): Promise<EventResponse[]> =>
    unwrap(
      apiClient.get<ApiResponse<EventResponse[]>>("/events/range", {
        params: { start, end },
      })
    ),

  getById: (id: string): Promise<EventResponse> =>
    unwrap(apiClient.get<ApiResponse<EventResponse>>(`/events/${id}`)),
};
