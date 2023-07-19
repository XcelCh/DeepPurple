package com.example.fyp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.entity.Account;
import com.example.fyp.service.AccountDetailsImpl;
import com.example.fyp.service.AccountServiceImpl;

@RestController
@RequestMapping("/profile")
public class EditProfileController {

    @Autowired
    AccountServiceImpl accountServiceImpl;
    
    @GetMapping("/editProfile")
    public ResponseEntity<?> editProfile() {

        Account acc = new Account();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {

            String username = authentication.getName();

            acc = accountServiceImpl.loadUserDetailsByUsername(username);

            acc.setPassword(null);
            acc.setRoles(null);
            // System.out.println(acc);

            return ResponseEntity.ok().body(acc);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged In.");
        

    }

    @PostMapping("/editProfile")
    public ResponseEntity<String> saveEdit(@RequestBody Account account) {
        

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AccountDetailsImpl userPrincipal = (AccountDetailsImpl) authentication.getPrincipal();
          
        account.setPassword(userPrincipal.getPassword());
        // account.setRoles(userPrincipal.getAuthorities());
        
        accountServiceImpl.saveAccount(account);

        return ResponseEntity.ok("Edit Profile received succesfully.");
    }

    
}
