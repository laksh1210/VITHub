package com.vithub.backend.ai.controller;

import com.vithub.backend.ai.dto.AiChatRequest;
import com.vithub.backend.ai.dto.AiChatResponse;
import com.vithub.backend.ai.service.AiService;
import com.vithub.backend.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * AI Assistant endpoint, backed by Gemini. Every campus-facing role in
 * the Project Bible ("Use chatbot") can reach this — it sits behind the
 * default authenticated-by-default rule in {@code SecurityConfig}
 * rather than a role restriction. Single-turn chat only for this phase:
 * no conversation id, memory, streaming or file attachments are accepted.
 */
@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@Tag(name = "AI Assistant", description = "Gemini-powered campus AI chat")
public class AiController {

    private final AiService aiService;

    @PostMapping("/chat")
    @Operation(
            summary = "Chat with the campus AI assistant",
            description = "Sends a natural-language prompt to the Gemini-powered campus assistant and returns its answer."
    )
    public ResponseEntity<ApiResponse<AiChatResponse>> chat(@Valid @RequestBody AiChatRequest request) {
        AiChatResponse response = aiService.chat(request);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

}
