-- V23__add_more_shuttles.sql
-- Add more shuttles to the DB and insert location data with current_stop_name to populate ETAs

-- 1. Insert more shuttles
INSERT INTO shuttles (id, shuttle_number, shuttle_name, driver_name, driver_contact, capacity, status) VALUES
('66666666-6666-6666-6666-666666666663', 'SH-03', 'Girls Hostel Line', 'Arun', '9876543212', 40, 'ACTIVE'),
('66666666-6666-6666-6666-666666666664', 'SH-04', 'Library Shuttle', 'Vikram', '9876543213', 25, 'ACTIVE'),
('66666666-6666-6666-6666-666666666665', 'SH-05', 'Main Gate Express', 'Raj', '9876543214', 30, 'ACTIVE'),
('66666666-6666-6666-6666-666666666666', 'SH-06', 'Night Rider', 'Kumar', '9876543215', 20, 'INACTIVE')
ON CONFLICT (shuttle_number) DO NOTHING;

-- 2. Insert locations with current_stop_name for all active shuttles (including SH-01 and SH-02 from V18)
INSERT INTO shuttle_locations (shuttle_id, latitude, longitude, speed, direction, current_stop_name, last_updated_at) VALUES
('66666666-6666-6666-6666-666666666661', 23.0770, 76.8510, 25.5, 'NORTH', 'Academic Block 1', now()),
('66666666-6666-6666-6666-666666666662', 23.0765, 76.8505, 18.0, 'WEST', 'Boys Hostel 1', now()),
('66666666-6666-6666-6666-666666666663', 23.0780, 76.8520, 22.0, 'SOUTH', 'Girls Hostel 2', now()),
('66666666-6666-6666-6666-666666666664', 23.0775, 76.8515, 12.0, 'EAST', 'Central Library', now()),
('66666666-6666-6666-6666-666666666665', 23.0750, 76.8490, 30.0, 'NORTH', 'Main Gate', now());

-- 3. Insert more Canteens
INSERT INTO canteens (id, building_id, name, description, floor, seating_capacity, active) VALUES
('44444444-4444-4444-4444-444444444443', '22222222-2222-2222-2222-222222222221', 'Domino''s Pizza', 'Pizza and Fast Food', 0, 50, true),
('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222223', 'Midnight Canteen', 'Late night snacks and meals', 0, 100, true)
ON CONFLICT (building_id, name) DO NOTHING;

-- 4. Seed Canteen Queues for the new canteens
INSERT INTO canteen_queue (id, canteen_id, queue_count, estimated_wait_minutes, status) VALUES
('55555555-5555-5555-5555-555555555553', '44444444-4444-4444-4444-444444444443', 12, 10, 'NORMAL'),
('55555555-5555-5555-5555-555555555554', '44444444-4444-4444-4444-444444444444', 45, 25, 'CROWDED')
ON CONFLICT (canteen_id) DO NOTHING;
