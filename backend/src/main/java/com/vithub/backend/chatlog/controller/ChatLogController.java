package com.vithub.backend.chatlog.controller;

import com.vithub.backend.chatlog.dto.ChatLogCreateRequest;
import com.vithub.backend.chatlog.dto.ChatLogResponse;
import com.vithub.backend.chatlog.service.ChatLogService;
import com.vithub.backend.common.response.ApiResponse;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * Chat log endpoints: the AI Assistant's persisted prompt/response
 * history, grouped by conversation. Every endpoint is a thin
 * pass-through to {@link ChatLogService} — no business logic lives here;
 * the only thing resolved at this layer is the authenticated principal's
 * id, so a user can never read, create, or clear someone else's chat
 * history through the "my" endpoints. The Gemini API integration, the AI
 * service itself, conversation memory, streaming responses and WebSocket
 * delivery are separate modules (Phase 5) and are intentionally not
 * exposed here.
 */
@RestController
@RequestMapping("/chat-logs")
@RequiredArgsConstructor
@Tag(name = "Chat Logs", description = "AI Assistant prompt/response history")
public class ChatLogController {

    private final ChatLogService chatLogService;

    @GetMapping("/my")
    @Operation(summary = "List my chat history", description = "Returns every chat log for the current user, most recent first.")
    public ResponseEntity<ApiResponse<List<ChatLogResponse>>> getMyChatLogs(
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        List<ChatLogResponse> chatLogs = chatLogService.getChatLogsByUser(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success(chatLogs));
    }

    @GetMapping("/my/latest")
    @Operation(summary = "List my latest chat logs", description = "Returns the current user's most recent chat logs, capped at the given limit (default 20).")
    public ResponseEntity<ApiResponse<List<ChatLogResponse>>> getMyLatestChatLogs(
            @AuthenticationPrincipal CustomUserDetails currentUser,
            @Parameter(description = "Maximum number of chat logs to return")
            @RequestParam(defaultValue = "20") int limit) {
        List<ChatLogResponse> chatLogs = chatLogService.getLatestChatLogsByUser(currentUser.getId(), limit);
        return ResponseEntity.ok(ApiResponse.success(chatLogs));
    }

    @GetMapping("/my/conversation/{conversationId}")
    @Operation(summary = "Get one of my conversations", description = "Returns the current user's chat logs within a conversation, in chronological order.")
    public ResponseEntity<ApiResponse<List<ChatLogResponse>>> getMyConversation(
            @AuthenticationPrincipal CustomUserDetails currentUser,
            @Parameter(description = "Conversation id") @PathVariable UUID conversationId) {
        List<ChatLogResponse> chatLogs =
                chatLogService.getChatLogsByConversationForUser(conversationId, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success(chatLogs));
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "List chat logs by user", description = "Admin-only. Returns every chat log for the given user, most recent first.")
    public ResponseEntity<ApiResponse<List<ChatLogResponse>>> getChatLogsByUser(
            @Parameter(description = "User id") @PathVariable UUID userId) {
        List<ChatLogResponse> chatLogs = chatLogService.getChatLogsByUser(userId);
        return ResponseEntity.ok(ApiResponse.success(chatLogs));
    }

    @GetMapping("/conversation/{conversationId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get a conversation by id", description = "Admin-only. Returns every chat log in a conversation, in chronological order.")
    public ResponseEntity<ApiResponse<List<ChatLogResponse>>> getChatLogsByConversation(
            @Parameter(description = "Conversation id") @PathVariable UUID conversationId) {
        List<ChatLogResponse> chatLogs = chatLogService.getChatLogsByConversation(conversationId);
        return ResponseEntity.ok(ApiResponse.success(chatLogs));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get a chat log by id", description = "Admin-only. Returns a single chat log's full details.")
    public ResponseEntity<ApiResponse<ChatLogResponse>> getChatLogById(
            @Parameter(description = "Chat log id") @PathVariable UUID id) {
        ChatLogResponse chatLog = chatLogService.getChatLogById(id);
        return ResponseEntity.ok(ApiResponse.success(chatLog));
    }

    @PostMapping
    @Operation(summary = "Record a chat exchange", description = "Creates a new chat log entry for the current user.")
    public ResponseEntity<ApiResponse<ChatLogResponse>> createChatLog(
            @AuthenticationPrincipal CustomUserDetails currentUser,
            @Valid @RequestBody ChatLogCreateRequest request) {
        ChatLogResponse created = chatLogService.createChatLog(currentUser.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Chat log created successfully", created));
    }

    @DeleteMapping("/my")
    @Operation(summary = "Clear my chat history", description = "Deletes every chat log belonging to the current user.")
    public ResponseEntity<ApiResponse<Void>> deleteMyChatHistory(
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        chatLogService.deleteChatHistoryByUser(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("Chat history deleted successfully", null));
    }

    @DeleteMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Clear a user's chat history", description = "Admin-only. Deletes every chat log belonging to the given user.")
    public ResponseEntity<ApiResponse<Void>> deleteChatHistoryByUser(
            @Parameter(description = "User id") @PathVariable UUID userId) {
        chatLogService.deleteChatHistoryByUser(userId);
        return ResponseEntity.ok(ApiResponse.success("Chat history deleted successfully", null));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a chat log", description = "Admin-only. Removes a single chat log entry.")
    public ResponseEntity<ApiResponse<Void>> deleteChatLog(
            @Parameter(description = "Chat log id") @PathVariable UUID id) {
        chatLogService.deleteChatLog(id);
        return ResponseEntity.ok(ApiResponse.success("Chat log deleted successfully", null));
    }

}
