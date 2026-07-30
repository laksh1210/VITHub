package com.vithub.backend.maintenance.entity;

/**
 * Lifecycle status of a {@link MaintenanceRequest}. Values must never be
 * renamed — they are part of the API/DB contract consumed by the
 * Frontend, AI, Maps and DevOps teams.
 */
public enum MaintenanceStatus {
    OPEN,
    IN_PROGRESS,
    RESOLVED,
    CLOSED
}
