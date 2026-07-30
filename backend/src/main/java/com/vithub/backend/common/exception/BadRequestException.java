package com.vithub.backend.common.exception;

import org.springframework.http.HttpStatus;

/** Thrown for malformed or semantically invalid client requests. Maps to HTTP 400. */
public class BadRequestException extends ApiException {
    public BadRequestException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
