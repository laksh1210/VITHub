package com.vithub.backend.security;

/**
 * System-wide roles used for role-based authorization.
 * Values must never be renamed — they are part of the API/DB contract
 * consumed by the Frontend, AI, Maps and DevOps teams.
 */
public enum Role {
    STUDENT,
    FACULTY,
    ADMIN,
    MAINTENANCE,
    SECURITY,
    GUEST
}
