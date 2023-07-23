package com.example.fyp.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.entity.Account;
import com.example.fyp.entity.Role;
import com.example.fyp.repo.RoleRepository;
import com.example.fyp.service.AccountServiceImpl;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.micrometer.core.ipc.http.HttpSender.Response;

@RestController
// @RequestMapping("/subscription")
public class RoleController {

    @Autowired
    AccountServiceImpl accountServiceImpl;

    @Autowired
    RoleRepository roleRepository;

    @PostMapping("/addSubs")
    public ResponseEntity<?> addSubscription(@RequestBody String body) {

        try {
            
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(body);
            String subs = jsonNode.get("subs").asText();


            Account acc = new Account();

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication != null) {

                String username = authentication.getName();
                acc = accountServiceImpl.loadUserDetailsByUsername(username);

                Role roles = roleRepository.findByDescription(subs);
                acc.addRole(roles);

                accountServiceImpl.saveAccount(acc);
                
                return ResponseEntity.ok().body("Subcsription added.");
            }
        }
        catch (Exception e) {

            System.out.println(e);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged In.");
        

    }

    @GetMapping("/getPricing")
    public ResponseEntity<?> getPrice() {

        Role roleBasic = roleRepository.findByDescription("Basic");
        Role rolePro = roleRepository.findByDescription("Professional");
        
        Map <String, Float> responseData = new HashMap<>();
        
        responseData.put(roleBasic.getDescription(), roleBasic.getPrice());
        responseData.put(rolePro.getDescription(), rolePro.getPrice());

        return ResponseEntity.ok().body(responseData);
    }

    
}
