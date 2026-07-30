/**
 * Chat Log module (Phase 4): a persisted record of each AI Assistant
 * prompt/response pair (table: {@code chat_logs}), grouped by
 * conversation for history and audit purposes. The Gemini API
 * integration, the AI service itself, conversation memory, streaming
 * responses and WebSocket delivery are separate concerns (Phase 5) and
 * are intentionally out of scope here — this module only stores and
 * retrieves records that the AI module will write.
 */
package com.vithub.backend.chatlog;
