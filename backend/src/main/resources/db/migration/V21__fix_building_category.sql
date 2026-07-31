-- Fix invalid BuildingCategory strings inserted in V18 that crash Hibernate
UPDATE buildings SET category = 'HOSTEL' WHERE category = 'RESIDENTIAL';
