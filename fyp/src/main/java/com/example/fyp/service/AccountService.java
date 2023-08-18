package com.example.fyp.service;

import java.util.List;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example.fyp.entity.Account;

// Interface class for Account Service class which handles the communication to database and Account related functions
public interface AccountService {
    
    Account loadUserDetailsByUsername(String email) throws UsernameNotFoundException;

    void saveAccount(Account account);

    void generatePasswordResetToken (Account account, String passwordToken);

    String validatePasswordResetToken (String passwordToken, String email);

    void changePassword (String email, String newPassword);

    int getAccountId(String email);

    List<Integer> getAllAccountId();

    Account getById(Integer accountId);
}
