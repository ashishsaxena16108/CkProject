package com.cloudbalance.records;

import com.cloudbalance.entities.User;

public record UserDTO(Long id,String firstName, String lastName, String email, User.Role role) {
}
