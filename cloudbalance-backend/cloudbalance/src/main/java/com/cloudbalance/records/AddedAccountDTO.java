package com.cloudbalance.records;

import com.cloudbalance.entities.Account;

public record AddedAccountDTO(Account account,String message) {
}
