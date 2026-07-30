package com.vithub.backend.library.seat.entity;

/**
 * Classifies which kind of library area a {@link LibrarySeat} sits in.
 * Values must never be renamed — they are part of the API/DB contract.
 */
public enum SeatType {
    REGULAR,
    SILENT,
    DISCUSSION
}
