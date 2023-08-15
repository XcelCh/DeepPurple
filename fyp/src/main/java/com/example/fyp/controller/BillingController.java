package com.example.fyp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.entity.Account;
import com.example.fyp.service.AccountServiceImpl;
import com.example.fyp.service.BillingService;

// Controller to handle Billing related
@RestController
@RequestMapping("/payment")
public class BillingController {

    @Autowired
    AccountServiceImpl accountServiceImpl;

    @Autowired
    BillingService billingService;

    // Get billing history of the user by the getBillingHistory endpoint  
    @GetMapping("/getBillingHistory")
    public ResponseEntity<?> getBillingHistory () {

        try {

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Account account = accountServiceImpl.loadUserDetailsByUsername(authentication.getName());

            Long paymentId = account.getPayment().getPaymentId();

            return ResponseEntity.ok().body(billingService.getBillingByPaymentId(paymentId));
        }
        catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Account Not Found.");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Cannot Process, "+e);
        }
    }
}
