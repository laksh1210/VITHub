package com.vithub.backend.ai.service.impl;

import com.vithub.backend.ai.client.GeminiClient;
import com.vithub.backend.ai.dto.AiChatRequest;
import com.vithub.backend.ai.dto.AiChatResponse;
import com.vithub.backend.ai.service.AiService;
import com.vithub.backend.common.exception.ApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

/**
 * Default implementation of {@link AiService}. A thin orchestration layer
 * over {@link GeminiClient}: times the round trip, translates any
 * unexpected failure into the standard {@link ApiException} shape (so
 * {@code GlobalExceptionHandler} renders it consistently with every other
 * module), and assembles the clean {@link AiChatResponse} DTO — the raw
 * Gemini request/response shape never leaks past this layer.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {

    private final GeminiClient geminiClient;

    @Override
    public AiChatResponse chat(AiChatRequest request) {
        long startedAt = System.currentTimeMillis();

        String answer;
        try {
            answer = geminiClient.generateContent(request.getPrompt());
        } catch (ApiException ex) {
            // Already a clean, correctly-statused failure — let it propagate as-is.
            throw ex;
        } catch (Exception ex) {
            log.error("Unexpected failure while generating an AI response", ex);
            throw new ApiException("The AI assistant is currently unavailable. Please try again later.",
                    HttpStatus.SERVICE_UNAVAILABLE);
        }

        long responseTime = System.currentTimeMillis() - startedAt;
        log.info("AI chat prompt answered in {} ms", responseTime);

        return AiChatResponse.builder()
                .response(answer)
                .responseTime(responseTime)
                .build();
    }

}
