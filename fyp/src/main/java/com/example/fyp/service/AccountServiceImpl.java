package com.example.fyp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.fyp.entity.Account;
import com.example.fyp.repo.AccountRepository;

@Service
public class AccountServiceImpl implements UserDetailsService, AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordResetTokenServiceImpl passwordResetTokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
        Account account = accountRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        return AccountDetailsImpl.build(account);
        
    }

    @Override
    public Account loadUserDetailsByUsername(String email) throws UsernameNotFoundException {

        Account account = accountRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        return account;
    }

    @Override
    public void saveAccount(Account account) {

        Account savedAccount = accountRepository.save(account);
        System.out.println(savedAccount);
    }

    @Override
    public void generatePasswordResetToken (Account account, String passwordToken) {

        passwordResetTokenService.generatePasswordResetToken(account, passwordToken);

    }

    @Override
    public String validatePasswordResetToken (String passwordToken, String email) {

        return passwordResetTokenService.validatePasswordResetToken(passwordToken, email);
    }

    @Override
    public void changePassword (String email, String newPassword) {


        Account account = loadUserDetailsByUsername(email);
        account.setPassword(newPassword);

        accountRepository.save(account);
    }


}