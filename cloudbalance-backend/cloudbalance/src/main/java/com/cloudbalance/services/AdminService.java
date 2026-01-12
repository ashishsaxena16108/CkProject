package com.cloudbalance.services;


import com.cloudbalance.entities.*;
import com.cloudbalance.exceptions.DuplicateAccountException;
import com.cloudbalance.exceptions.DuplicateUserException;
import com.cloudbalance.records.AccountDTO;
import com.cloudbalance.records.CostReportDTO;
import com.cloudbalance.records.ResourceDTO;
import com.cloudbalance.records.UserDTO;
import com.cloudbalance.repositories.AccountRepository;
import com.cloudbalance.repositories.UserRepository;
import com.cloudbalance.utils.AwsUtil;
import com.cloudbalance.utils.PredicateUtil;
import com.cloudbalance.utils.SnowUtil;
import com.snowflake.snowpark_java.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final SnowUtil snowUtil;
    private final AwsUtil awsUtil;

    public List<UserDTO> getAllUsers(){
        return userRepository.findAll().stream().map(u->new UserDTO(u.getId()
                ,u.getFirstName(),u.getLastName(),u.getEmail(),u.getRole(),
                        new ArrayList<>(u.getAccounts().stream().map(a->new AccountDTO(a.getId(),a.getAccountArn(),a.getAccountId(),a.getAccountName())).toList())))
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
        if(userDTO.accounts() != null){
            if (userDTO.role() == User.Role.USER) {
                List<Account> accounts = accountRepository.findAllById(
                        userDTO.accounts().stream().map(AccountDTO::id).toList()
                );
                newOrExistingUser.setAccounts(accounts);
            } else {
                newOrExistingUser.setAccounts(Collections.emptyList());
            }
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

    public CostReportDTO getReports(String groupBy,List<String> accountIds,List<String> filterValues,String startDate,String endDate){
        boolean isAccountIdsNotPresent = PredicateUtil.isValuesNotPresent.test(accountIds);
        boolean isFiltersNotPresent = PredicateUtil.isValuesNotPresent.test(filterValues);
        if(isAccountIdsNotPresent && isFiltersNotPresent)
                return snowUtil.getDataByGroup(groupBy,startDate,endDate);
        if(isAccountIdsNotPresent)
            return snowUtil.getFilterDataByGroup(groupBy,filterValues,startDate,endDate);
        if(isFiltersNotPresent)
            return snowUtil.getDataByGroup(groupBy,accountIds,startDate,endDate);
        return snowUtil.getFilterDataByGroup(groupBy,accountIds,filterValues,startDate,endDate);
    }

    public List<String> getFilters(String groupBy,List<String> accountIds){
        boolean isAccountIdsNotPresent = PredicateUtil.isValuesNotPresent.test(accountIds);
        if(isAccountIdsNotPresent)
            return snowUtil.getFiltersByGroup(groupBy);
        return snowUtil.getFiltersByGroup(groupBy,accountIds);
    }

    public ResourceDTO getResources(List<String> accountIds){
        boolean isAccountIdsNotPresent = PredicateUtil.isValuesNotPresent.test(accountIds);
        AwsCredentialsProvider defaultProvider=DefaultCredentialsProvider.builder().build();
        if(isAccountIdsNotPresent){
            return new ResourceDTO(awsUtil.getEC2Instances(defaultProvider),awsUtil.getRDSInstances(defaultProvider),awsUtil.getASGInstances(defaultProvider));
        }
        List<EC2Instance> ec2Instances = new ArrayList<>();
        List<RDSInstance> rdsInstances = new ArrayList<>();
        List<ASGInstance> asgInstances = new ArrayList<>();
        for(String id : accountIds){
            AwsCredentialsProvider provider= awsUtil.assumeRole(id,defaultProvider);
            ec2Instances.addAll(awsUtil.getEC2Instances(provider));
            asgInstances.addAll(awsUtil.getASGInstances(provider));
            rdsInstances.addAll(awsUtil.getRDSInstances(provider));
        }
        return new ResourceDTO(ec2Instances,rdsInstances,asgInstances);
    }
}
