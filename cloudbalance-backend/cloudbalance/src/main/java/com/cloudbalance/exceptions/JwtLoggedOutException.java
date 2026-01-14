package com.cloudbalance.exceptions;

public class JwtLoggedOutException extends RuntimeException {
    public JwtLoggedOutException(String message) {
        super(message);
    }
}
