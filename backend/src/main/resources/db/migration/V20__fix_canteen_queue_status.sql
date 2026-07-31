-- Fix invalid CanteenQueueStatus strings inserted in V18 that crash Hibernate
UPDATE canteen_queue SET status = 'HIGH' WHERE status = 'BUSY';
UPDATE canteen_queue SET status = 'LOW' WHERE status = 'NORMAL';
