-- V10__create_canteen_queue.sql
-- Schema for the Canteen Queue module (Phase 4): the live queue length and
-- estimated wait time for a canteen, mirroring how occupancy relates to
-- rooms. Each canteen has at most one queue record — a live snapshot, not
-- a history log.

CREATE TABLE canteen_queue (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    canteen_id              UUID          NOT NULL REFERENCES canteens(id) ON DELETE CASCADE,
    queue_count             INTEGER       NOT NULL DEFAULT 0,
    estimated_wait_minutes  INTEGER,
    status                  VARCHAR(20)   NOT NULL,
    recorded_at             TIMESTAMP     NOT NULL DEFAULT now(),
    created_at              TIMESTAMP     NOT NULL DEFAULT now(),
    updated_at              TIMESTAMP     NOT NULL DEFAULT now(),
    CONSTRAINT uq_canteen_queue_canteen_id UNIQUE (canteen_id),
    CONSTRAINT chk_canteen_queue_count_non_negative CHECK (queue_count >= 0),
    CONSTRAINT chk_canteen_queue_wait_minutes_non_negative CHECK (estimated_wait_minutes IS NULL OR estimated_wait_minutes >= 0)
);

CREATE INDEX idx_canteen_queue_canteen_id ON canteen_queue (canteen_id);
