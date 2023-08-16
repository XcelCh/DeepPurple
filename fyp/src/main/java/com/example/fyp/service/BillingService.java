package com.example.fyp.service;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.fyp.entity.Account;
import com.example.fyp.entity.Billing;
import com.example.fyp.entity.Usages;
import com.example.fyp.repo.BillingRepository;
import com.google.api.Usage;

import jakarta.transaction.Transactional;

// Billing Service class handles communication to Billing Entity in database and does Billing related functions
@Service
public class BillingService {
    
    @Autowired
    private BillingRepository billingRepository;

    @Autowired
    private AccountServiceImpl accountServiceImpl;

    @Autowired
    private UsageService usageService;

    // Get List of billings with associated paymentId
    public ResponseEntity<?> getBillingByPaymentId(Long paymentId) {

        List<Billing> billings = billingRepository.findByPaymentId(paymentId);
        return ResponseEntity.ok().body(billings);
    }

    // Save Billing Entity to the database
    public void saveBilling(Billing billing) {
        billingRepository.save(billing);
    }

    // Scheduler to bill user every start of the month
    @Transactional
    @Scheduled(cron = "0 0 12 1 * ?")
    public void monthlyBilling() {

        List<Integer> allAccountIds = accountServiceImpl.getAllAccountId();
        Date today = new Date(System.currentTimeMillis());

        // For all Account registered
        for (int accountId : allAccountIds) {

            List<Usages> usages = usageService.findUnbilledUsage(accountId);
            Float totalUnbilled = usageService.getTotalUnbilledUsage(accountId);

            // If there are outstanding payment, create Billing records
            if (totalUnbilled != 0) {

                Account account = accountServiceImpl.getById(accountId);

                Billing billing = new Billing(totalUnbilled, today, account.getPayment(), usages);

                for (Usages u : usages) {
                    u.setBilling(billing);
                }

                saveBilling(billing);
                System.out.println(accountId + " billed " + billing.getBillingId() + today);

            }
        }
    }
}
