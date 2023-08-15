package com.example.fyp.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fyp.entity.Inquiry;

// Inquiry Repository for Inquiry Entity to access the database
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    
}
