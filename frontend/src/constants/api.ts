export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },
  USERS: {
    PROFILE: "/users/profile",
    UPDATE: "/users/update",
  },
  DASHBOARD: {
    STATS: "/dashboard/stats",
    SUMMARY: "/dashboard/summary",
  },
  ANALYTICS: {
    OVERVIEW: "/api/analytics/overview",
    OCCUPANCY: "/api/analytics/occupancy",
    LIBRARY: "/api/analytics/library",
    CANTEEN: "/api/analytics/canteen",
    SHUTTLE: "/api/analytics/shuttle",
    MAINTENANCE: "/api/analytics/maintenance",
    EVENTS: "/api/analytics/events",
  },
  BUILDINGS: {
    LIST: "/buildings",
    DETAILS: (id: string) => `/buildings/${id}`,
  },
  ROOMS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/rooms`,
    DETAILS: (id: string) => `/rooms/${id}`,
    OCCUPANCY: "/occupancy",
  },
  LIBRARY: {
    BOOKS: "/library/books",
    BORROW: (id: string) => `/library/books/${id}/borrow`,
  },
  CANTEEN: {
    QUEUES: "/canteen-queues",
  },
  SHUTTLE: {
    ROUTES: "/shuttle/routes",
    SCHEDULE: "/shuttle/schedule",
    LOCATION: "/shuttle/location",
    LOCATIONS: "/shuttle-locations",
  },
  EVENTS: {
    LIST: "/events",
    DETAILS: (id: string) => `/events/${id}`,
  },
  MAINTENANCE: {
    REQUESTS: "/maintenance/requests",
    CREATE: "/maintenance/requests",
  },
  NOTIFICATIONS: {
    LIST: "/notifications",
    MARK_READ: (id: string) => `/notifications/${id}/read`,
  },
  AI: {
    CHAT: "/ai/chat",
  },
} as const;
