package com.example.fyp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.fyp.entity.Payment;
import com.example.fyp.repo.AccountRepository;
import com.example.fyp.repo.BillingRepository;
import com.example.fyp.repo.PaymentRepository;
import com.example.fyp.repo.UsageRepository;

@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;

    public ResponseEntity<?> deletePaymentById(Long paymentId) {
        paymentRepository.updateNullPayment(paymentId);

        return ResponseEntity.ok("Card successfully deleted");
    }

}
