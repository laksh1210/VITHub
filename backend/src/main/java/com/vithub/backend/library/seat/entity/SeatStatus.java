package com.vithub.backend.library.seat.entity;

/**
 * Live availability state of a {@link LibrarySeat}.
 * Values must never be renamed — they are part of the API/DB contract
 * consumed by the dashboard and AI assistant.
 */
public enum SeatStatus {
    AVAILABLE,
    OCCUPIED,
    RESERVED,
    OUT_OF_SERVICE
}
