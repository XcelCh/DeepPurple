package com.example.fyp.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Account;
import java.util.List;


@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    Optional<Account> findByAccountId(Integer accountId);
    Optional<Account> findByEmail(String email);
    
}