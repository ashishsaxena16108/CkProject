package com.cloudbalance.services;


import com.cloudbalance.entities.Account;
import com.cloudbalance.entities.User;
import com.cloudbalance.exceptions.DuplicateAccountException;
import com.cloudbalance.exceptions.DuplicateUserException;
import com.cloudbalance.records.AccountDTO;
import com.cloudbalance.records.CostReportDTO;
import com.cloudbalance.records.UserDTO;
import com.cloudbalance.repositories.AccountRepository;
import com.cloudbalance.repositories.UserRepository;
import com.cloudbalance.utils.SnowUtil;
import com.snowflake.snowpark_java.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final SnowUtil snowUtil;
    private final Session session;

    public List<UserDTO> getAllUsers(){
        return userRepository.findAll().stream().map(u->new UserDTO(u.getId()
                ,u.getFirstName(),u.getLastName(),u.getEmail(),u.getRole(),
                        new ArrayList<>(u.getAccounts())))
                .toList();
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
                    .password(passwordEncoder.encode(userDTO.firstName()
                            .toLowerCase()+'@'
                            +userDTO.lastName()
                            .toLowerCase().replace(' ','_')))
                    .build();

        } else {
            newOrExistingUser = userRepository.findById(userDTO.id())
                    .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + userDTO.id()));
            newOrExistingUser.setLastName(userDTO.lastName());
            newOrExistingUser.setEmail(userDTO.email());
            newOrExistingUser.setRole(userDTO.role());
            newOrExistingUser.setFirstName(userDTO.firstName());
        }
        if(newOrExistingUser.getRole().equals(User.Role.USER)) {
            List<Account> accounts = accountRepository.findAllById(
                    userDTO.accounts().stream().map(Account::getId).toList()
            );
            newOrExistingUser.setAccounts(accounts);
        }
        return userRepository.save(newOrExistingUser);
    }

    public List<AccountDTO> getAllAccounts(){
        return accountRepository.findAll().stream().map(a->new AccountDTO(a.getId(),a.getAccountArn(),a.getAccountId(),a.getAccountName())).toList();
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
    public CostReportDTO getReports(String groupBy){
        return snowUtil.getDataByGroup(session,groupBy);
    }
    public List<String> getFilters(String groupBy){
        return snowUtil.getFiltersByGroup(session,groupBy);
    }
    public CostReportDTO getFilterReport(String groupBy,List<String> filterValues){
        return snowUtil.getFilterDataByGroup(session,groupBy,filterValues);
    }
}
