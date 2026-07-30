package com.vithub.backend.notifications.mapper;

import com.vithub.backend.entity.User;
import com.vithub.backend.notifications.dto.NotificationCreateRequest;
import com.vithub.backend.notifications.dto.NotificationResponse;
import com.vithub.backend.notifications.entity.Notification;
import com.vithub.backend.notifications.entity.NotificationStatus;
import org.springframework.stereotype.Component;

/**
 * Entity-to-DTO mapping for {@link Notification}. Entities must never be
 * returned directly from a controller; this is the single place that
 * decides what of a Notification is safe to expose, and how an incoming
 * request is applied to the entity. Resolving the recipient entity from
 * its id is the caller's (service layer's) responsibility — this mapper
 * only assembles or flattens what it is given.
 */
@Component
public class NotificationMapper {

    public NotificationResponse toResponse(Notification notification) {
        User recipient = notification.getRecipient();

        return NotificationResponse.builder()
                .id(notification.getId())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .type(notification.getType())
                .status(notification.getStatus())
                .recipientId(recipient != null ? recipient.getId() : null)
                .recipientUsername(recipient != null ? recipient.getUsername() : null)
                .recipientFullName(recipient != null ? recipient.getFullName() : null)
                .createdAt(notification.getCreatedAt())
                .updatedAt(notification.getUpdatedAt())
                .readAt(notification.getReadAt())
                .build();
    }

    /**
     * Builds a new entity from a create request. Defaults status to
     * {@link NotificationStatus#UNREAD} — every notification starts out
     * unread, and {@code readAt} stays null until it is marked read.
     */
    public Notification toEntity(NotificationCreateRequest request, User recipient) {
        return Notification.builder()
                .title(request.getTitle())
                .message(request.getMessage())
                .type(request.getType())
                .status(NotificationStatus.UNREAD)
                .recipient(recipient)
                .readAt(null)
                .build();
    }

}
