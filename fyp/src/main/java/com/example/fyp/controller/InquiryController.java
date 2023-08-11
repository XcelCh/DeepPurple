package com.example.fyp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.entity.Inquiry;
import com.example.fyp.repo.InquiryRepository;

@RestController
public class InquiryController {

    @Autowired
    InquiryRepository inquiryRepository;
    
    @PostMapping("/sendInquiry")
    public ResponseEntity<String> sendInquiry (@RequestBody Inquiry inquiry) {

        try {

            inquiryRepository.save(inquiry);
            return ResponseEntity.ok().body("Inquiry Received Successfully.");
    
        }
        catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Error Occured, "+ e);
        }

        }
}
