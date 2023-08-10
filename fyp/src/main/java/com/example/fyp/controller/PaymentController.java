package com.example.fyp.controller;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.Response;
import com.example.fyp.entity.Account;
import com.example.fyp.entity.Payment;
import com.example.fyp.service.AccountServiceImpl;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    AccountServiceImpl accountServiceImpl;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    
    
    @PostMapping("/addCard")
    public ResponseEntity<?> addPayment (@RequestBody Payment payment) {

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            Account account = accountServiceImpl.loadUserDetailsByUsername(authentication.getName());

            payment.setSecurityCode(passwordEncoder.encode(payment.getSecurityCode()));
            payment.setUsageLimit(10);
            account.setPayment(payment);

            accountServiceImpl.saveAccount(account);
            return ResponseEntity.ok("Card Successfully Saved");
        }
        catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Account Not Found.");
        }
        catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Cannot Process, "+ e);
        }
    }

    @GetMapping("/getCard")
    public ResponseEntity<?> getPayment () {

        try {

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Account account = accountServiceImpl.loadUserDetailsByUsername(authentication.getName());

            Payment payment = account.getPayment();

            return ResponseEntity.ok().body(payment);


        }
        catch (UsernameNotFoundException e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Account Not Found.");
        }
        catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Cannot Process, "+e);
        }

        
    }

    @PostMapping("/setLimit")
    public ResponseEntity<String> setLimit(@RequestParam("limit") float limit) {

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Account account = accountServiceImpl.loadUserDetailsByUsername(authentication.getName());

            account.getPayment().setUsageLimit(limit);
            accountServiceImpl.saveAccount(account);

            return ResponseEntity.ok().body("");
        }
        catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username not Found.");
        }
        catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Cannot Process, "+e);
        }
    }
}
