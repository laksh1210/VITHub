-- V24__fix_invalid_enum_data.sql
-- Fix invalid enum strings that were inserted by previous mock data scripts,
-- causing JPA to throw IllegalArgumentException (No enum constant) when fetching data.

UPDATE library_seats
SET seat_type = 'REGULAR'
WHERE seat_type NOT IN ('REGULAR', 'SILENT', 'DISCUSSION');

UPDATE canteen_queue
SET status = 'MODERATE'
WHERE status NOT IN ('LOW', 'MODERATE', 'HIGH', 'VERY_HIGH');
