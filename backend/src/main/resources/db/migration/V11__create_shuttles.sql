-- V11__create_shuttles.sql
-- Schema for the Shuttle module (Phase 4): the campus shuttle fleet
-- directory — number, driver, capacity and operational status. Live
-- position tracking belongs to the separate shuttle_locations module and
-- is introduced in a later migration.

CREATE TABLE shuttles (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shuttle_number  VARCHAR(20)   NOT NULL,
    shuttle_name    VARCHAR(150)  NOT NULL,
    driver_name     VARCHAR(150)  NOT NULL,
    driver_contact  VARCHAR(20)   NOT NULL,
    capacity        INTEGER       NOT NULL,
    status          VARCHAR(20)   NOT NULL,
    created_at      TIMESTAMP     NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP     NOT NULL DEFAULT now(),
    CONSTRAINT uq_shuttles_shuttle_number UNIQUE (shuttle_number),
    CONSTRAINT chk_shuttles_capacity_positive CHECK (capacity > 0)
);

CREATE INDEX idx_shuttles_status ON shuttles (status);
