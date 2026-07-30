-- V15__create_events.sql
-- Schema for the Event module (Phase 4): campus events surfaced on the
-- dashboard's "Upcoming Events" widget, optionally scoped to a building
-- and/or room. Event registration, QR codes, notifications and chat logs
-- are separate modules and are out of scope here.

CREATE TABLE events (
    id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title                  VARCHAR(200)  NOT NULL,
    description            VARCHAR(2000) NOT NULL,
    category               VARCHAR(50)   NOT NULL,
    event_type             VARCHAR(30)   NOT NULL,
    organizer              VARCHAR(150)  NOT NULL,
    start_date_time        TIMESTAMP     NOT NULL,
    end_date_time          TIMESTAMP     NOT NULL,
    venue                  VARCHAR(200)  NOT NULL,
    building_id            UUID          REFERENCES buildings(id) ON DELETE SET NULL,
    room_id                UUID          REFERENCES rooms(id) ON DELETE SET NULL,
    capacity               INTEGER,
    registration_required  BOOLEAN       NOT NULL DEFAULT FALSE,
    status                 VARCHAR(20)   NOT NULL DEFAULT 'UPCOMING',
    created_by             UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at             TIMESTAMP     NOT NULL DEFAULT now(),
    updated_at             TIMESTAMP     NOT NULL DEFAULT now(),
    CONSTRAINT chk_events_end_after_start CHECK (end_date_time > start_date_time)
);

CREATE INDEX idx_events_status ON events (status);
CREATE INDEX idx_events_category ON events (category);
CREATE INDEX idx_events_building_id ON events (building_id);
CREATE INDEX idx_events_room_id ON events (room_id);
CREATE INDEX idx_events_start_date_time ON events (start_date_time);
CREATE INDEX idx_events_created_by ON events (created_by);
