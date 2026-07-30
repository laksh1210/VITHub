-- V12__create_shuttle_locations.sql
-- Schema for the Shuttle Location module (Phase 4): a history log of GPS
-- pings for a shuttle. Unlike occupancy/canteen_queue this is many rows
-- per parent, not one — the "current" position is simply the most recent
-- row for a given shuttle.

CREATE TABLE shuttle_locations (
    id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shuttle_id         UUID           NOT NULL REFERENCES shuttles(id) ON DELETE CASCADE,
    latitude           NUMERIC(10, 7) NOT NULL,
    longitude          NUMERIC(10, 7) NOT NULL,
    speed              DOUBLE PRECISION NOT NULL,
    direction          VARCHAR(50)    NOT NULL,
    last_updated_at    TIMESTAMP      NOT NULL,
    current_stop_name  VARCHAR(150),
    created_at         TIMESTAMP      NOT NULL DEFAULT now(),
    updated_at         TIMESTAMP      NOT NULL DEFAULT now(),
    CONSTRAINT chk_shuttle_locations_speed_non_negative CHECK (speed >= 0)
);

CREATE INDEX idx_shuttle_locations_shuttle_id ON shuttle_locations (shuttle_id);
CREATE INDEX idx_shuttle_locations_shuttle_id_last_updated_at ON shuttle_locations (shuttle_id, last_updated_at DESC);
