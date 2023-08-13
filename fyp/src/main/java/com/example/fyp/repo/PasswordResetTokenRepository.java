package com.example.fyp.repo;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Account;
import com.example.fyp.entity.PasswordResetToken;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long>{

    Optional<PasswordResetToken> findByToken(String passwordToken);

    // @Modifying
    // @Query("DELETE FROM PasswordResetToken p WHERE p.expirationTime < :expirationTime")
    // void deleteByExpirationTime(@Param("expirationTime") Date expirationTime);
    
    @Modifying
    void deleteByExpirationTimeLessThan(Date expirationTime);

    @Modifying
    void deleteByAccount(Account account);
}