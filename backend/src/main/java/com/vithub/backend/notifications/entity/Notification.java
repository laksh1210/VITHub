package com.vithub.backend.notifications.entity;

import com.vithub.backend.entity.BaseEntity;
import com.vithub.backend.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;

/**
 * A notification delivered to a single {@link User} (table:
 * {@code notifications}). Covers the dashboard's real-time "Notifications"
 * widget for complaint updates, event reminders and announcements.
 * {@code createdAt} is inherited from {@link BaseEntity}; {@code readAt}
 * is populated once the recipient marks the notification as read. Push,
 * email, SMS, Firebase and WebSocket delivery are separate concerns and
 * are intentionally not modeled here — this module only tracks state.
 */
@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true, exclude = "recipient")
@EqualsAndHashCode(callSuper = true)
public class Notification extends BaseEntity {

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "message", nullable = false, length = 2000)
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 20)
    private NotificationType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private NotificationStatus status;

    /** The user this notification was delivered to. Required. */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recipient_id", nullable = false)
    private User recipient;

    /** When the recipient marked this notification as read. Null while unread. */
    @Column(name = "read_at")
    private Instant readAt;

}
