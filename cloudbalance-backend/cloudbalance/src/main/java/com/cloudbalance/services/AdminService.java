package com.cloudbalance.services;


import com.cloudbalance.entities.Account;
import com.cloudbalance.entities.User;
import com.cloudbalance.records.AccountDTO;
import com.cloudbalance.records.UserDTO;
import com.cloudbalance.repositories.AccountRepository;
import com.cloudbalance.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
    public User addUser(UserDTO userDTO){
        User newOrExistingUser;
        if (userDTO.id() == null) {
            newOrExistingUser = User.builder()
                    .firstName(userDTO.firstName())
                    .lastName(userDTO.lastName())
                    .email(userDTO.email())
                    .role(userDTO.role())
                    .build();
        } else {
            newOrExistingUser = userRepository.findById(userDTO.id())
                    .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + userDTO.id()));
            newOrExistingUser.setLastName(userDTO.lastName());
            newOrExistingUser.setEmail(userDTO.email());
            newOrExistingUser.setRole(userDTO.role());
            newOrExistingUser.setFirstName(userDTO.firstName());
        }
        return userRepository.save(newOrExistingUser);
    }

    public List<Account> getAllAccounts(){
        return accountRepository.findAll();
    }

    public Account onboardAccount(AccountDTO accountDTO){
        Account account = Account.builder()
                .accountArn(accountDTO.accountArn())
                .accountId(accountDTO.accountId())
                .accountName(accountDTO.accountName()).build();
        return accountRepository.save(account);
    }
}
