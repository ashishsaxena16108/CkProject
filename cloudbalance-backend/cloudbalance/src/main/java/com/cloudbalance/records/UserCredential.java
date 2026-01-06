package com.cloudbalance.records;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record UserCredential(
        @NotBlank(message = "Email is mandatory")
        @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",message = "Email is not valid")
        String email,
        @NotBlank(message = "Password is mandatory")
        String password) {
}
