package com.cloudbalance.records;

import com.cloudbalance.entities.Account;
import com.cloudbalance.entities.User;

import java.util.List;

public record UserDTO(Long id, String firstName, String lastName, String email, User.Role role, List<Account> accounts) {
}
