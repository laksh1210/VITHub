-- V4__create_buildings.sql
-- Schema for the Building module (Phase 4): the campus building directory
-- referenced by rooms, occupancy, library, canteens and the campus map.

CREATE TABLE buildings (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name         VARCHAR(150)     NOT NULL,
    code         VARCHAR(20)      NOT NULL,
    description  VARCHAR(1000),
    category     VARCHAR(30)      NOT NULL,
    latitude     NUMERIC(10, 7)   NOT NULL,
    longitude    NUMERIC(10, 7)   NOT NULL,
    total_floors INTEGER,
    address      VARCHAR(255),
    image_url    VARCHAR(500),
    active       BOOLEAN          NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMP        NOT NULL DEFAULT now(),
    updated_at   TIMESTAMP        NOT NULL DEFAULT now(),
    CONSTRAINT uq_buildings_code UNIQUE (code)
);

CREATE INDEX idx_buildings_code ON buildings (code);
CREATE INDEX idx_buildings_category ON buildings (category);
