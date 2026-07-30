-- V7__create_library.sql
-- Schema for the Library module (Phase 4): library spaces within a campus
-- building (the "BuildingLibrary relationship"), with aggregate seat and
-- room counts. Individual seat-level records belong to the separate
-- library_seats module and are introduced in a later migration.

CREATE TABLE library (
    id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    building_id            UUID          NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
    name                   VARCHAR(150)  NOT NULL,
    floor                  INTEGER,
    total_seats            INTEGER       NOT NULL DEFAULT 0,
    occupied_seats         INTEGER       NOT NULL DEFAULT 0,
    silent_room_count      INTEGER       NOT NULL DEFAULT 0,
    discussion_room_count  INTEGER       NOT NULL DEFAULT 0,
    active                 BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at             TIMESTAMP     NOT NULL DEFAULT now(),
    updated_at             TIMESTAMP     NOT NULL DEFAULT now(),
    CONSTRAINT uq_library_building_id_name UNIQUE (building_id, name),
    CONSTRAINT chk_library_seats_non_negative CHECK (total_seats >= 0 AND occupied_seats >= 0),
    CONSTRAINT chk_library_occupied_within_total CHECK (occupied_seats <= total_seats)
);

CREATE INDEX idx_library_building_id ON library (building_id);
