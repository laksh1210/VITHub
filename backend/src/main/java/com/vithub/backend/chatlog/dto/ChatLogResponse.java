package com.vithub.backend.chatlog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

/**
 * Public representation of a {@link com.vithub.backend.chatlog.entity.ChatLog}.
 * Returned by every {@code /chat-logs} endpoint; the entity is never
 * exposed directly. The related user entity is flattened to its id and
 * display name so consumers don't have to make a second call for the
 * common case.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatLogResponse {

    private UUID id;

    private UUID userId;
    private String username;
    private String userFullName;

    private String prompt;
    private String response;
    private String modelName;
    private Long responseTimeMs;
    private Integer tokenCount;
    private UUID conversationId;

    private Instant createdAt;

}
