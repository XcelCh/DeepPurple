package com.example.fyp.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fyp.entity.Inquiry;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    
}
