package com.vithub.backend.common.exception;

import org.springframework.http.HttpStatus;

/**
 * Base class for all custom, business-level exceptions in the system.
 * Carries an HTTP status so the {@code GlobalExceptionHandler} can translate
 * it directly into the correct response code without extra branching.
 */
public class ApiException extends RuntimeException {

    private final HttpStatus status;

    public ApiException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }

}
