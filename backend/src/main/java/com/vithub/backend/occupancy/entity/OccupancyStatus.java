package com.vithub.backend.occupancy.entity;

/**
 * Heatmap tier for a room's occupancy level, derived from
 * {@code currentCount / room.capacity}. Values must never be renamed —
 * they are part of the API/DB contract consumed by the dashboard, campus
 * map heatmap and AI assistant.
 */
public enum OccupancyStatus {
    AVAILABLE,
    MODERATE,
    CROWDED,
    FULL
}
