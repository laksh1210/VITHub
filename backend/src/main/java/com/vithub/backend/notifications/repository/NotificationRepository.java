package com.vithub.backend.notifications.repository;

import com.vithub.backend.notifications.entity.Notification;
import com.vithub.backend.notifications.entity.NotificationStatus;
import com.vithub.backend.notifications.entity.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {

    /** Get all notifications for a recipient, most recently created first. */
    List<Notification> findAllByRecipientIdOrderByCreatedAtDesc(UUID recipientId);

    /** Get unread notifications for a recipient, most recently created first. */
    List<Notification> findAllByRecipientIdAndStatusOrderByCreatedAtDesc(UUID recipientId, NotificationStatus status);

    /** Count unread notifications for a recipient (dashboard notification badge). */
    long countByRecipientIdAndStatus(UUID recipientId, NotificationStatus status);

    /** Get notifications by type, most recently created first. */
    List<Notification> findAllByTypeOrderByCreatedAtDesc(NotificationType type);

}
