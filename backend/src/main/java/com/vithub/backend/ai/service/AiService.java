package com.vithub.backend.ai.service;

import com.vithub.backend.ai.dto.AiChatRequest;
import com.vithub.backend.ai.dto.AiChatResponse;

/**
 * Business operations for the AI Assistant module. Implemented by
 * {@link com.vithub.backend.ai.service.impl.AiServiceImpl}. Single-turn
 * chat only for this phase — no conversation memory, history, streaming
 * or retrieval is in scope here.
 */
public interface AiService {

    /**
     * Sends the user's prompt to the Gemini-powered campus assistant and
     * returns its answer along with how long the round trip took.
     */
    AiChatResponse chat(AiChatRequest request);

}
