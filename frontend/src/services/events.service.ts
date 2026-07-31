import { BaseService } from "./core/base.service";
import type { EventResponse, EventStatus } from "@/types/event";

/**
 * Consumer for EventController. Phase 6 remains read-only and uses only the
 * existing event APIs exposed by the backend.
 */
class EventsService extends BaseService {
  constructor() {
    super("");
  }
  public async getAll(): Promise<EventResponse[]> {
    return this.get<EventResponse[]>("/events");
  }

  public async getUpcoming(): Promise<EventResponse[]> {
    return this.get<EventResponse[]>("/events/upcoming");
  }

  public async getByStatus(status: EventStatus): Promise<EventResponse[]> {
    return this.get<EventResponse[]>(`/events/status/${status}`);
  }

  public async getByCategory(category: string): Promise<EventResponse[]> {
    return this.get<EventResponse[]>(`/events/category/${category}`);
  }

  public async getByBuildingId(buildingId: string): Promise<EventResponse[]> {
    return this.get<EventResponse[]>(`/events/building/${buildingId}`);
  }

  public async getByRoom(roomId: string): Promise<EventResponse[]> {
    return this.get<EventResponse[]>(`/events/room/${roomId}`);
  }

  public async getByDateRange(start: string, end: string): Promise<EventResponse[]> {
    return this.get<EventResponse[]>("/events/range", {
        params: { start, end },
      });
  }

  public async getById(id: string): Promise<EventResponse> {
    return this.get<EventResponse>(`/events/${id}`);
  }
}

export const eventsService = new EventsService();
