package com.example.fyp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.fyp.entity.Billing;
import com.example.fyp.repo.BillingRepository;

// Billing Service class handles communication to Billing Entity in database and does Billing related functions
@Service
public class BillingService {
    
    @Autowired
    private BillingRepository billingRepository;

    // Get List of billings with associated paymentId
    public ResponseEntity<?> getBillingByPaymentId(Long paymentId) {

        List<Billing> billings = billingRepository.findByPaymentId(paymentId);
        return ResponseEntity.ok().body(billings);
    }

    // Save Billing Entity to the database
    public void saveBilling(Billing billing) {
        billingRepository.save(billing);
    }
}
