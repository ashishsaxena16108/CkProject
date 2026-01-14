package com.cloudbalance.exceptions;

public class NoAccountsAssignedException extends RuntimeException {
    public NoAccountsAssignedException(String message) {
        super(message);
    }
}
