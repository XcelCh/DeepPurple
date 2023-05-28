package com.example.fyp.service;


import org.springframework.security.core.userdetails.UserDetailsService;

import com.example.fyp.controller.dto.AccountRegistrationDto;
import com.example.fyp.entity.Account;

public interface AccountService extends UserDetailsService {
    
    public Account save(AccountRegistrationDto registrationDto);

    public Account findUserByEmail(String email);
}