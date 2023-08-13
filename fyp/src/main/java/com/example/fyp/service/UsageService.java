package com.example.fyp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.fyp.entity.Usages;
import com.example.fyp.repo.BillingRepository;
import com.example.fyp.repo.UsageRepository;

@Service
public class UsageService {
    
    @Autowired
    private UsageRepository usageRepository;

    public ResponseEntity<?> getTotalUsage(Integer accountId) {
        List<Object[]> usages = usageRepository.getSumOfUsageByAccountId(accountId);
        return ResponseEntity.ok().body(usages);    
    }

}
