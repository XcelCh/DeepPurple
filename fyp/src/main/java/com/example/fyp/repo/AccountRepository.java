package com.example.fyp.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Account;

// Account Repository for Account Entity to access to the Database
@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    Optional<Account> findByAccountId(Integer accountId);
    Optional<Account> findByEmail(String email);

    @Query("SELECT accountId AS accountId FROM Account WHERE email = :email")
    Integer getAccountId(String email);

    List<Account> findAll(); 
}