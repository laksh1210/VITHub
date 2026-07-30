package com.vithub.backend.notifications.service.impl;

import com.vithub.backend.common.exception.ResourceNotFoundException;
import com.vithub.backend.entity.User;
import com.vithub.backend.notifications.dto.NotificationCreateRequest;
import com.vithub.backend.notifications.dto.NotificationResponse;
import com.vithub.backend.notifications.entity.Notification;
import com.vithub.backend.notifications.entity.NotificationStatus;
import com.vithub.backend.notifications.entity.NotificationType;
import com.vithub.backend.notifications.mapper.NotificationMapper;
import com.vithub.backend.notifications.repository.NotificationRepository;
import com.vithub.backend.notifications.service.NotificationService;
import com.vithub.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * Default implementation of {@link NotificationService}.
 * Reads run on a read-only transaction; writes are individually
 * transactional so a failure never leaves a partial update committed.
 * The recipient reference is resolved from its id here (never trusted
 * blindly) before being handed to the mapper, mirroring how
 * {@code MaintenanceRequestServiceImpl} resolves its reporter. Push,
 * email, SMS, Firebase and WebSocket delivery are separate concerns and
 * are intentionally out of scope here — this service only manages
 * notification records.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<NotificationResponse> getNotificationsByRecipient(UUID recipientId) {
        return notificationRepository.findAllByRecipientIdOrderByCreatedAtDesc(recipientId).stream()
                .map(notificationMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationResponse> getUnreadNotificationsByRecipient(UUID recipientId) {
        return notificationRepository
                .findAllByRecipientIdAndStatusOrderByCreatedAtDesc(recipientId, NotificationStatus.UNREAD).stream()
                .map(notificationMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public long countUnreadNotifications(UUID recipientId) {
        return notificationRepository.countByRecipientIdAndStatus(recipientId, NotificationStatus.UNREAD);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationResponse> getNotificationsByType(NotificationType type) {
        return notificationRepository.findAllByTypeOrderByCreatedAtDesc(type).stream()
                .map(notificationMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public NotificationResponse getNotificationById(UUID id) {
        return notificationMapper.toResponse(findNotificationOrThrow(id));
    }

    @Override
    @Transactional
    public NotificationResponse createNotification(NotificationCreateRequest request) {
        User recipient = findUserOrThrow(request.getRecipientId());

        Notification notification = notificationMapper.toEntity(request, recipient);
        Notification saved = notificationRepository.save(notification);
        log.info("Created notification '{}' for recipient '{}'", saved.getTitle(), recipient.getUsername());
        return notificationMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public NotificationResponse markAsRead(UUID id, UUID recipientId) {
        Notification notification = notificationRepository.findById(id)
                .filter(n -> n.getRecipient() != null && n.getRecipient().getId().equals(recipientId))
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + id));

        if (notification.getStatus() != NotificationStatus.READ) {
            notification.setStatus(NotificationStatus.READ);
            notification.setReadAt(Instant.now());
        }

        Notification saved = notificationRepository.save(notification);
        log.info("Marked notification '{}' as read for recipient '{}'", saved.getId(), recipientId);
        return notificationMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteNotification(UUID id) {
        Notification notification = findNotificationOrThrow(id);
        notificationRepository.delete(notification);
        log.info("Deleted notification '{}' ({})", notification.getTitle(), notification.getId());
    }

    private Notification findNotificationOrThrow(UUID id) {
        return notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + id));
    }

    private User findUserOrThrow(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recipient not found with id: " + id));
    }

}
