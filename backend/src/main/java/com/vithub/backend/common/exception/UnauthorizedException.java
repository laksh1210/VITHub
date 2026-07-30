package com.vithub.backend.common.exception;

import org.springframework.http.HttpStatus;

/** Thrown when authentication is missing or invalid. Maps to HTTP 401. */
public class UnauthorizedException extends ApiException {
    public UnauthorizedException(String message) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}
