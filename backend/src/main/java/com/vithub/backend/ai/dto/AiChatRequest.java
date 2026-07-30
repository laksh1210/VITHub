package com.vithub.backend.ai.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Payload for {@code POST /api/ai/chat}. A single natural-language
 * question for the campus AI assistant — no conversation id or history
 * is accepted here, matching this phase's scope (single-turn chat only).
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiChatRequest {

    @NotBlank(message = "Prompt is required")
    @Size(max = 4000, message = "Prompt must not exceed 4000 characters")
    private String prompt;

}
