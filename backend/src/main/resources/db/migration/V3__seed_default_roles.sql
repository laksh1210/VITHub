-- V3__seed_default_roles.sql
-- Seeds the fixed set of roles defined in com.vithub.backend.security.Role.
-- Registration assigns STUDENT by default; other roles are granted by an Admin.

INSERT INTO roles (id, name, created_at, updated_at) VALUES
    (uuid_generate_v4(), 'STUDENT',     now(), now()),
    (uuid_generate_v4(), 'FACULTY',     now(), now()),
    (uuid_generate_v4(), 'ADMIN',       now(), now()),
    (uuid_generate_v4(), 'MAINTENANCE', now(), now()),
    (uuid_generate_v4(), 'SECURITY',    now(), now()),
    (uuid_generate_v4(), 'GUEST',       now(), now());
