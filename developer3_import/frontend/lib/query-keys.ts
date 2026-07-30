/**
 * Centralized query keys so cache invalidation never drifts from what a
 * query actually used. Extend this file — never inline ad-hoc key arrays.
 */
export const queryKeys = {
  buildings: {
    all: ["buildings"] as const,
    detail: (id: string) => ["buildings", id] as const,
  },
  rooms: {
    all: (buildingId?: string) => ["rooms", { buildingId: buildingId ?? null }] as const,
    detail: (id: string) => ["rooms", "detail", id] as const,
  },
  libraries: {
    all: (buildingId?: string) => ["libraries", { buildingId: buildingId ?? null }] as const,
    detail: (id: string) => ["libraries", "detail", id] as const,
  },
  librarySeats: {
    all: (libraryId?: string) => ["librarySeats", { libraryId: libraryId ?? null }] as const,
    available: (libraryId?: string) =>
      ["librarySeats", "available", { libraryId: libraryId ?? null }] as const,
    occupied: (libraryId?: string) =>
      ["librarySeats", "occupied", { libraryId: libraryId ?? null }] as const,
    detail: (id: string) => ["librarySeats", "detail", id] as const,
  },
  canteens: {
    all: (buildingId?: string) => ["canteens", { buildingId: buildingId ?? null }] as const,
    byName: (name: string) => ["canteens", "search", name] as const,
    detail: (id: string) => ["canteens", "detail", id] as const,
  },
  canteenQueues: {
    all: ["canteenQueues"] as const,
    detail: (id: string) => ["canteenQueues", "detail", id] as const,
    byCanteen: (canteenId: string) => ["canteenQueues", "canteen", canteenId] as const,
  },
  shuttles: {
    all: ["shuttles"] as const,
    active: ["shuttles", "active"] as const,
    byStatus: (status: string) => ["shuttles", "status", status] as const,
    detail: (id: string) => ["shuttles", "detail", id] as const,
  },
  shuttleLocations: {
    allCurrent: ["shuttleLocations"] as const,
    detail: (id: string) => ["shuttleLocations", "detail", id] as const,
    latest: (shuttleId: string) => ["shuttleLocations", "latest", shuttleId] as const,
    history: (shuttleId: string) => ["shuttleLocations", "history", shuttleId] as const,
  },
  maintenance: {
    all: ["maintenance"] as const,
    my: ["maintenance", "my"] as const,
    byStatus: (status: string) => ["maintenance", "status", status] as const,
    byPriority: (priority: string) => ["maintenance", "priority", priority] as const,
    byBuilding: (buildingId: string) => ["maintenance", "building", buildingId] as const,
    byRoom: (roomId: string) => ["maintenance", "room", roomId] as const,
    detail: (id: string) => ["maintenance", "detail", id] as const,
  },
  events: {
    all: ["events"] as const,
    upcoming: ["events", "upcoming"] as const,
    byStatus: (status: string) => ["events", "status", status] as const,
    byCategory: (category: string) => ["events", "category", category] as const,
    byBuilding: (buildingId: string) => ["events", "building", buildingId] as const,
    byRoom: (roomId: string) => ["events", "room", roomId] as const,
    byRange: (start: string, end: string) => ["events", "range", start, end] as const,
    detail: (id: string) => ["events", "detail", id] as const,
  },
};
