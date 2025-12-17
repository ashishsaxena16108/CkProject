package com.cloudbalance.records;


public record UserAuthDTO(Object user, String message, String accessToken,String refreshToken) {
}
