package com.example.fyp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.fyp.entity.Usages;
import com.example.fyp.repo.UsageRepository;

// Service Class for Usages Entity to communicate with database
@Service
public class UsageService {
    
    @Autowired
    private UsageRepository usageRepository;

    // Get the total of outstanding payment that has not been billed to user
    public float getTotalUnbilledUsage(Integer accountId) {

        Float total = usageRepository.findTotalUnbilledUsage(accountId);

        // If total is null, means that there are no outstanding payment, return 0
        if (total == null) {
            return 0;
        }
        return total;
    }

    // Get List of Usages that has not been billed to user
    public List<Usages> findUnbilledUsage(Integer accountId) {

        return usageRepository.findUnbilledUsage(accountId);
    }

    // Save Usages object to database
    public void saveUsages(Usages usage) {
        usageRepository.save(usage);
    }
}
