export type EventStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";

export type EventType =
  | "WORKSHOP"
  | "SEMINAR"
  | "CONFERENCE"
  | "GUEST_LECTURE"
  | "CULTURAL"
  | "SPORTS"
  | "TECHNICAL"
  | "COMPETITION"
  | "OTHER";

/**
 * Mirrors com.vithub.backend.events.dto.EventResponse exactly.
 */
export interface EventResponse {
  id: string;
  title: string;
  description: string;
  category: string;
  eventType: EventType;
  organizer: string;
  startDateTime: string;
  endDateTime: string;
  venue: string;
  buildingId: string | null;
  buildingName: string | null;
  roomId: string | null;
  roomNumber: string | null;
  capacity: number | null;
  registrationRequired: boolean;
  status: EventStatus;
  createdById: string;
  createdByUsername: string;
  createdByFullName: string;
  createdAt: string;
  updatedAt: string;
}
