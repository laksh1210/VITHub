package com.vithub.backend.ai.config;

import io.netty.channel.ChannelOption;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;

/**
 * Wiring for the Gemini AI integration (Phase 4.4). Exposes a single,
 * pre-configured {@link WebClient} pointed at
 * {@code vithub.ai.gemini.base-url} (which resolves {@code GEMINI_BASE_URL},
 * already declared in {@code application.yml}). {@link com.vithub.backend.ai.client.GeminiClient}
 * is the only consumer — no other module should reach for this bean
 * directly, mirroring how {@code WebSocketConfig} is the single place
 * that knows about STOMP broker wiring.
 */
@Configuration
public class GeminiConfig {

    /** Time allowed to establish the TCP connection to the Gemini API. */
    private static final Duration CONNECT_TIMEOUT = Duration.ofSeconds(5);
    /** Time allowed to wait for a response before the underlying connection gives up. */
    private static final Duration RESPONSE_TIMEOUT = Duration.ofSeconds(20);

    private final String baseUrl;

    public GeminiConfig(@Value("${vithub.ai.gemini.base-url}") String baseUrl) {
        this.baseUrl = baseUrl;
    }

    @Bean
    public WebClient geminiWebClient() {
        HttpClient httpClient = HttpClient.create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, (int) CONNECT_TIMEOUT.toMillis())
                .responseTimeout(RESPONSE_TIMEOUT);

        return WebClient.builder()
                .baseUrl(baseUrl)
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(2 * 1024 * 1024))
                .build();
    }

}
