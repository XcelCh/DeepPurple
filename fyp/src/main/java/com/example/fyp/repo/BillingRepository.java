package com.example.fyp.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.fyp.entity.Billing;

// Billing Repository for Billing Entity to access the Database
public interface BillingRepository extends JpaRepository<Billing, Long> {

    @Query("SELECT b FROM Billing b WHERE b.payment.paymentId = :paymentId")
    List<Billing> findByPaymentId(Long paymentId);
}
