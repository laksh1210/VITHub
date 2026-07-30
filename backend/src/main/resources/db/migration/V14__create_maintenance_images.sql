-- V14__create_maintenance_images.sql
-- Schema for the Maintenance Image module (Phase 4): photos attached to a
-- maintenance complaint. Actual file/cloud storage is out of scope — this
-- table only records the resulting URL and its metadata.

CREATE TABLE maintenance_images (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    maintenance_request_id  UUID          NOT NULL REFERENCES maintenance_requests(id) ON DELETE CASCADE,
    image_url               VARCHAR(500)  NOT NULL,
    image_type              VARCHAR(20)   NOT NULL,
    caption                 VARCHAR(500),
    uploaded_by             UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at              TIMESTAMP     NOT NULL DEFAULT now(),
    updated_at              TIMESTAMP     NOT NULL DEFAULT now()
);

CREATE INDEX idx_maintenance_images_maintenance_request_id ON maintenance_images (maintenance_request_id);
CREATE INDEX idx_maintenance_images_uploaded_by ON maintenance_images (uploaded_by);
CREATE INDEX idx_maintenance_images_image_type ON maintenance_images (image_type);
