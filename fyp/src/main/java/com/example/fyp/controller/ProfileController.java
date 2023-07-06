package com.example.fyp.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.entity.Account;
import com.example.fyp.repo.AccountRepository;
import com.example.fyp.service.AccountDetailsImpl;
import com.example.fyp.service.AccountServiceImpl;

import io.micrometer.core.ipc.http.HttpSender.Response;

@RestController
public class ProfileController {

    @Autowired
    AccountServiceImpl accountServiceImpl;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    

    @GetMapping("/editProfile")
    public ResponseEntity<Account> editProfile() {

        Account acc = new Account();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {

            String username = authentication.getName();

            acc = accountServiceImpl.loadUserDetailsByUsername(username);

            acc.setPassword(null);
            acc.setRoles(null);
            // System.out.println(acc);
        }


        return ResponseEntity.ok().body(acc);

    }

    @PostMapping("/editProfile")
    public ResponseEntity<String> saveEdit(@RequestBody Account account) {
        

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AccountDetailsImpl userPrincipal = (AccountDetailsImpl) authentication.getPrincipal();

        String password = account.getPassword();

        if (password != null) {
            account.setPassword(passwordEncoder.encode(password));
            // account.setRoles(userPrincipal.getAuthorities());
        }
        else if (password == null) {
          
            account.setPassword(userPrincipal.getPassword());
            // account.setRoles(userPrincipal.getAuthorities());
        }
        accountServiceImpl.saveAccount(account);

        return ResponseEntity.ok("Edit Profile received succesfully.");
    }


}
