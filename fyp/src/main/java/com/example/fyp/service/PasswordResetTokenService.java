package com.example.fyp.service;

import com.example.fyp.entity.Account;

// PasswordResetToken Interface Service Class handle communication to database and related services
public interface PasswordResetTokenService {
    
    void generatePasswordResetToken (Account account, String passwordToken);

    void deleteExpiredPasswordToken (Account account);

    String validatePasswordResetToken(String passwordToken, String email);

    Account findAccountByToken(String passwordToken);

 
}
