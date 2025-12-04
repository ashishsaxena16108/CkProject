package com.cloudbalance.records;

import com.cloudbalance.entities.User;

public record UserDTO(String firstName, String lastName, String email, User.Role role) {
}
