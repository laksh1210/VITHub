package com.vithub.backend.websocket.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.StompSubProtocolErrorHandler;

import java.nio.charset.StandardCharsets;

/**
 * Central STOMP protocol error handler, the WebSocket-transport
 * counterpart to {@code GlobalExceptionHandler} on the REST side: every
 * broken or invalid STOMP frame is translated into a plain, non-leaking
 * {@code ERROR} frame instead of letting a stack trace or raw exception
 * message reach the client. Registered on the message broker transport
 * in {@link com.vithub.backend.config.WebSocketConfig}.
 */
@Slf4j
@Component
public class WebSocketExceptionHandler extends StompSubProtocolErrorHandler {

    @Override
    public Message<byte[]> handleClientMessageProcessingError(Message<byte[]> clientMessage, Throwable ex) {
        log.warn("STOMP message processing failed: {}", ex.getMessage());

        StompHeaderAccessor accessor = StompHeaderAccessor.create(StompCommand.ERROR);
        accessor.setMessage("Unable to process the request");
        accessor.setLeaveMutable(true);

        return MessageBuilder.createMessage(
                "An error occurred while processing your request.".getBytes(StandardCharsets.UTF_8),
                accessor.getMessageHeaders());
    }

}
