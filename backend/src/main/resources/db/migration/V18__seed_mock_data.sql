-- V18__seed_mock_data.sql
-- Seed the database with initial realistic mock data to populate the frontend dashboard widgets.

-- 1. Insert a dummy System User for foreign key constraints (events, maintenance)
INSERT INTO users (id, username, email, full_name, password)
VALUES ('11111111-1111-1111-1111-111111111111', 'admin', 'admin@vithub.com', 'System Admin', 'mock_hash')
ON CONFLICT DO NOTHING;

-- 2. Seed Buildings
INSERT INTO buildings (id, name, code, description, category, latitude, longitude, total_floors, active) VALUES
('22222222-2222-2222-2222-222222222221', 'Academic Block 1', 'AB1', 'Main Academic Building', 'ACADEMIC', 23.0775, 76.8513, 4, true),
('22222222-2222-2222-2222-222222222222', 'Academic Block 2', 'AB2', 'Engineering Building', 'ACADEMIC', 23.0780, 76.8520, 4, true),
('22222222-2222-2222-2222-222222222223', 'Boys Hostel 1', 'BH1', 'Freshmen Boys Hostel', 'RESIDENTIAL', 23.0760, 76.8500, 6, true)
ON CONFLICT (code) DO NOTHING;

-- 3. Seed Library
INSERT INTO library (id, building_id, name, floor, total_seats, occupied_seats, silent_room_count, discussion_room_count) VALUES
('33333333-3333-3333-3333-333333333331', '22222222-2222-2222-2222-222222222221', 'Central Library', 1, 500, 320, 4, 8)
ON CONFLICT (building_id, name) DO NOTHING;

-- 4. Seed Canteens
INSERT INTO canteens (id, building_id, name, description, floor, seating_capacity, active) VALUES
('44444444-4444-4444-4444-444444444441', '22222222-2222-2222-2222-222222222221', 'FC Food Court', 'Multi-cuisine food court', 0, 200, true),
('44444444-4444-4444-4444-444444444442', '22222222-2222-2222-2222-222222222222', 'Nescafe', 'Coffee and snacks', 1, 30, true)
ON CONFLICT (building_id, name) DO NOTHING;

-- 5. Seed Canteen Queues
INSERT INTO canteen_queue (id, canteen_id, queue_count, estimated_wait_minutes, status) VALUES
('55555555-5555-5555-5555-555555555551', '44444444-4444-4444-4444-444444444441', 25, 15, 'BUSY'),
('55555555-5555-5555-5555-555555555552', '44444444-4444-4444-4444-444444444442', 5, 3, 'NORMAL')
ON CONFLICT (canteen_id) DO NOTHING;

-- 6. Seed Shuttles
INSERT INTO shuttles (id, shuttle_number, shuttle_name, driver_name, driver_contact, capacity, status) VALUES
('66666666-6666-6666-6666-666666666661', 'SH-01', 'Campus Loop A', 'Ramesh', '9876543210', 40, 'ACTIVE'),
('66666666-6666-6666-6666-666666666662', 'SH-02', 'Hostel Express', 'Suresh', '9876543211', 40, 'ACTIVE')
ON CONFLICT (shuttle_number) DO NOTHING;

-- 7. Seed Shuttle Locations
INSERT INTO shuttle_locations (id, shuttle_id, latitude, longitude, speed, direction, last_updated_at) VALUES
('77777777-7777-7777-7777-777777777771', '66666666-6666-6666-6666-666666666661', 23.0770, 76.8510, 15.5, 'EAST', now()),
('77777777-7777-7777-7777-777777777772', '66666666-6666-6666-6666-666666666662', 23.0765, 76.8505, 0.0, 'STATIONARY', now())
ON CONFLICT DO NOTHING;

-- 8. Seed Events
INSERT INTO events (id, title, description, category, event_type, organizer, start_date_time, end_date_time, venue, building_id, capacity, status, created_by) VALUES
('88888888-8888-8888-8888-888888888881', 'Advitiya Tech Fest', 'Annual Technology Festival', 'FESTIVAL', 'OFFLINE', 'Technical Club', now() + interval '5 days', now() + interval '7 days', 'Auditorium', '22222222-2222-2222-2222-222222222221', 1000, 'UPCOMING', '11111111-1111-1111-1111-111111111111'),
('88888888-8888-8888-8888-888888888882', 'Guest Lecture: AI', 'AI in modern world', 'ACADEMIC', 'OFFLINE', 'CSE Dept', now() + interval '1 day', now() + interval '1 day 2 hours', 'Seminar Hall', '22222222-2222-2222-2222-222222222222', 200, 'UPCOMING', '11111111-1111-1111-1111-111111111111')
ON CONFLICT DO NOTHING;

-- 9. Seed Maintenance Requests
INSERT INTO maintenance_requests (id, title, description, category, priority, status, reporter_id, building_id) VALUES
('99999999-9999-9999-9999-999999999991', 'AC not working', 'AC in AB1 Room 302 is blowing hot air', 'AC', 'HIGH', 'OPEN', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222221'),
('99999999-9999-9999-9999-999999999992', 'Broken Chair', 'Chair is broken in library', 'FURNITURE', 'LOW', 'OPEN', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222221')
ON CONFLICT DO NOTHING;
