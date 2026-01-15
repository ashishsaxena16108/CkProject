package com.cloudbalance.records;

import com.cloudbalance.entities.User;
import jakarta.validation.constraints.*;

import java.util.List;

public record UserDTO(
        Long id,
        @NotBlank(message = "First Name is required")
        @Max(value = 30,message = "First Name should be less than 30")
        String firstName,
        @NotBlank(message = "Last Name is required")
        @Max(value = 30,message = "Last Name should be less than 30")
        String lastName,
        @NotBlank(message = "Email is mandatory")
        @Max(value = 30,message = "Email should be less than 30")
        @Email(message = "Email is not valid")
        String email,
        @NotNull(message = "Role is mandatory")
        User.Role role,
        List<AccountDTO> accounts) {
}
