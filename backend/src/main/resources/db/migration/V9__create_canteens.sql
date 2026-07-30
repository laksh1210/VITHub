-- V9__create_canteens.sql
-- Schema for the Canteen module (Phase 4): canteen / food outlets within a
-- campus building. Live queue length belongs to the separate canteen_queue
-- module and is introduced in a later migration.

CREATE TABLE canteens (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    building_id      UUID          NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
    name             VARCHAR(150)  NOT NULL,
    description      VARCHAR(1000),
    floor            INTEGER,
    seating_capacity INTEGER,
    opening_time     TIME,
    closing_time     TIME,
    contact_number   VARCHAR(20),
    image_url        VARCHAR(500),
    active           BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at       TIMESTAMP     NOT NULL DEFAULT now(),
    updated_at       TIMESTAMP     NOT NULL DEFAULT now(),
    CONSTRAINT uq_canteens_building_id_name UNIQUE (building_id, name),
    CONSTRAINT chk_canteens_seating_capacity_non_negative CHECK (seating_capacity IS NULL OR seating_capacity >= 0)
);

CREATE INDEX idx_canteens_building_id ON canteens (building_id);
CREATE INDEX idx_canteens_name ON canteens (name);
