package com.cloudbalance.repositories;

import com.cloudbalance.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account,Long> {
    boolean existsByAccountId(String accountId);
}
