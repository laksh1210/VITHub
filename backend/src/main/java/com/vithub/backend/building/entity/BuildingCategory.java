package com.vithub.backend.building.entity;

/**
 * Classifies a {@link Building} for filtering, map markers and icons.
 * Values must never be renamed — they are part of the API/DB contract.
 */
public enum BuildingCategory {
    ACADEMIC,
    HOSTEL,
    LIBRARY,
    CANTEEN,
    ADMIN,
    SPORTS,
    MEDICAL,
    PARKING,
    OTHER
}
