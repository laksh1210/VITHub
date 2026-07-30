-- V6__create_occupancy.sql
-- Schema for the Classroom Occupancy module (Phase 4): a live, single-row-
-- per-room snapshot of headcount and heatmap status. One-to-one with rooms
-- (the "RoomOccupancy relationship"); history/time-series is out of scope.

CREATE TABLE occupancy (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id       UUID          NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    current_count INTEGER       NOT NULL DEFAULT 0,
    status        VARCHAR(20)   NOT NULL,
    recorded_at   TIMESTAMP     NOT NULL DEFAULT now(),
    created_at    TIMESTAMP     NOT NULL DEFAULT now(),
    updated_at    TIMESTAMP     NOT NULL DEFAULT now(),
    CONSTRAINT uq_occupancy_room_id UNIQUE (room_id),
    CONSTRAINT chk_occupancy_current_count_non_negative CHECK (current_count >= 0)
);

CREATE INDEX idx_occupancy_room_id ON occupancy (room_id);
CREATE INDEX idx_occupancy_status ON occupancy (status);
