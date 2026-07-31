-- Fix invalid EventType strings inserted in V18 that crash Hibernate
UPDATE events SET event_type = 'TECHNICAL' WHERE event_type = 'OFFLINE' AND title = 'Advitiya Tech Fest';
UPDATE events SET event_type = 'GUEST_LECTURE' WHERE event_type = 'OFFLINE' AND title = 'Guest Lecture: AI';

-- Just in case there are any other 'OFFLINE' events somehow
UPDATE events SET event_type = 'OTHER' WHERE event_type = 'OFFLINE';
