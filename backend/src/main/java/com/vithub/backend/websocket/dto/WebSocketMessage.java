package com.vithub.backend.websocket.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

/**
 * Generic envelope every message broadcast over the WebSocket broker is
 * wrapped in, regardless of which module produced it — mirrors the role
 * {@link com.vithub.backend.common.response.ApiResponse} plays for REST
 * responses. {@code payload} carries whatever DTO the publishing module
 * chooses to send; the entity behind it must never be put here directly.
 *
 * @param <T> the type of the payload being broadcast
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WebSocketMessage<T> {

    /** When this message was published. */
    private Instant timestamp;

    /** What kind of change this is (e.g. {@code CREATED}, {@code UPDATED}, {@code DELETED}). */
    private String eventType;

    /** Which module produced this message (e.g. {@code OCCUPANCY}, {@code SHUTTLE}). */
    private String module;

    /** The actual data being broadcast. */
    private T payload;

}
