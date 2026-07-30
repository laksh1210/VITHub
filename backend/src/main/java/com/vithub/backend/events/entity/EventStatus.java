package com.vithub.backend.events.entity;

/**
 * Lifecycle status of an {@link Event}. Values must never be renamed —
 * they are part of the API/DB contract consumed by the Frontend, AI,
 * Maps and DevOps teams.
 */
public enum EventStatus {
    UPCOMING,
    ONGOING,
    COMPLETED,
    CANCELLED
}
