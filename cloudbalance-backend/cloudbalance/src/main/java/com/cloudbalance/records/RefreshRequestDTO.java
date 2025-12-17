package com.cloudbalance.records;

import com.cloudbalance.entities.User;

public record RefreshRequestDTO(String email, User.Role role, String refreshToken) {
}
