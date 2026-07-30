package com.vithub.backend.chatlog.service;

import com.vithub.backend.chatlog.dto.ChatLogCreateRequest;
import com.vithub.backend.chatlog.dto.ChatLogResponse;

import java.util.List;
import java.util.UUID;

/**
 * Business operations for the Chat Log module. Implemented by
 * {@link com.vithub.backend.chatlog.service.impl.ChatLogServiceImpl}.
 */
public interface ChatLogService {

    List<ChatLogResponse> getChatLogsByUser(UUID userId);

    List<ChatLogResponse> getLatestChatLogsByUser(UUID userId, int limit);

    List<ChatLogResponse> getChatLogsByConversation(UUID conversationId);

    List<ChatLogResponse> getChatLogsByConversationForUser(UUID conversationId, UUID userId);

    ChatLogResponse getChatLogById(UUID id);

    ChatLogResponse createChatLog(UUID userId, ChatLogCreateRequest request);

    void deleteChatLog(UUID id);

    void deleteChatHistoryByUser(UUID userId);

}
