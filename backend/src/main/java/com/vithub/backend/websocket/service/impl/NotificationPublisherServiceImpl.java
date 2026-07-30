package com.vithub.backend.websocket.service.impl;

import com.vithub.backend.websocket.constant.WebSocketConstants;
import com.vithub.backend.websocket.dto.WebSocketMessage;
import com.vithub.backend.websocket.service.NotificationPublisherService;
import com.vithub.backend.websocket.util.WebSocketTopics;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;

/**
 * Default implementation of {@link NotificationPublisherService}, backed
 * by Spring's {@link SimpMessagingTemplate}. Every publish call wraps its
 * payload in a {@link WebSocketMessage} envelope with a fresh timestamp
 * before sending, so subscribers always receive a consistent shape
 * regardless of which module published it. This class has no callers
 * yet — wiring specific module events to these methods is a later phase.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationPublisherServiceImpl implements NotificationPublisherService {

    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public <T> void publish(String topic, String eventType, String module, T payload) {
        WebSocketMessage<T> message = WebSocketMessage.<T>builder()
                .timestamp(Instant.now())
                .eventType(eventType)
                .module(module)
                .payload(payload)
                .build();

        log.debug("Publishing {} event from module {} to topic {}", eventType, module, topic);
        messagingTemplate.convertAndSend(topic, message);
    }

    @Override
    public <T> void publishDashboardUpdate(String eventType, T payload) {
        publish(WebSocketTopics.DASHBOARD, eventType, WebSocketConstants.MODULE_DASHBOARD, payload);
    }

    @Override
    public <T> void publishOccupancyUpdate(String eventType, T payload) {
        publish(WebSocketTopics.OCCUPANCY, eventType, WebSocketConstants.MODULE_OCCUPANCY, payload);
    }

    @Override
    public <T> void publishLibraryUpdate(String eventType, T payload) {
        publish(WebSocketTopics.LIBRARY, eventType, WebSocketConstants.MODULE_LIBRARY, payload);
    }

    @Override
    public <T> void publishCanteenUpdate(String eventType, T payload) {
        publish(WebSocketTopics.CANTEEN, eventType, WebSocketConstants.MODULE_CANTEEN, payload);
    }

    @Override
    public <T> void publishShuttleUpdate(String eventType, T payload) {
        publish(WebSocketTopics.SHUTTLE, eventType, WebSocketConstants.MODULE_SHUTTLE, payload);
    }

    @Override
    public <T> void publishMaintenanceUpdate(String eventType, T payload) {
        publish(WebSocketTopics.MAINTENANCE, eventType, WebSocketConstants.MODULE_MAINTENANCE, payload);
    }

    @Override
    public <T> void publishEventUpdate(String eventType, T payload) {
        publish(WebSocketTopics.EVENTS, eventType, WebSocketConstants.MODULE_EVENTS, payload);
    }

    @Override
    public <T> void publishNotification(String eventType, T payload) {
        publish(WebSocketTopics.NOTIFICATIONS, eventType, WebSocketConstants.MODULE_NOTIFICATIONS, payload);
    }

}
