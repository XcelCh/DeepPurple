package com.example.fyp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.fyp.entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Modifying
    @Transactional
    @Query("UPDATE Payment p SET p.cardNumber = null, p.cardholderName = null, p.expiryDate = null, p.securityCode = null WHERE p.paymentId = :paymentId")
    void updateNullPayment(Long paymentId);

}
