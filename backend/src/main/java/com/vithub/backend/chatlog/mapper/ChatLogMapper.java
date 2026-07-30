package com.vithub.backend.chatlog.mapper;

import com.vithub.backend.chatlog.dto.ChatLogCreateRequest;
import com.vithub.backend.chatlog.dto.ChatLogResponse;
import com.vithub.backend.chatlog.entity.ChatLog;
import com.vithub.backend.entity.User;
import org.springframework.stereotype.Component;

/**
 * Entity-to-DTO mapping for {@link ChatLog}. Entities must never be
 * returned directly from a controller; this is the single place that
 * decides what of a ChatLog is safe to expose, and how an incoming
 * request is applied to the entity. Resolving the user entity from its
 * id is the caller's (service layer's) responsibility — this mapper only
 * assembles or flattens what it is given.
 */
@Component
public class ChatLogMapper {

    public ChatLogResponse toResponse(ChatLog chatLog) {
        User user = chatLog.getUser();

        return ChatLogResponse.builder()
                .id(chatLog.getId())
                .userId(user != null ? user.getId() : null)
                .username(user != null ? user.getUsername() : null)
                .userFullName(user != null ? user.getFullName() : null)
                .prompt(chatLog.getPrompt())
                .response(chatLog.getResponse())
                .modelName(chatLog.getModelName())
                .responseTimeMs(chatLog.getResponseTimeMs())
                .tokenCount(chatLog.getTokenCount())
                .conversationId(chatLog.getConversationId())
                .createdAt(chatLog.getCreatedAt())
                .build();
    }

    public ChatLog toEntity(ChatLogCreateRequest request, User user) {
        return ChatLog.builder()
                .user(user)
                .prompt(request.getPrompt())
                .response(request.getResponse())
                .modelName(request.getModelName())
                .responseTimeMs(request.getResponseTimeMs())
                .tokenCount(request.getTokenCount())
                .conversationId(request.getConversationId())
                .build();
    }

}
