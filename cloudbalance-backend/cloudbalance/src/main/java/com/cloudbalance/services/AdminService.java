package com.cloudbalance.services;


import com.cloudbalance.entities.Account;
import com.cloudbalance.entities.User;
import com.cloudbalance.exceptions.DuplicateAccountException;
import com.cloudbalance.exceptions.DuplicateUserException;
import com.cloudbalance.records.AccountDTO;
import com.cloudbalance.records.UserDTO;
import com.cloudbalance.repositories.AccountRepository;
import com.cloudbalance.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
    @Transactional
    public User addUser(UserDTO userDTO){
        User newOrExistingUser;
        if (userDTO.id() == null) {
            if(userRepository.existsByEmail(userDTO.email()))
                throw new DuplicateUserException("User exists already");
            newOrExistingUser = User.builder()
                    .firstName(userDTO.firstName())
                    .lastName(userDTO.lastName())
                    .email(userDTO.email())
                    .role(userDTO.role())
                    .password(passwordEncoder.encode(userDTO.firstName().toLowerCase()+'@'+userDTO.lastName().toLowerCase()))
                    .build();

        } else {
            newOrExistingUser = userRepository.findById(userDTO.id())
                    .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + userDTO.id()));
            newOrExistingUser.setLastName(userDTO.lastName());
            newOrExistingUser.setEmail(userDTO.email());
            newOrExistingUser.setRole(userDTO.role());
            newOrExistingUser.setFirstName(userDTO.firstName());
        }
        List<Account> accounts = accountRepository.findAllById(
                userDTO.accounts().stream().map(Account::getId).toList()
        );

        accounts.forEach(acc -> acc.getUsers().add(newOrExistingUser));
        newOrExistingUser.setAccounts(accounts);
        return userRepository.save(newOrExistingUser);
    }

    public List<Account> getAllAccounts(){
        return accountRepository.findAll();
    }

    public Account onboardAccount(AccountDTO accountDTO){
        if(accountRepository.existsByAccountId(accountDTO.accountId()))
            throw new DuplicateAccountException("Account exists already");
        Account account = Account.builder()
                .accountArn(accountDTO.accountArn())
                .accountId(accountDTO.accountId())
                .accountName(accountDTO.accountName()).build();
        return accountRepository.save(account);
    }
}
