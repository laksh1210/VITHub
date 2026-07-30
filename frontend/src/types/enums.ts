/**
 * Enum → label/color maps for UI badges. Enum members mirror the backend
 * exactly (com.vithub.backend.building.entity.BuildingCategory and
 * com.vithub.backend.room.entity.RoomType) and must never be renamed.
 */

export const BUILDING_CATEGORIES = [
  "ACADEMIC",
  "HOSTEL",
  "LIBRARY",
  "CANTEEN",
  "ADMIN",
  "SPORTS",
  "MEDICAL",
  "PARKING",
  "OTHER",
] as const;

export type BuildingCategory = (typeof BUILDING_CATEGORIES)[number];

export const BUILDING_CATEGORY_LABEL: Record<BuildingCategory, string> = {
  ACADEMIC: "Academic",
  HOSTEL: "Hostel",
  LIBRARY: "Library",
  CANTEEN: "Canteen",
  ADMIN: "Admin",
  SPORTS: "Sports",
  MEDICAL: "Medical",
  PARKING: "Parking",
  OTHER: "Other",
};

/** Tailwind color tokens per category — dot + badge tint, dark-theme safe. */
export const BUILDING_CATEGORY_COLOR: Record<BuildingCategory, string> = {
  ACADEMIC: "bg-[#6C63FF]/15 text-[#A5A0FF] border-[#6C63FF]/30",
  HOSTEL: "bg-[#F59E0B]/15 text-[#FBBF24] border-[#F59E0B]/30",
  LIBRARY: "bg-[#22C55E]/15 text-[#4ADE80] border-[#22C55E]/30",
  CANTEEN: "bg-[#F97316]/15 text-[#FB923C] border-[#F97316]/30",
  ADMIN: "bg-[#A78BFA]/15 text-[#C4B5FD] border-[#A78BFA]/30",
  SPORTS: "bg-[#06B6D4]/15 text-[#22D3EE] border-[#06B6D4]/30",
  MEDICAL: "bg-[#EF4444]/15 text-[#F87171] border-[#EF4444]/30",
  PARKING: "bg-[#71717A]/15 text-[#A1A1AA] border-[#71717A]/30",
  OTHER: "bg-[#71717A]/15 text-[#A1A1AA] border-[#71717A]/30",
};

export const ROOM_TYPES = [
  "CLASSROOM",
  "LAB",
  "SEMINAR_HALL",
  "AUDITORIUM",
  "CONFERENCE_ROOM",
  "OFFICE",
  "LIBRARY_HALL",
  "WASHROOM",
  "OTHER",
] as const;

export type RoomType = (typeof ROOM_TYPES)[number];

export const ROOM_TYPE_LABEL: Record<RoomType, string> = {
  CLASSROOM: "Classroom",
  LAB: "Lab",
  SEMINAR_HALL: "Seminar Hall",
  AUDITORIUM: "Auditorium",
  CONFERENCE_ROOM: "Conference Room",
  OFFICE: "Office",
  LIBRARY_HALL: "Library Hall",
  WASHROOM: "Washroom",
  OTHER: "Other",
};

export const ROOM_TYPE_COLOR: Record<RoomType, string> = {
  CLASSROOM: "bg-[#6C63FF]/15 text-[#A5A0FF] border-[#6C63FF]/30",
  LAB: "bg-[#06B6D4]/15 text-[#22D3EE] border-[#06B6D4]/30",
  SEMINAR_HALL: "bg-[#A78BFA]/15 text-[#C4B5FD] border-[#A78BFA]/30",
  AUDITORIUM: "bg-[#F59E0B]/15 text-[#FBBF24] border-[#F59E0B]/30",
  CONFERENCE_ROOM: "bg-[#22C55E]/15 text-[#4ADE80] border-[#22C55E]/30",
  OFFICE: "bg-[#F97316]/15 text-[#FB923C] border-[#F97316]/30",
  LIBRARY_HALL: "bg-[#22C55E]/15 text-[#4ADE80] border-[#22C55E]/30",
  WASHROOM: "bg-[#71717A]/15 text-[#A1A1AA] border-[#71717A]/30",
  OTHER: "bg-[#71717A]/15 text-[#A1A1AA] border-[#71717A]/30",
};

/**
 * Phase 2 — Library module. Enum members mirror the backend exactly
 * (com.vithub.backend.library.seat.entity.SeatType /.SeatStatus) and must
 * never be renamed.
 */
