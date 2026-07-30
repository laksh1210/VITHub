package com.vithub.backend.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Response returned by {@code POST /api/ai/chat}, wrapped in the standard
 * {@link com.vithub.backend.common.response.ApiResponse} envelope like
 * every other endpoint. {@code responseTime} is measured server-side, in
 * milliseconds, covering the full round trip to Gemini.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiChatResponse {

    private String response;
    private long responseTime;

}
