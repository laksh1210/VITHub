-- V16__create_notifications.sql
-- Schema for the Notification module (Phase 4): in-app notifications
-- delivered to a single user, covering the dashboard's real-time
-- notifications widget (complaint updates, event reminders,
-- announcements). Push, email, SMS, Firebase and WebSocket delivery are
-- separate concerns and are out of scope here.

CREATE TABLE notifications (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title        VARCHAR(200)  NOT NULL,
    message      VARCHAR(2000) NOT NULL,
    type         VARCHAR(20)   NOT NULL,
    status       VARCHAR(20)   NOT NULL DEFAULT 'UNREAD',
    recipient_id UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    read_at      TIMESTAMP,
    created_at   TIMESTAMP     NOT NULL DEFAULT now(),
    updated_at   TIMESTAMP     NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_recipient_id ON notifications (recipient_id);
CREATE INDEX idx_notifications_status ON notifications (status);
CREATE INDEX idx_notifications_type ON notifications (type);
CREATE INDEX idx_notifications_recipient_status ON notifications (recipient_id, status);
