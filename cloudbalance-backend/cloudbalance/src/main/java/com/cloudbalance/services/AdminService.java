package com.cloudbalance.services;


import com.cloudbalance.entities.Account;
import com.cloudbalance.entities.User;
import com.cloudbalance.records.AccountDTO;
import com.cloudbalance.records.UserDTO;
import com.cloudbalance.repositories.AccountRepository;
import com.cloudbalance.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
    public User addUser(UserDTO user){
        User newUser;
        Optional<User> oldUser = userRepository.findByEmail(user.email());
        if(oldUser.isPresent()){
            newUser=oldUser.get();
            newUser.setEmail(user.email());
            newUser.setFirstName(user.firstName());
            newUser.setLastName(user.lastName());
            newUser.setRole(user.role());
        }
        else {
            newUser = User.builder()
                    .firstName(user.firstName())
                    .lastName(user.lastName())
                    .email(user.email())
                    .role(user.role())
                    .accounts(new ArrayList<>()).build();
        }
        return userRepository.save(newUser);
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
