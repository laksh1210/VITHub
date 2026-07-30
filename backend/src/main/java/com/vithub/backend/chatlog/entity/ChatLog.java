package com.vithub.backend.chatlog.entity;

import com.vithub.backend.entity.BaseEntity;
import com.vithub.backend.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

import java.util.UUID;

/**
 * A single AI Assistant prompt/response exchange (table: {@code chat_logs}).
 * Every log belongs to exactly one {@link User} and is tagged with a
 * {@code conversationId} so a multi-turn exchange can be reassembled and
 * displayed in order. {@code createdAt} (inherited from {@link BaseEntity})
 * is the exchange timestamp. Prompt and response text are stored as
 * unbounded {@code TEXT} rather than a capped {@code VARCHAR}, since AI
 * responses have no predictable maximum length. Writing these records is
 * the AI module's responsibility (Phase 5) — this entity only models
 * storage and retrieval of what it is given.
 */
@Entity
@Table(name = "chat_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true, exclude = "user")
@EqualsAndHashCode(callSuper = true)
public class ChatLog extends BaseEntity {

    /** The user who sent the prompt and received the response. Required. */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "prompt", nullable = false, columnDefinition = "TEXT")
    private String prompt;

    @Column(name = "response", nullable = false, columnDefinition = "TEXT")
    private String response;

    @Column(name = "model_name", nullable = false, length = 100)
    private String modelName;

    /** Time taken to generate the response, in milliseconds. */
    @Column(name = "response_time_ms", nullable = false)
    private Long responseTimeMs;

    /** Total tokens consumed by the exchange, if the model reports it. */
    @Column(name = "token_count")
    private Integer tokenCount;

    /** Groups multi-turn exchanges belonging to the same conversation. */
    @Column(name = "conversation_id", nullable = false)
    private UUID conversationId;

}
