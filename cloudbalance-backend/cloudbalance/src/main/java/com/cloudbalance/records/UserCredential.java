package com.cloudbalance.records;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record UserCredential(
        @NotBlank(message = "Email is mandatory")
        @Email(message = "Email is not valid")
        String email,
        @NotBlank(message = "Password is mandatory")
        String password) {
}
