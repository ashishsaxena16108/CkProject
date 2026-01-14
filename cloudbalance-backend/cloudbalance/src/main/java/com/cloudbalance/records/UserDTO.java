package com.cloudbalance.records;

import com.cloudbalance.entities.Account;
import com.cloudbalance.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.List;

public record UserDTO(
        Long id,
        @NotBlank(message = "First Name is required")
        String firstName,
        @NotBlank(message = "Last Name is required")
        String lastName,
        @NotBlank(message = "Email is mandatory")
        @Email(message = "Email is not valid")
        String email,
        @NotNull(message = "Role is mandatory")
        User.Role role,
        List<AccountDTO> accounts) {
}
