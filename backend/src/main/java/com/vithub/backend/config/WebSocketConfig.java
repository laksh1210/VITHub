package com.vithub.backend.config;

import com.vithub.backend.websocket.constant.WebSocketConstants;
import com.vithub.backend.websocket.exception.WebSocketExceptionHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

/**
 * STOMP-over-WebSocket wiring for real-time campus updates.
 *
 * <ul>
 *   <li>Connection endpoint: {@value WebSocketConstants#WEBSOCKET_ENDPOINT} (SockJS fallback enabled)</li>
 *   <li>Application destination prefix: {@value WebSocketConstants#APPLICATION_DESTINATION_PREFIX}</li>
 *   <li>Broker destination prefix: {@value WebSocketConstants#BROKER_DESTINATION_PREFIX}</li>
 * </ul>
 *
 * This class only wires the transport. No module publishes through it
 * yet — modules that later want real-time updates will do so through
 * {@link com.vithub.backend.websocket.service.NotificationPublisherService},
 * not by talking to this configuration directly. The endpoint is already
 * listed as a public path in the (frozen) {@code SecurityConfig}, so no
 * security changes are needed here.
 */
@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final WebSocketExceptionHandler webSocketExceptionHandler;

    @Value("${vithub.cors.allowed-origins}")
    private String allowedOrigins;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker(WebSocketConstants.BROKER_DESTINATION_PREFIX);
        registry.setApplicationDestinationPrefixes(WebSocketConstants.APPLICATION_DESTINATION_PREFIX);
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint(WebSocketConstants.WEBSOCKET_ENDPOINT)
                .setAllowedOriginPatterns(allowedOrigins.split(","))
                .withSockJS();
    }

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
        registration.setErrorHandler(webSocketExceptionHandler);
    }

}
