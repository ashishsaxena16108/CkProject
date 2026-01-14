package com.cloudbalance.services;

import com.cloudbalance.entities.*;
import com.cloudbalance.exceptions.InvalidGroupByException;
import com.cloudbalance.exceptions.NoAccountsAssignedException;
import com.cloudbalance.records.AccountDTO;
import com.cloudbalance.records.CostReportDTO;
import com.cloudbalance.records.ResourceDTO;
import com.cloudbalance.repositories.UserRepository;
import com.cloudbalance.utils.AwsUtil;
import com.cloudbalance.utils.PredicateUtil;
import com.cloudbalance.utils.SnowUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class UserService {
    private final SnowUtil snowUtil;
    private final UserRepository userRepository;
    private final AwsUtil awsUtil;

    public CostReportDTO getUserReports(SecurityUser user, String groupBy,List<String> filterValues,List<String> accountIds,String startDate,String endDate){
        if(!Field.contains(groupBy))
            throw new InvalidGroupByException("Invalid field");
        if(user.getAccounts().isEmpty())
            throw new NoAccountsAssignedException("No AWS Accounts have been assigned yet.");
        boolean isAccountIdsNotPresent = PredicateUtil.isValuesNotPresent.test(accountIds);
        boolean isFiltersNotPresent = PredicateUtil.isValuesNotPresent.test(filterValues);
        if(isAccountIdsNotPresent && isFiltersNotPresent)
            return snowUtil.getDataByGroup(groupBy,user.getAccounts().stream().map(AccountDTO::accountId).toList(),startDate,endDate);
        if(isAccountIdsNotPresent)
            return snowUtil.getFilterDataByGroup(groupBy,user.getAccounts().stream().map(AccountDTO::accountId).toList()
                    ,filterValues,startDate,endDate);
        if(isFiltersNotPresent)
            return snowUtil.getDataByGroup(groupBy,accountIds,startDate,endDate);
        return snowUtil.getFilterDataByGroup(groupBy,accountIds,filterValues,startDate,endDate);
    }
    public List<String> getFilters(SecurityUser user, String groupBy,List<String> accountIds){
        if(user.getAccounts().isEmpty())
            throw new NoAccountsAssignedException("No AWS Accounts have been assigned yet.");
        if(!Field.contains(groupBy))
            throw new InvalidGroupByException("Invalid field");
        boolean isAccountIdsNotPresent = PredicateUtil.isValuesNotPresent.test(accountIds);
        if(isAccountIdsNotPresent)
            return snowUtil.getFiltersByGroup(groupBy,user.getAccounts().stream().map(AccountDTO::accountId).toList());
        return snowUtil.getFiltersByGroup(groupBy,accountIds);
    }
    public ResourceDTO getResources(List<String> accountIds,SecurityUser user){
        boolean isAccountIdsNotPresent = PredicateUtil.isValuesNotPresent.test(accountIds);
        AwsCredentialsProvider defaultProvider= DefaultCredentialsProvider.builder().build();
        if(isAccountIdsNotPresent)
            accountIds.addAll(user.getAccounts().stream().map(AccountDTO::accountId).toList());
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
