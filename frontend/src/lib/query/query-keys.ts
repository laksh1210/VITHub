export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    user: () => [...queryKeys.auth.all, "user"] as const,
    session: () => [...queryKeys.auth.all, "session"] as const,
  },
  dashboard: {
    all: ["dashboard"] as const,
    stats: () => [...queryKeys.dashboard.all, "stats"] as const,
    summary: () => [...queryKeys.dashboard.all, "summary"] as const,
  },
  analytics: {
    all: ["analytics"] as const,
    overview: () => [...queryKeys.analytics.all, "overview"] as const,
    occupancy: () => [...queryKeys.analytics.all, "occupancy"] as const,
    library: () => [...queryKeys.analytics.all, "library"] as const,
    canteen: () => [...queryKeys.analytics.all, "canteen"] as const,
    shuttle: () => [...queryKeys.analytics.all, "shuttle"] as const,
    maintenance: () => [...queryKeys.analytics.all, "maintenance"] as const,
    events: () => [...queryKeys.analytics.all, "events"] as const,
  },
  buildings: {
    all: ["buildings"] as const,
    list: () => [...queryKeys.buildings.all, "list"] as const,
    detail: (id: string) => [...queryKeys.buildings.all, "detail", id] as const,
  },
  rooms: {
    all: (buildingId?: string) => buildingId ? ["buildings", buildingId, "rooms"] as const : ["rooms"] as const,
    list: (buildingId: string) => [...queryKeys.rooms.all(buildingId), "list"] as const,
    detail: (buildingId: string, roomId: string) => [...queryKeys.rooms.all(buildingId), "detail", roomId] as const,
    occupancy: () => ["occupancy", "rooms"] as const,
  },
  library: {
    all: ["library"] as const,
    books: () => [...queryKeys.library.all, "books"] as const,
    borrowed: () => [...queryKeys.library.all, "borrowed"] as const,
  },
  canteen: {
    all: ["canteen"] as const,
    queues: () => [...queryKeys.canteen.all, "queues"] as const,
  },
  shuttle: {
    all: ["shuttle"] as const,
    routes: () => [...queryKeys.shuttle.all, "routes"] as const,
    schedule: () => [...queryKeys.shuttle.all, "schedule"] as const,
    locations: () => [...queryKeys.shuttle.all, "locations"] as const,
  },
  events: {
    all: ["events"] as const,
    list: () => [...queryKeys.events.all, "list"] as const,
    detail: (id: string) => [...queryKeys.events.all, "detail", id] as const,
  },
  maintenance: {
    all: ["maintenance"] as const,
    requests: () => [...queryKeys.maintenance.all, "requests"] as const,
  },
  notifications: {
    all: ["notifications"] as const,
    list: () => [...queryKeys.notifications.all, "list"] as const,
  },
} as const;
