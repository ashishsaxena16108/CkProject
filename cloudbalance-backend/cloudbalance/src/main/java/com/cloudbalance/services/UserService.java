package com.cloudbalance.services;

import com.cloudbalance.entities.SecurityUser;
import com.cloudbalance.records.AccountDTO;
import com.cloudbalance.records.CostReportDTO;
import com.cloudbalance.repositories.UserRepository;
import com.cloudbalance.utils.SnowUtil;
import com.snowflake.snowpark_java.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class UserService {
    private final SnowUtil snowUtil;
    private final Session session;
    private final UserRepository userRepository;
    public CostReportDTO getUserReports(SecurityUser user, String groupBy){
        return snowUtil.getUserDataByGroup(session,groupBy,user.getAccounts().stream().map(AccountDTO::accountId).toList());
    }
    public List<String> getFilters(SecurityUser user, String groupBy){
        return snowUtil.getFiltersByGroup(session,groupBy,user.getAccounts().stream().map(AccountDTO::accountId).toList());
    }
    public CostReportDTO getUserFilterReport(SecurityUser user,String groupBy,List<String> filterValues){
        return snowUtil.getFilterUserDataByGroup(session,groupBy,user.getAccounts().stream().map(AccountDTO::accountId).toList(),filterValues);
    }
    public CostReportDTO getReportBySelectedAccount(String groupBy,List<String> accountIds){
        return snowUtil.getUserDataByGroup(session,groupBy,accountIds);
    }
    public CostReportDTO getFilterReportBySelectedAccount(String groupBy,List<String> filterValues,List<String> accountIds){
        return snowUtil.getFilterUserDataByGroup(session,groupBy,accountIds,filterValues);
    }
    public List<String> getFiltersBySelectedAccount(String groupBy,List<String> accountsIds){
        return snowUtil.getFiltersByGroup(session,groupBy,accountsIds);
    }
}
