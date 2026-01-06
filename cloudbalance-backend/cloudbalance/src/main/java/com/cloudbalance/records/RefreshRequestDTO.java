package com.cloudbalance.records;

import com.cloudbalance.entities.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RefreshRequestDTO(
        @NotBlank(message = "Email is mandatory")
        String email,
        @NotNull(message = "Role is mandatory")
        User.Role role,
        @NotBlank(message = "Without refresh token,jwt token will not be assigned")
        String refreshToken) {
}
