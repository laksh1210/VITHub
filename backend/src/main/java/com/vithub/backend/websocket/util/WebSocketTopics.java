package com.vithub.backend.websocket.util;

import com.vithub.backend.websocket.constant.WebSocketConstants;

/**
 * Reusable, fully-qualified broker topic names, all rooted under
 * {@link WebSocketConstants#BROKER_DESTINATION_PREFIX}. Every module that
 * eventually publishes real-time updates subscribes to or publishes on
 * one of these — topic strings should never be hand-typed elsewhere.
 */
public final class WebSocketTopics {

    private WebSocketTopics() {
    }

    public static final String DASHBOARD = WebSocketConstants.BROKER_DESTINATION_PREFIX + "/dashboard";
    public static final String OCCUPANCY = WebSocketConstants.BROKER_DESTINATION_PREFIX + "/occupancy";
    public static final String LIBRARY = WebSocketConstants.BROKER_DESTINATION_PREFIX + "/library";
    public static final String CANTEEN = WebSocketConstants.BROKER_DESTINATION_PREFIX + "/canteen";
    public static final String SHUTTLE = WebSocketConstants.BROKER_DESTINATION_PREFIX + "/shuttle";
    public static final String MAINTENANCE = WebSocketConstants.BROKER_DESTINATION_PREFIX + "/maintenance";
    public static final String EVENTS = WebSocketConstants.BROKER_DESTINATION_PREFIX + "/events";
    public static final String NOTIFICATIONS = WebSocketConstants.BROKER_DESTINATION_PREFIX + "/notifications";

}
