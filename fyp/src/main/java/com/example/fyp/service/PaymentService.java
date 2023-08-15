package com.example.fyp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.fyp.repo.PaymentRepository;

// Payment Service Class handles communication to the database related to Payment Entity
@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;

    // Delete Payment in the database, but here we do not delete the payment unless the Account is deleted.
    // So it updates all of the card details to null.
    public ResponseEntity<?> deletePaymentById(Long paymentId) {

        paymentRepository.updateNullPayment(paymentId);
        return ResponseEntity.ok("Card successfully deleted");
    }

}
