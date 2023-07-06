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
public class AccountServiceImpl implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
        Account account = accountRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        return AccountDetailsImpl.build(account);
        
    }

    public Account loadUserDetailsByUsername(String email) throws UsernameNotFoundException {

        Account account = accountRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        return account;
    }

    public void saveAccount(Account account) {

        Account savedAccount = accountRepository.save(account);
        System.out.println(savedAccount);
    }
}