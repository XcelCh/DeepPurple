package com.example.fyp.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fyp.entity.Billing;

public interface BillingRepository extends JpaRepository<Billing, Long> {
    
}
