package com.vithub.backend.notifications.controller;

import com.vithub.backend.common.response.ApiResponse;
import com.vithub.backend.notifications.dto.NotificationCreateRequest;
import com.vithub.backend.notifications.dto.NotificationResponse;
import com.vithub.backend.notifications.entity.NotificationType;
import com.vithub.backend.notifications.service.NotificationService;
import com.vithub.backend.security.userdetails.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * Notification endpoints. {@code GET /notifications} matches the Project
 * Bible's API contract, with additional operations covering the
 * dashboard's real-time notifications widget (unread list, unread count,
 * mark-as-read) and admin authoring. Every endpoint is a thin pass-through
 * to {@link NotificationService} — no business logic lives here; the
 * only thing resolved at this layer is the authenticated principal's id,
 * so a user can never read or mark as read someone else's notifications.
 * Push, email, SMS, Firebase, WebSocket delivery and AI are separate
 * modules and are intentionally not exposed here.
 */
@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
@Tag(name = "Notifications", description = "In-app notification delivery and read-state tracking")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    @Operation(summary = "List my notifications", description = "Returns every notification for the current user, most recent first.")
    public ResponseEntity<ApiResponse<List<NotificationResponse>>> getMyNotifications(
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        List<NotificationResponse> notifications =
                notificationService.getNotificationsByRecipient(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success(notifications));
    }

    @GetMapping("/unread")
    @Operation(summary = "List my unread notifications", description = "Returns every unread notification for the current user, most recent first.")
    public ResponseEntity<ApiResponse<List<NotificationResponse>>> getMyUnreadNotifications(
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        List<NotificationResponse> notifications =
                notificationService.getUnreadNotificationsByRecipient(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success(notifications));
    }

    @GetMapping("/unread/count")
    @Operation(summary = "Count my unread notifications", description = "Returns the number of unread notifications for the current user, for the dashboard notification badge.")
    public ResponseEntity<ApiResponse<Long>> countMyUnreadNotifications(
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        long count = notificationService.countUnreadNotifications(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success(count));
    }

    @GetMapping("/type/{type}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "List notifications by type", description = "Admin-only. Returns every notification of the given type, most recent first.")
    public ResponseEntity<ApiResponse<List<NotificationResponse>>> getNotificationsByType(
            @Parameter(description = "Notification type") @PathVariable NotificationType type) {
        List<NotificationResponse> notifications = notificationService.getNotificationsByType(type);
        return ResponseEntity.ok(ApiResponse.success(notifications));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a notification by id", description = "Returns a single notification's full details.")
    public ResponseEntity<ApiResponse<NotificationResponse>> getNotificationById(
            @Parameter(description = "Notification id") @PathVariable UUID id) {
        NotificationResponse notification = notificationService.getNotificationById(id);
        return ResponseEntity.ok(ApiResponse.success(notification));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a notification", description = "Admin-only. Creates a new notification for a recipient.")
    public ResponseEntity<ApiResponse<NotificationResponse>> createNotification(
            @Valid @RequestBody NotificationCreateRequest request) {
        NotificationResponse created = notificationService.createNotification(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Notification created successfully", created));
    }

    @PatchMapping("/{id}/read")
    @Operation(summary = "Mark a notification as read", description = "Marks one of the current user's notifications as read.")
    public ResponseEntity<ApiResponse<NotificationResponse>> markAsRead(
            @Parameter(description = "Notification id") @PathVariable UUID id,
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        NotificationResponse updated = notificationService.markAsRead(id, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("Notification marked as read", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a notification", description = "Admin-only. Removes a notification.")
    public ResponseEntity<ApiResponse<Void>> deleteNotification(
            @Parameter(description = "Notification id") @PathVariable UUID id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.ok(ApiResponse.success("Notification deleted successfully", null));
    }

}
