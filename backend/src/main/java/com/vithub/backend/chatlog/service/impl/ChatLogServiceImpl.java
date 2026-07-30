package com.vithub.backend.chatlog.service.impl;

import com.vithub.backend.chatlog.dto.ChatLogCreateRequest;
import com.vithub.backend.chatlog.dto.ChatLogResponse;
import com.vithub.backend.chatlog.entity.ChatLog;
import com.vithub.backend.chatlog.mapper.ChatLogMapper;
import com.vithub.backend.chatlog.repository.ChatLogRepository;
import com.vithub.backend.chatlog.service.ChatLogService;
import com.vithub.backend.common.exception.ResourceNotFoundException;
import com.vithub.backend.entity.User;
import com.vithub.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Default implementation of {@link ChatLogService}.
 * Reads run on a read-only transaction; writes are individually
 * transactional so a failure never leaves a partial update committed.
 * The user reference is resolved from its id here (never trusted
 * blindly) before being handed to the mapper, mirroring how
 * {@code MaintenanceRequestServiceImpl} resolves its reporter. Writing a
 * log entry is expected to be driven by the AI module once it exists
 * (Phase 5) — this service only stores and retrieves what it is given.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ChatLogServiceImpl implements ChatLogService {

    private final ChatLogRepository chatLogRepository;
    private final ChatLogMapper chatLogMapper;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ChatLogResponse> getChatLogsByUser(UUID userId) {
        return chatLogRepository.findAllByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(chatLogMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatLogResponse> getLatestChatLogsByUser(UUID userId, int limit) {
        int cappedLimit = Math.min(Math.max(limit, 1), 100);
        Pageable pageable = PageRequest.of(0, cappedLimit);
        return chatLogRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable).stream()
                .map(chatLogMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatLogResponse> getChatLogsByConversation(UUID conversationId) {
        return chatLogRepository.findAllByConversationIdOrderByCreatedAtAsc(conversationId).stream()
                .map(chatLogMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatLogResponse> getChatLogsByConversationForUser(UUID conversationId, UUID userId) {
        return chatLogRepository.findAllByConversationIdAndUserIdOrderByCreatedAtAsc(conversationId, userId).stream()
                .map(chatLogMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ChatLogResponse getChatLogById(UUID id) {
        return chatLogMapper.toResponse(findChatLogOrThrow(id));
    }

    @Override
    @Transactional
    public ChatLogResponse createChatLog(UUID userId, ChatLogCreateRequest request) {
        User user = findUserOrThrow(userId);

        ChatLog chatLog = chatLogMapper.toEntity(request, user);
        ChatLog saved = chatLogRepository.save(chatLog);
        log.info("Created chat log for user '{}' in conversation '{}'", user.getUsername(), saved.getConversationId());
        return chatLogMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteChatLog(UUID id) {
        ChatLog chatLog = findChatLogOrThrow(id);
        chatLogRepository.delete(chatLog);
        log.info("Deleted chat log '{}'", chatLog.getId());
    }

    @Override
    @Transactional
    public void deleteChatHistoryByUser(UUID userId) {
        chatLogRepository.deleteByUserId(userId);
        log.info("Deleted chat history for user '{}'", userId);
    }

    private ChatLog findChatLogOrThrow(UUID id) {
        return chatLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chat log not found with id: " + id));
    }

    private User findUserOrThrow(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

}
