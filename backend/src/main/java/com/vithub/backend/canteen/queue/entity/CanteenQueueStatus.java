package com.vithub.backend.canteen.queue.entity;

/**
 * Crowding tier for a canteen's live queue, derived from
 * {@code queueCount}. Values must never be renamed — they are part of the
 * API/DB contract consumed by the dashboard and AI assistant ("how long is
 * the canteen wait?").
 */
public enum CanteenQueueStatus {
    LOW,
    MODERATE,
    HIGH,
    VERY_HIGH
}
