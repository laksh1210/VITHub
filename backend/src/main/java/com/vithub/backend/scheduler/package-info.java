/**
 * Scheduled tasks powering mock simulated data (Phase 4.3): occupancy,
 * library seats, canteen queues, shuttle GPS movement, maintenance
 * status progression and event status transitions. Every scheduler reads
 * through existing repositories/services and publishes its updates via
 * {@link com.vithub.backend.websocket.service.NotificationPublisherService}.
 */
package com.vithub.backend.scheduler;
