package com.vithub.backend.chatlog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

/**
 * Payload for {@code POST /chat-logs}. Records one AI Assistant
 * prompt/response exchange. The user is never taken from this payload —
 * it is always resolved from the authenticated principal, so a log can
 * never be written on someone else's behalf. Token count is optional
 * since not every model reports usage.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatLogCreateRequest {

    @NotBlank(message = "Prompt is required")
    private String prompt;

    @NotBlank(message = "Response is required")
    private String response;

    @NotBlank(message = "Model name is required")
    @Size(max = 100, message = "Model name must not exceed 100 characters")
    private String modelName;

    @NotNull(message = "Response time is required")
    @PositiveOrZero(message = "Response time must not be negative")
    private Long responseTimeMs;

    @PositiveOrZero(message = "Token count must not be negative")
    private Integer tokenCount;

    @NotNull(message = "Conversation id is required")
    private UUID conversationId;

}
