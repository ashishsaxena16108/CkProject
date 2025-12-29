package com.cloudbalance.services;

import com.cloudbalance.entities.Account;
import com.cloudbalance.entities.User;
import com.cloudbalance.records.CostReportDTO;
import com.cloudbalance.repositories.UserRepository;
import com.cloudbalance.utils.SnowUtil;
import com.snowflake.snowpark_java.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final SnowUtil snowUtil;
    private final UserRepository userRepository;
    public CostReportDTO getUserReports(Long userId,String groupBy){
        Session session = snowUtil.createSession();
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return snowUtil.getUserDataByGroup(session,groupBy,user.getAccounts().stream().map(Account::getAccountId).toList());
    }
}
