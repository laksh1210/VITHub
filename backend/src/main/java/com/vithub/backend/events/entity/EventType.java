package com.vithub.backend.events.entity;

/**
 * Classifies the format of an {@link Event} (workshop, seminar, ...),
 * distinct from its free-text {@code category}. Values must never be
 * renamed — they are part of the API/DB contract consumed by the
 * Frontend, AI, Maps and DevOps teams.
 */
public enum EventType {
    WORKSHOP,
    SEMINAR,
    CONFERENCE,
    GUEST_LECTURE,
    CULTURAL,
    SPORTS,
    TECHNICAL,
    COMPETITION,
    OTHER
}