export const SEAT_TYPES = ["REGULAR", "SILENT", "DISCUSSION"] as const;

export type SeatType = (typeof SEAT_TYPES)[number];

export const SEAT_TYPE_LABEL: Record<SeatType, string> = {
  REGULAR: "Regular",
  SILENT: "Silent",
  DISCUSSION: "Discussion",
};

export const SEAT_TYPE_COLOR: Record<SeatType, string> = {
  REGULAR: "bg-[#6C63FF]/15 text-[#A5A0FF] border-[#6C63FF]/30",
  SILENT: "bg-[#22C55E]/15 text-[#4ADE80] border-[#22C55E]/30",
  DISCUSSION: "bg-[#A78BFA]/15 text-[#C4B5FD] border-[#A78BFA]/30",
};

export const SEAT_STATUSES = [
  "AVAILABLE",
  "OCCUPIED",
  "RESERVED",
  "OUT_OF_SERVICE",
] as const;

export type SeatStatus = (typeof SEAT_STATUSES)[number];

export const SEAT_STATUS_LABEL: Record<SeatStatus, string> = {
  AVAILABLE: "Available",
  OCCUPIED: "Occupied",
  RESERVED: "Reserved",
  OUT_OF_SERVICE: "Out of service",
};

export const SEAT_STATUS_COLOR: Record<SeatStatus, string> = {
  AVAILABLE: "bg-[#22C55E]/15 text-[#4ADE80] border-[#22C55E]/30",
  OCCUPIED: "bg-[#EF4444]/15 text-[#F87171] border-[#EF4444]/30",
  RESERVED: "bg-[#F59E0B]/15 text-[#FBBF24] border-[#F59E0B]/30",
  OUT_OF_SERVICE: "bg-[#71717A]/15 text-[#A1A1AA] border-[#71717A]/30",
};

/**
 * Phase 3 - Canteen queue module. Enum members mirror
 * com.vithub.backend.canteen.queue.entity.CanteenQueueStatus exactly.
 */
export const CANTEEN_QUEUE_STATUSES = [
  "LOW",
  "MODERATE",
  "HIGH",
  "VERY_HIGH",
] as const;

export type CanteenQueueStatus = (typeof CANTEEN_QUEUE_STATUSES)[number];

export const CANTEEN_QUEUE_STATUS_LABEL: Record<CanteenQueueStatus, string> = {
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  VERY_HIGH: "Very high",
};

export const CANTEEN_QUEUE_STATUS_COLOR: Record<CanteenQueueStatus, string> = {
  LOW: "bg-[#22C55E]/15 text-[#4ADE80] border-[#22C55E]/30",
  MODERATE: "bg-[#06B6D4]/15 text-[#67E8F9] border-[#06B6D4]/30",
  HIGH: "bg-[#F59E0B]/15 text-[#FBBF24] border-[#F59E0B]/30",
  VERY_HIGH: "bg-[#EF4444]/15 text-[#F87171] border-[#EF4444]/30",
};

export const CANTEEN_QUEUE_STATUS_WEIGHT: Record<CanteenQueueStatus, number> = {
  LOW: 1,
  MODERATE: 2,
  HIGH: 3,
  VERY_HIGH: 4,
};

export const SHUTTLE_STATUSES = ["ACTIVE", "INACTIVE", "MAINTENANCE"] as const;

export type ShuttleStatus = (typeof SHUTTLE_STATUSES)[number];

export const SHUTTLE_STATUS_LABEL: Record<ShuttleStatus, string> = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  MAINTENANCE: "Maintenance",
};

export const SHUTTLE_STATUS_COLOR: Record<ShuttleStatus, string> = {
  ACTIVE: "bg-[#22C55E]/15 text-[#4ADE80] border-[#22C55E]/30",
  INACTIVE: "bg-[#71717A]/15 text-[#A1A1AA] border-[#71717A]/30",
  MAINTENANCE: "bg-[#F59E0B]/15 text-[#FBBF24] border-[#F59E0B]/30",
};

export const PRIORITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;

export type Priority = (typeof PRIORITIES)[number];

export const PRIORITY_LABEL: Record<Priority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
};

