package com.example.fyp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/starter")
public class CustomerCallController {
    

    @GetMapping("/check")
    public ResponseEntity<String> check() {
        
        return ResponseEntity.ok().body("Roles Checked.");
    }

}
