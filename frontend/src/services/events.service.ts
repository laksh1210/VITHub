import { BaseService } from "./core/base.service";
import type { EventResponse, EventStatus } from "@/types/event";
import { MOCK_EVENTS } from "./mocks/mock-event-db";

/**
 * Consumer for EventController. Phase 6 remains read-only and uses only the
 * existing event APIs exposed by the backend.
 */
class EventsService extends BaseService {
  constructor() {
    super("");
  }
  public async getAll(): Promise<EventResponse[]> {
    return Promise.resolve(MOCK_EVENTS);
  }

  public async getUpcoming(): Promise<EventResponse[]> {
    return Promise.resolve(MOCK_EVENTS.filter(e => e.status === "UPCOMING"));
  }

  public async getOngoing(): Promise<EventResponse[]> {
    return Promise.resolve(MOCK_EVENTS.filter(e => e.status === "ONGOING"));
  }

  public async getByStatus(status: EventStatus): Promise<EventResponse[]> {
    return Promise.resolve(MOCK_EVENTS.filter(e => e.status === status));
  }

  public async getByCategory(category: string): Promise<EventResponse[]> {
    return Promise.resolve(MOCK_EVENTS.filter(e => e.category === category));
  }

  public async getByBuildingId(buildingId: string): Promise<EventResponse[]> {
    return Promise.resolve(MOCK_EVENTS.filter(e => e.buildingId === buildingId));
  }

  public async getByRoom(roomId: string): Promise<EventResponse[]> {
    return Promise.resolve(MOCK_EVENTS.filter(e => e.roomId === roomId));
  }

  public async getByDateRange(start: string, end: string): Promise<EventResponse[]> {
    return Promise.resolve(MOCK_EVENTS.filter(e => e.startDateTime >= start && e.endDateTime <= end));
  }

  public async getById(id: string): Promise<EventResponse> {
    const event = MOCK_EVENTS.find(e => e.id === id);
    if (!event) throw new Error("Event not found");
    return Promise.resolve(event);
  }
}

export const eventsService = new EventsService();