export const PRIORITY_COLOR: Record<Priority, string> = {
  LOW: "bg-[#22C55E]/15 text-[#4ADE80] border-[#22C55E]/30",
  MEDIUM: "bg-[#06B6D4]/15 text-[#67E8F9] border-[#06B6D4]/30",
  HIGH: "bg-[#F59E0B]/15 text-[#FBBF24] border-[#F59E0B]/30",
  CRITICAL: "bg-[#EF4444]/15 text-[#F87171] border-[#EF4444]/30",
};

export const PRIORITY_WEIGHT: Record<Priority, number> = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  CRITICAL: 4,
};

export const MAINTENANCE_STATUSES = [
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
] as const;

export type MaintenanceStatus = (typeof MAINTENANCE_STATUSES)[number];

export const MAINTENANCE_STATUS_LABEL: Record<MaintenanceStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

export const MAINTENANCE_STATUS_COLOR: Record<MaintenanceStatus, string> = {
  OPEN: "bg-[#EF4444]/15 text-[#F87171] border-[#EF4444]/30",
  IN_PROGRESS: "bg-[#F59E0B]/15 text-[#FBBF24] border-[#F59E0B]/30",
  RESOLVED: "bg-[#22C55E]/15 text-[#4ADE80] border-[#22C55E]/30",
  CLOSED: "bg-[#71717A]/15 text-[#A1A1AA] border-[#71717A]/30",
};

export const MAINTENANCE_STATUS_ORDER: MaintenanceStatus[] = [
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
];

export const EVENT_STATUSES = [
  "UPCOMING",
  "ONGOING",
  "COMPLETED",
  "CANCELLED",
] as const;

export type EventStatus = (typeof EVENT_STATUSES)[number];

export const EVENT_STATUS_LABEL: Record<EventStatus, string> = {
  UPCOMING: "Upcoming",
  ONGOING: "Ongoing",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const EVENT_STATUS_COLOR: Record<EventStatus, string> = {
  UPCOMING: "bg-[#6C63FF]/15 text-[#A5A0FF] border-[#6C63FF]/30",
  ONGOING: "bg-[#22C55E]/15 text-[#4ADE80] border-[#22C55E]/30",
  COMPLETED: "bg-[#06B6D4]/15 text-[#67E8F9] border-[#06B6D4]/30",
  CANCELLED: "bg-[#EF4444]/15 text-[#F87171] border-[#EF4444]/30",
};

export const EVENT_STATUS_WEIGHT: Record<EventStatus, number> = {
  UPCOMING: 1,
  ONGOING: 2,
  COMPLETED: 3,
  CANCELLED: 4,
};

export const EVENT_TYPES = [
  "WORKSHOP",
  "SEMINAR",
  "CONFERENCE",
  "GUEST_LECTURE",
  "CULTURAL",
  "SPORTS",
  "TECHNICAL",
  "COMPETITION",
  "OTHER",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export const EVENT_TYPE_LABEL: Record<EventType, string> = {
  WORKSHOP: "Workshop",
  SEMINAR: "Seminar",
  CONFERENCE: "Conference",
  GUEST_LECTURE: "Guest lecture",
  CULTURAL: "Cultural",
  SPORTS: "Sports",
  TECHNICAL: "Technical",
  COMPETITION: "Competition",
  OTHER: "Other",
};

export const EVENT_TYPE_COLOR: Record<EventType, string> = {
  WORKSHOP: "bg-[#6C63FF]/15 text-[#A5A0FF] border-[#6C63FF]/30",
  SEMINAR: "bg-[#06B6D4]/15 text-[#67E8F9] border-[#06B6D4]/30",
  CONFERENCE: "bg-[#A78BFA]/15 text-[#C4B5FD] border-[#A78BFA]/30",
  GUEST_LECTURE: "bg-[#22C55E]/15 text-[#4ADE80] border-[#22C55E]/30",
  CULTURAL: "bg-[#F59E0B]/15 text-[#FBBF24] border-[#F59E0B]/30",
  SPORTS: "bg-[#F97316]/15 text-[#FB923C] border-[#F97316]/30",
  TECHNICAL: "bg-[#22C55E]/15 text-[#4ADE80] border-[#22C55E]/30",
  COMPETITION: "bg-[#EF4444]/15 text-[#F87171] border-[#EF4444]/30",
  OTHER: "bg-[#71717A]/15 text-[#A1A1AA] border-[#71717A]/30",
};
