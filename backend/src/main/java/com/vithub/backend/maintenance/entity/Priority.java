package com.vithub.backend.maintenance.entity;

/**
 * Urgency level of a {@link MaintenanceRequest}. Values must never be
 * renamed — they are part of the API/DB contract consumed by the
 * Frontend, AI, Maps and DevOps teams.
 */
public enum Priority {
    LOW,
    MEDIUM,
    HIGH,
    CRITICAL
}
