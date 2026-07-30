package com.vithub.backend.maintenance.image.entity;

/**
 * Classifies a {@link MaintenanceImage} within a complaint's lifecycle.
 * Values must never be renamed — they are part of the API/DB contract
 * consumed by the Frontend, AI, Maps and DevOps teams.
 */
public enum ImageType {
    BEFORE,
    AFTER,
    OTHER
}
