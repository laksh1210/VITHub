package com.vithub.backend.common.exception;

import org.springframework.http.HttpStatus;

/** Thrown when an authenticated user lacks permission for an action. Maps to HTTP 403. */
public class ForbiddenException extends ApiException {
    public ForbiddenException(String message) {
        super(message, HttpStatus.FORBIDDEN);
    }
}
