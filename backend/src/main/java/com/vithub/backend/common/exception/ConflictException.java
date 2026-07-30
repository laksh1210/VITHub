package com.vithub.backend.common.exception;

import org.springframework.http.HttpStatus;

/** Thrown on state conflicts, e.g. duplicate registration. Maps to HTTP 409. */
public class ConflictException extends ApiException {
    public ConflictException(String message) {
        super(message, HttpStatus.CONFLICT);
    }
}
