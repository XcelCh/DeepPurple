package com.example.fyp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.fyp.repo.PaymentRepository;

@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;

    public ResponseEntity<?> deletePaymentById(Long paymentId) {
        paymentRepository.updateNullPayment(paymentId);

        return ResponseEntity.ok("Card successfully deleted");
    }

}
