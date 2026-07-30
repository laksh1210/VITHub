package com.vithub.backend.notifications.entity;

/**
 * Severity/category of a {@link Notification}. Values must never be
 * renamed — they are part of the API/DB contract consumed by the
 * Frontend, AI, Maps and DevOps teams.
 */
public enum NotificationType {
    INFO,
    SUCCESS,
    WARNING,
    ERROR
}
