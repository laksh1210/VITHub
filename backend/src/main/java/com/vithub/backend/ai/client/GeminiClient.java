package com.vithub.backend.ai.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.vithub.backend.common.exception.ApiException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeoutException;

/**
 * Thin, low-level wrapper around Gemini's {@code generateContent} REST
 * endpoint. This is the only class in the codebase that knows the shape
 * of Gemini's request/response JSON or the {@code ?key=} query-param
 * auth scheme — {@link com.vithub.backend.ai.service.AiService} only
 * ever sees a plain prompt in, plain answer text out.
 */
@Slf4j
@Component
public class GeminiClient {

    private static final String GENERATE_CONTENT_PATH = "/v1beta/models/{model}:generateContent";
    private static final String API_KEY_QUERY_PARAM = "key";

    /** Overall time budget for a single Gemini call, including retries. */
    private static final Duration REQUEST_TIMEOUT = Duration.ofSeconds(15);
    /** Number of retry attempts after the first failed call. */
    private static final long MAX_RETRY_ATTEMPTS = 2;
    /** Base delay between retries; doubles each attempt (exponential backoff). */
    private static final Duration RETRY_BACKOFF = Duration.ofMillis(500);

    /**
     * Light guardrail so the assistant stays scoped to campus questions,
     * per the Project Bible's AI Rules — this is a prompt instruction
     * only, not enforcement, RAG, or function calling.
     */
    private static final String SYSTEM_INSTRUCTION =
            "You are the VITHub campus assistant for VIT Bhopal. Answer only campus-related "
                    + "questions (classrooms, library, canteen, shuttles, maintenance, events, "
                    + "navigation and similar campus topics). If a question is unrelated to campus "
                    + "life, politely say so instead of answering it. Never invent facts you are not "
                    + "confident about. Keep answers concise and helpful.";

    private final WebClient geminiWebClient;
    private final String apiKey;
    private final String model;

    public GeminiClient(WebClient geminiWebClient,
                         @Value("${vithub.ai.gemini.api-key}") String apiKey,
                         @Value("${vithub.ai.gemini.model}") String model) {
        this.geminiWebClient = geminiWebClient;
        this.apiKey = apiKey;
        this.model = model;
    }

    /**
     * Sends {@code prompt} to Gemini and returns the generated answer
     * text. Blocks the calling thread (this backend is a classic Spring
     * MVC app; {@link WebClient} is used here purely for its client
     * features, not to make this call reactive end-to-end).
     *
     * @throws ApiException if the API key is missing, the call times out,
     *                       every retry is exhausted, or Gemini's response
     *                       cannot be parsed into an answer.
     */
    public String generateContent(String prompt) {
        if (apiKey == null || apiKey.isBlank()) {
            log.error("Gemini API key is not configured (GEMINI_API_KEY)");
            throw new ApiException("The AI assistant is not configured. Please try again later.",
                    HttpStatus.SERVICE_UNAVAILABLE);
        }

        Map<String, Object> requestBody = buildRequestBody(prompt);

        JsonNode responseBody;
        try {
            responseBody = geminiWebClient.post()
                    .uri(uriBuilder -> uriBuilder
                            .path(GENERATE_CONTENT_PATH)
                            .queryParam(API_KEY_QUERY_PARAM, apiKey)
                            .build(model))
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .onStatus(HttpStatusCode::isError, this::toApiException)
                    .bodyToMono(JsonNode.class)
                    .timeout(REQUEST_TIMEOUT)
                    .retryWhen(Retry.backoff(MAX_RETRY_ATTEMPTS, RETRY_BACKOFF)
                            .filter(this::isRetryable)
                            .onRetryExhaustedThrow((spec, signal) -> signal.failure()))
                    .block();
        } catch (ApiException ex) {
            throw ex;
        } catch (Exception ex) {
            log.error("Gemini API call failed after retries", ex);
            throw new ApiException("The AI assistant is currently unavailable. Please try again later.",
                    HttpStatus.SERVICE_UNAVAILABLE);
        }

        return extractAnswerText(responseBody);
    }

    private Map<String, Object> buildRequestBody(String prompt) {
        return Map.of(
                "systemInstruction", Map.of(
                        "parts", List.of(Map.of("text", SYSTEM_INSTRUCTION))
                ),
                "contents", List.of(
                        Map.of("role", "user", "parts", List.of(Map.of("text", prompt)))
                ),
                "generationConfig", Map.of(
                        "temperature", 0.4,
                        "maxOutputTokens", 1024
                )
        );
    }

    private Mono<Throwable> toApiException(ClientResponse response) {
        return response.bodyToMono(String.class)
                .defaultIfEmpty("<empty response body>")
                .map(body -> {
                    log.error("Gemini API returned {}: {}", response.statusCode(), body);
                    HttpStatus status = response.statusCode().value() == 429
                            ? HttpStatus.TOO_MANY_REQUESTS
                            : HttpStatus.BAD_GATEWAY;
                    return new ApiException("The AI service returned an error. Please try again later.", status);
                });
    }

    private boolean isRetryable(Throwable throwable) {
        if (throwable instanceof ApiException apiException) {
            // Retry rate limits and upstream 5xx-equivalents, but not our own config errors.
            return apiException.getStatus() == HttpStatus.TOO_MANY_REQUESTS
                    || apiException.getStatus() == HttpStatus.BAD_GATEWAY;
        }
        return throwable instanceof TimeoutException
                || throwable instanceof WebClientRequestException
                || throwable instanceof WebClientResponseException.ServiceUnavailable;
    }

    private String extractAnswerText(JsonNode responseBody) {
        if (responseBody == null) {
            log.error("Gemini API returned an empty response body");
            throw new ApiException("The AI assistant returned an empty response. Please try again.",
                    HttpStatus.BAD_GATEWAY);
        }

        JsonNode blockReason = responseBody.path("promptFeedback").path("blockReason");
        if (!blockReason.isMissingNode() && !blockReason.isNull()) {
            log.warn("Gemini blocked the prompt: {}", blockReason.asText());
            throw new ApiException("The AI assistant couldn't answer that question. Please rephrase it.",
                    HttpStatus.BAD_REQUEST);
        }

        JsonNode candidates = responseBody.path("candidates");
        if (!candidates.isArray() || candidates.isEmpty()) {
            log.error("Gemini API response had no candidates: {}", responseBody);
            throw new ApiException("The AI assistant returned an empty response. Please try again.",
                    HttpStatus.BAD_GATEWAY);
        }

        JsonNode parts = candidates.get(0).path("content").path("parts");
        if (!parts.isArray() || parts.isEmpty()) {
            log.error("Gemini API response had no content parts: {}", responseBody);
            throw new ApiException("The AI assistant returned an empty response. Please try again.",
                    HttpStatus.BAD_GATEWAY);
        }

        StringBuilder answer = new StringBuilder();
        for (JsonNode part : parts) {
            JsonNode text = part.path("text");
            if (text.isTextual()) {
                answer.append(text.asText());
            }
        }

        if (answer.isEmpty()) {
            log.error("Gemini API response had no text content: {}", responseBody);
            throw new ApiException("The AI assistant returned an empty response. Please try again.",
                    HttpStatus.BAD_GATEWAY);
        }

        return answer.toString().trim();
    }

}
