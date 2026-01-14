package com.cloudbalance.exceptions;

public class InvalidGroupByException extends RuntimeException {
    public InvalidGroupByException(String message) {
        super(message);
    }
}
