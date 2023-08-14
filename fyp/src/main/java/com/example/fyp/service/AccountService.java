package com.example.fyp.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example.fyp.entity.Account;

public interface AccountService {
    
    Account loadUserDetailsByUsername(String email) throws UsernameNotFoundException;

    void saveAccount(Account account);

    void generatePasswordResetToken (Account account, String passwordToken);

    String validatePasswordResetToken (String passwordToken, String email);

    void changePassword (String email, String newPassword);

    int getAccountId(String email);

    void deleteAccount(Account account);
}
