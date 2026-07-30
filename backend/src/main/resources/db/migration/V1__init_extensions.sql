-- V1__init_extensions.sql
-- Baseline migration for VITHub backend.
-- Enables the extension required for UUID generation used across all entities.
-- Actual domain tables are introduced in later migrations (Phase 3 onward)
-- to keep migrations reviewable and traceable to the Project Bible schema.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
