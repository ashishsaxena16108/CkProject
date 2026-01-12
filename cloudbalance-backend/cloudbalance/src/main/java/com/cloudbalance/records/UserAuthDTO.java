package com.cloudbalance.records;


public record UserAuthDTO(UserDTO user, String message, String accessToken,String refreshToken) {
}
