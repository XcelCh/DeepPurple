package com.example.fyp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Controller to handle Role related
@RestController
@RequestMapping
public class RoleController {
    
    // Check if user has the role needed to access the page
    @GetMapping("/check")
    public ResponseEntity<String> check() {
        
        return ResponseEntity.ok().body("Roles Checked.");
    }

    // Domain URL for testing
    @GetMapping("/")
    public String welcome() {
        return "Hello welcome to deeppurple.";
    }
}
