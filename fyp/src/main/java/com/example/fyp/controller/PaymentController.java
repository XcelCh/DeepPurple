package com.example.fyp.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.Response;
import com.example.fyp.controller.dto.CardDto;
import com.example.fyp.entity.Account;
import com.example.fyp.entity.Billing;
import com.example.fyp.entity.Payment;
import com.example.fyp.entity.Usages;
import com.example.fyp.repo.BillingRepository;
import com.example.fyp.repo.RoleRepository;
import com.example.fyp.repo.UsageRepository;
import com.example.fyp.service.AccountServiceImpl;
import com.example.fyp.service.BillingService;
import com.example.fyp.service.PaymentService;
import com.example.fyp.service.UsageService;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    AccountServiceImpl accountServiceImpl;

    @Autowired
    BillingService billingService;

    @Autowired
    PaymentService paymentService;

    @Autowired
    UsageRepository usageRepository;

    @Autowired
    BillingRepository billingRepository;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;

    
    
    @PostMapping("/addCard")
    public ResponseEntity<?> addPayment (@RequestBody CardDto cardDto) {

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            Account account = accountServiceImpl.loadUserDetailsByUsername(authentication.getName());

            Payment payment = new Payment(cardDto.getCardholderName(), cardDto.getCardNumber(), cardDto.getExpiryDate(), cardDto.getSecurityCode());
            
            Payment tempPayment = account.getPayment();

            if(tempPayment == null) {
                payment.setSecurityCode(passwordEncoder.encode(payment.getSecurityCode()));
                payment.setUsageLimit(10);
                account.setPayment(payment);

                // Change on reset database
                account.addRole(roleRepository.findById(2));

                accountServiceImpl.saveAccount(account);
                return ResponseEntity.ok("Card Successfully Saved");
            } else {
                tempPayment.setSecurityCode(passwordEncoder.encode(payment.getSecurityCode()));
                tempPayment.setCardholderName(payment.getCardholderName());
                tempPayment.setCardNumber(payment.getCardNumber());
                tempPayment.setExpiryDate(payment.getExpiryDate());
                account.setPayment(tempPayment);
                accountServiceImpl.saveAccount(account);
                return ResponseEntity.ok("Card Successfully Updated");
            }
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
            Integer accountId = account.getAccountId();

            float currentUsage = ((Number) usageRepository.getSumOfUsageByAccountId(accountId).get(0)[1]).floatValue();
            if(limit > currentUsage) {
                account.getPayment().setUsageLimit(limit);
                accountServiceImpl.saveAccount(account);

                return ResponseEntity.ok().body("Limit set successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Limit can not be lower than current usage.");
            }
        }
        catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username not Found.");
        }
        catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Cannot Process, "+e);
        }
    }

    @PutMapping("/deleteCard")
    public ResponseEntity<?> deleteCard() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Account account = accountServiceImpl.loadUserDetailsByUsername(authentication.getName());   
            Integer accountId = account.getAccountId();
            Long paymentId = account.getPayment().getPaymentId();

            Date today = new Date(System.currentTimeMillis());
            System.out.println("Printing usages");
            for(Usages u : usageRepository.findUnbilledUsage(accountId)) {
                System.out.println(u);
            }
            Billing billing = new Billing(usageRepository.findTotalUnbilledUsage(accountId), today, account.getPayment(), usageRepository.findUnbilledUsage(accountId));
            billingRepository.save(billing);

            return paymentService.deletePaymentById(paymentId);
        }
        catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username not Found.");
        }
        catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Cannot Process, "+e);
        }
    }

}
