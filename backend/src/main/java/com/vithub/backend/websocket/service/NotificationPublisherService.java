package com.vithub.backend.websocket.service;

/**
 * Reusable publishing surface for real-time campus updates over the
 * STOMP broker. Every module that later wants to push a live update
 * (occupancy readings, library seat changes, canteen queues, shuttle
 * positions, maintenance status, events, notifications, or the
 * dashboard summary) does so through this interface rather than
 * depending on {@code SimpMessagingTemplate} directly — this is the
 * only seam that should know about broker topics and the
 * {@link com.vithub.backend.websocket.dto.WebSocketMessage} envelope.
 * No caller is wired up to this yet — it is infrastructure only.
 */
public interface NotificationPublisherService {

    /**
     * Publishes a payload to an arbitrary topic, wrapped in a
     * {@link com.vithub.backend.websocket.dto.WebSocketMessage} envelope.
     *
     * @param topic     the fully-qualified broker destination, e.g. one of
     *                  {@link com.vithub.backend.websocket.util.WebSocketTopics}
     * @param eventType what kind of change this is (e.g. {@code UPDATED})
     * @param module    which module produced this message (e.g. {@code OCCUPANCY})
     * @param payload   the data being broadcast
     */
    <T> void publish(String topic, String eventType, String module, T payload);

    /** Publishes an update to {@link com.vithub.backend.websocket.util.WebSocketTopics#DASHBOARD}. */
    <T> void publishDashboardUpdate(String eventType, T payload);

    /** Publishes an update to {@link com.vithub.backend.websocket.util.WebSocketTopics#OCCUPANCY}. */
    <T> void publishOccupancyUpdate(String eventType, T payload);

    /** Publishes an update to {@link com.vithub.backend.websocket.util.WebSocketTopics#LIBRARY}. */
    <T> void publishLibraryUpdate(String eventType, T payload);

    /** Publishes an update to {@link com.vithub.backend.websocket.util.WebSocketTopics#CANTEEN}. */
    <T> void publishCanteenUpdate(String eventType, T payload);

    /** Publishes an update to {@link com.vithub.backend.websocket.util.WebSocketTopics#SHUTTLE}. */
    <T> void publishShuttleUpdate(String eventType, T payload);

    /** Publishes an update to {@link com.vithub.backend.websocket.util.WebSocketTopics#MAINTENANCE}. */
    <T> void publishMaintenanceUpdate(String eventType, T payload);

    /** Publishes an update to {@link com.vithub.backend.websocket.util.WebSocketTopics#EVENTS}. */
    <T> void publishEventUpdate(String eventType, T payload);

    /** Publishes an update to {@link com.vithub.backend.websocket.util.WebSocketTopics#NOTIFICATIONS}. */
    <T> void publishNotification(String eventType, T payload);

}
