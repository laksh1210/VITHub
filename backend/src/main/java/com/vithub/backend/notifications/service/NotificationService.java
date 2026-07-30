package com.vithub.backend.notifications.service;

import com.vithub.backend.notifications.dto.NotificationCreateRequest;
import com.vithub.backend.notifications.dto.NotificationResponse;
import com.vithub.backend.notifications.entity.NotificationType;

import java.util.List;
import java.util.UUID;

/**
 * Business operations for the Notification module. Implemented by
 * {@link com.vithub.backend.notifications.service.impl.NotificationServiceImpl}.
 */
public interface NotificationService {

    List<NotificationResponse> getNotificationsByRecipient(UUID recipientId);

    List<NotificationResponse> getUnreadNotificationsByRecipient(UUID recipientId);

    long countUnreadNotifications(UUID recipientId);

    List<NotificationResponse> getNotificationsByType(NotificationType type);

    NotificationResponse getNotificationById(UUID id);

    NotificationResponse createNotification(NotificationCreateRequest request);

    NotificationResponse markAsRead(UUID id, UUID recipientId);

    void deleteNotification(UUID id);

}
