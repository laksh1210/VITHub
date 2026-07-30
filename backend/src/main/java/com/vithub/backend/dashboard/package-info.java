/**
 * Dashboard aggregation module (Phase 4): a single, read-only summary
 * endpoint that aggregates existing module data (buildings, rooms,
 * occupancy, library seats, canteens, canteen queues, shuttles,
 * maintenance requests, events and notifications) into one snapshot.
 * Introduces no new tables or entities — it reads exclusively through
 * each module's existing repository. WebSocket delivery, scheduled mock
 * data, AI and deeper analytics are separate concerns and are
 * intentionally out of scope here.
 */
package com.vithub.backend.dashboard;
