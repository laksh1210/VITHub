package com.vithub.backend.chatlog.repository;

import com.vithub.backend.chatlog.entity.ChatLog;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ChatLogRepository extends JpaRepository<ChatLog, UUID> {

    /** Get all chat logs for a user, most recently created first. */
    List<ChatLog> findAllByUserIdOrderByCreatedAtDesc(UUID userId);

    /** Get the latest N chat logs for a user, most recently created first. */
    List<ChatLog> findByUserIdOrderByCreatedAtDesc(UUID userId, Pageable pageable);

    /** Get every chat log in a conversation, in chronological order. */
    List<ChatLog> findAllByConversationIdOrderByCreatedAtAsc(UUID conversationId);

    /** Get a user's chat logs within a conversation, in chronological order. */
    List<ChatLog> findAllByConversationIdAndUserIdOrderByCreatedAtAsc(UUID conversationId, UUID userId);

    /** Delete all chat history belonging to a user. */
    void deleteByUserId(UUID userId);

}
