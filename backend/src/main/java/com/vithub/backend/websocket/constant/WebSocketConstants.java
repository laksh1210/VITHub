package com.vithub.backend.websocket.constant;

/**
 * Central constants for the STOMP-over-WebSocket wiring: the connection
 * endpoint and the two broker prefixes configured in
 * {@link com.vithub.backend.config.WebSocketConfig}. Kept separate from
 * {@link com.vithub.backend.websocket.util.WebSocketTopics} so the
 * low-level protocol wiring (endpoint, prefixes) is not mixed with the
 * business topic names built on top of it.
 */
public final class WebSocketConstants {

    private WebSocketConstants() {
    }

    /** The single STOMP connection endpoint clients connect to. */
    public static final String WEBSOCKET_ENDPOINT = "/ws";

    /** Prefix for messages routed to {@code @MessageMapping}-annotated handlers. */
    public static final String APPLICATION_DESTINATION_PREFIX = "/app";

    /** Prefix for the simple in-memory broker that fans messages out to subscribers. */
    public static final String BROKER_DESTINATION_PREFIX = "/topic";

    // Module name tags used in the WebSocketMessage envelope's `module` field.
    public static final String MODULE_DASHBOARD = "DASHBOARD";
    public static final String MODULE_OCCUPANCY = "OCCUPANCY";
    public static final String MODULE_LIBRARY = "LIBRARY";
    public static final String MODULE_CANTEEN = "CANTEEN";
    public static final String MODULE_SHUTTLE = "SHUTTLE";
    public static final String MODULE_MAINTENANCE = "MAINTENANCE";
    public static final String MODULE_EVENTS = "EVENTS";
    public static final String MODULE_NOTIFICATIONS = "NOTIFICATIONS";

}
