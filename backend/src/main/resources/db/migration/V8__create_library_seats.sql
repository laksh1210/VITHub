-- V8__create_library_seats.sql
-- Schema for the Library Seats module (Phase 4): individual seats within a
-- library space (the "LibrarySeat relationship"). Aggregate seat counts on
-- the library table are not recalculated from this table automatically.

CREATE TABLE library_seats (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    library_id  UUID          NOT NULL REFERENCES library(id) ON DELETE CASCADE,
    seat_number VARCHAR(20)   NOT NULL,
    seat_type   VARCHAR(20)   NOT NULL,
    status      VARCHAR(20)   NOT NULL DEFAULT 'AVAILABLE',
    created_at  TIMESTAMP     NOT NULL DEFAULT now(),
    updated_at  TIMESTAMP     NOT NULL DEFAULT now(),
    CONSTRAINT uq_library_seats_library_id_seat_number UNIQUE (library_id, seat_number)
);

CREATE INDEX idx_library_seats_library_id ON library_seats (library_id);
CREATE INDEX idx_library_seats_status ON library_seats (status);
CREATE INDEX idx_library_seats_library_id_status ON library_seats (library_id, status);
