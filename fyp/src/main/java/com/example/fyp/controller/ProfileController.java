package com.example.fyp.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.entity.Account;
import com.example.fyp.repo.AccountRepository;
import com.example.fyp.service.AccountDetailsImpl;
import com.example.fyp.service.AccountServiceImpl;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

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

    @PostMapping("/checkEmail")
    public ResponseEntity<String> checkEmail(@RequestBody String body) {

        try {

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(body);
            String email = jsonNode.get("email").asText();

            Account acc = accountServiceImpl.loadUserDetailsByUsername(email);

            return ResponseEntity.status(HttpStatus.CONFLICT).body("Account already exists with that email.");
            
           
        } catch (UsernameNotFoundException e) {

            return ResponseEntity.status(HttpStatus.OK).body("There is no Account with that email.");

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON payload.");
        }

    }

    @PostMapping("/createAccount") 
    public ResponseEntity<String> createAccount (@RequestBody Account account) {

        // Set roles here.

        String encodePassword = passwordEncoder.encode(account.getPassword());
        account.setPassword(encodePassword);

        accountServiceImpl.saveAccount(account);

        return ResponseEntity.ok("Account successfully created.");
    }


}