/**
 * Spring WebSocket / STOMP infrastructure (Phase 4.2): connection and
 * broker wiring ({@link com.vithub.backend.config.WebSocketConfig}),
 * the shared message envelope, topic constants, and a reusable
 * publishing service ({@link com.vithub.backend.websocket.service.NotificationPublisherService}).
 * This is infrastructure only — no existing module publishes through it
 * yet, and no scheduler, AI, or analytics wiring lives here.
 */
package com.vithub.backend.websocket;
