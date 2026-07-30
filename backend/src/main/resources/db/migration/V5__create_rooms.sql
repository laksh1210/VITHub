-- V5__create_rooms.sql
-- Schema for the Room module (Phase 4): rooms within a campus building
-- (the "BuildingRoom relationship"), referenced by occupancy, the AI
-- assistant and the campus map.

CREATE TABLE rooms (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    building_id UUID          NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
    room_number VARCHAR(20)   NOT NULL,
    name        VARCHAR(150),
    type        VARCHAR(30)   NOT NULL,
    floor       INTEGER       NOT NULL,
    capacity    INTEGER       NOT NULL,
    active      BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP     NOT NULL DEFAULT now(),
    updated_at  TIMESTAMP     NOT NULL DEFAULT now(),
    CONSTRAINT uq_rooms_building_id_room_number UNIQUE (building_id, room_number)
);

CREATE INDEX idx_rooms_building_id ON rooms (building_id);
CREATE INDEX idx_rooms_type ON rooms (type);
