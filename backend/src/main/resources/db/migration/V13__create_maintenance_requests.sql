-- V13__create_maintenance_requests.sql
-- Schema for the Maintenance Request module (Phase 4): campus complaints
-- reported by a user, optionally scoped to a building/room and assigned
-- to a staff member. Maintenance images, notifications and chat logs are
-- separate modules and are out of scope here.

CREATE TABLE maintenance_requests (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title             VARCHAR(200)  NOT NULL,
    description       VARCHAR(2000) NOT NULL,
    category          VARCHAR(50)   NOT NULL,
    priority          VARCHAR(20)   NOT NULL,
    status            VARCHAR(20)   NOT NULL DEFAULT 'OPEN',
    reporter_id       UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assigned_staff_id UUID          REFERENCES users(id) ON DELETE SET NULL,
    building_id       UUID          REFERENCES buildings(id) ON DELETE SET NULL,
    room_id           UUID          REFERENCES rooms(id) ON DELETE SET NULL,
    created_at        TIMESTAMP     NOT NULL DEFAULT now(),
    updated_at        TIMESTAMP     NOT NULL DEFAULT now()
);

CREATE INDEX idx_maintenance_requests_status ON maintenance_requests (status);
CREATE INDEX idx_maintenance_requests_priority ON maintenance_requests (priority);
CREATE INDEX idx_maintenance_requests_reporter_id ON maintenance_requests (reporter_id);
CREATE INDEX idx_maintenance_requests_assigned_staff_id ON maintenance_requests (assigned_staff_id);
CREATE INDEX idx_maintenance_requests_building_id ON maintenance_requests (building_id);
CREATE INDEX idx_maintenance_requests_room_id ON maintenance_requests (room_id);
