package com.vithub.backend.room.entity;

/**
 * Classifies a {@link Room} for filtering, icons and occupancy rules.
 * Values must never be renamed — they are part of the API/DB contract.
 */
public enum RoomType {
    CLASSROOM,
    LAB,
    SEMINAR_HALL,
    AUDITORIUM,
    CONFERENCE_ROOM,
    OFFICE,
    LIBRARY_HALL,
    WASHROOM,
    OTHER
}
