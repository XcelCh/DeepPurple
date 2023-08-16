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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.controller.dto.CardDto;
import com.example.fyp.entity.Account;
import com.example.fyp.entity.Billing;
import com.example.fyp.entity.Payment;
import com.example.fyp.entity.Usages;
import com.example.fyp.repo.RoleRepository;
import com.example.fyp.service.AccountServiceImpl;
import com.example.fyp.service.BillingService;
import com.example.fyp.service.PaymentService;
import com.example.fyp.service.UsageService;

// Controller to handle Payment related 
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
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UsageService usageService;
    
    // Add Card POST endpoint that receive payment details and save it to the database, 
    // Additionally update to a different payment details if it has not been set before
    @PostMapping("/addCard")
    public ResponseEntity<?> addPayment (@RequestBody CardDto cardDto) {

        try {

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Account account = accountServiceImpl.loadUserDetailsByUsername(authentication.getName());
            Payment payment = new Payment(cardDto.getCardholderName(), cardDto.getCardNumber(), cardDto.getExpiryDate(), cardDto.getSecurityCode());
            Payment tempPayment = account.getPayment();

            // If payment has not been set before
            if(tempPayment == null) {
                payment.setSecurityCode(passwordEncoder.encode(payment.getSecurityCode()));
                payment.setUsageLimit(10);
                account.setPayment(payment);

                // Add roles upon adding a payment
                account.addRole(roleRepository.findById(2));

                accountServiceImpl.saveAccount(account);
                return ResponseEntity.ok("Card Successfully Saved");

            // If Payment has been set, update the payment details
            } else {
                tempPayment.setSecurityCode(passwordEncoder.encode(payment.getSecurityCode()));
                tempPayment.setCardholderName(payment.getCardholderName());
                tempPayment.setCardNumber(payment.getCardNumber());
                tempPayment.setExpiryDate(payment.getExpiryDate());
                account.setPayment(tempPayment);

                // If Account role is only 1, means that user deleted its payment, add 1 more roles upon adding card
                if (account.getRoles().size() == 1) {

                    // Add roles upon adding a payment
                    account.addRole(roleRepository.findById(2));
                }

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

    // Get the existing payment details by the getCard endpoint
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

    // Change the limit of the payment by the setLimit endpoint
    @PostMapping("/setLimit")
    public ResponseEntity<String> setLimit(@RequestParam("limit") float limit) {

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Account account = accountServiceImpl.loadUserDetailsByUsername(authentication.getName());
            Integer accountId = account.getAccountId();

            float currentUsage = usageService.getTotalUnbilledUsage(accountId);

            // If limit is greater than current usage
            if(limit > currentUsage) {

                account.getPayment().setUsageLimit(limit);
                accountServiceImpl.saveAccount(account);
                return ResponseEntity.ok().body("Limit set successfully");

            // Else if its smaller or equal, limit cannot be change to user demand return BAD_REQUEST
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

    // Delete payment details on user request by the deleteCard endpoint
    // To delete the current payment, check if the user has any outstanding payment,
    // If there are any, bill it to the card before removing.
    @PutMapping("/deleteCard")
    public ResponseEntity<?> deleteCard() {

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Account account = accountServiceImpl.loadUserDetailsByUsername(authentication.getName());   
            Integer accountId = account.getAccountId();
            Long paymentId = account.getPayment().getPaymentId();

            Date today = new Date(System.currentTimeMillis());
            
            List<Usages> usages = usageService.findUnbilledUsage(accountId);
            Float totalUnbilled = usageService.getTotalUnbilledUsage(accountId);

            // Remove role from user that has delete card
            account.deleteRole(roleRepository.findById(2));
            accountServiceImpl.saveAccount(account);

            // If outstanding payment = 0, delete the card
            if (totalUnbilled  == 0) {
                return paymentService.deletePaymentById(paymentId);
            }

            // If there are outstanding payment, create billing record and bill to the user
            Billing billing = new Billing(totalUnbilled, today, account.getPayment(), usages);

            for (Usages u : usages) {
                u.setBilling(billing);
            }

            billingService.saveBilling(billing);

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
