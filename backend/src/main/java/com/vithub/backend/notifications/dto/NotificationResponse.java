package com.vithub.backend.notifications.dto;

import com.vithub.backend.notifications.entity.NotificationStatus;
import com.vithub.backend.notifications.entity.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

/**
 * Public representation of a {@link com.vithub.backend.notifications.entity.Notification}.
 * Returned by every {@code /notifications} endpoint; the entity is never
 * exposed directly. The related recipient entity is flattened to its id
 * and display name so consumers don't have to make a second call for the
 * common case.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationResponse {

    private UUID id;
    private String title;
    private String message;
    private NotificationType type;
    private NotificationStatus status;

    private UUID recipientId;
    private String recipientUsername;
    private String recipientFullName;

    private Instant createdAt;
    private Instant updatedAt;
    private Instant readAt;

}
