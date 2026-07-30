package com.vithub.backend.shuttle.entity;

/**
 * Operational status of a shuttle. Values must never be renamed — they
 * are part of the API/DB contract consumed by the dashboard, campus map
 * and AI assistant ("where is Shuttle 2?").
 */
public enum ShuttleStatus {
    ACTIVE,
    INACTIVE,
    MAINTENANCE
}
