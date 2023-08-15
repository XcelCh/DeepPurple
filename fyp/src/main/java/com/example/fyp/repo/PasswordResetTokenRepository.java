package com.example.fyp.repo;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Account;
import com.example.fyp.entity.PasswordResetToken;

// PasswordResetToken Repository for PasswordResetToken Entity to access to the Database
@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long>{

    Optional<PasswordResetToken> findByToken(String passwordToken);

    void deleteByExpirationTimeLessThan(Date expirationTime);

    void deleteByAccount(Account account);
}