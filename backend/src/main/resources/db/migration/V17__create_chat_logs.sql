-- V17__create_chat_logs.sql
-- Schema for the Chat Log module (Phase 4): a persisted record of each
-- AI Assistant prompt/response exchange, grouped by conversation_id for
-- history and audit purposes. The Gemini API integration, the AI
-- service itself, conversation memory, streaming responses and
-- WebSocket delivery are separate concerns (Phase 5) and are out of
-- scope here. prompt/response use TEXT rather than a capped VARCHAR
-- since AI responses have no predictable maximum length.

CREATE TABLE chat_logs (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id           UUID      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    prompt            TEXT      NOT NULL,
    response          TEXT      NOT NULL,
    model_name        VARCHAR(100) NOT NULL,
    response_time_ms  BIGINT    NOT NULL,
    token_count       INTEGER,
    conversation_id   UUID      NOT NULL,
    created_at        TIMESTAMP NOT NULL DEFAULT now(),
    updated_at        TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_chat_logs_user_id ON chat_logs (user_id);
CREATE INDEX idx_chat_logs_conversation_id ON chat_logs (conversation_id);
CREATE INDEX idx_chat_logs_user_created_at ON chat_logs (user_id, created_at);
