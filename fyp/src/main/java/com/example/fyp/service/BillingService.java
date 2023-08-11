package com.example.fyp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.fyp.entity.Billing;
import com.example.fyp.entity.Transcript;
import com.example.fyp.repo.BillingRepository;

@Service
public class BillingService {
    
    @Autowired
    private BillingRepository billingRepository;

    public ResponseEntity<?> getBillingByPaymentId(Long paymentId) {
        List<Billing> billings = billingRepository.findByPaymentId(paymentId);
        return ResponseEntity.ok().body(billings);
    }
}
